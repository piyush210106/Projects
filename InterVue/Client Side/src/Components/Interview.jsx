import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoInterview = ({ meetingId }) => {
  const socket = useRef(null);
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.emit("join-room", meetingId);

    peerConnection.current = new RTCPeerConnection();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStream.current = stream;
        localVideo.current.srcObject = stream;
        stream.getTracks().forEach(track =>
          peerConnection.current.addTrack(track, stream)
        );
      });

    peerConnection.current.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };

    socket.current.on("user-joined", async () => {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      socket.current.emit("offer", { sdp: offer, roomId: meetingId });
    });

    socket.current.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answer", { sdp: answer, roomId: meetingId });
    });

    socket.current.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.current.on("ice-candidate", async (candidate) => {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current.emit("ice-candidate", { candidate: event.candidate, roomId: meetingId });
      }
    };
  }, [meetingId]);

  const toggleMute = () => {
    const audioTrack = localStream.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const toggleCamera = () => {
    const videoTrack = localStream.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsCameraOff(!videoTrack.enabled);
  };

  const leaveCall = () => {
    localStream.current.getTracks().forEach(track => track.stop());
    peerConnection.current.close();
    socket.current.disconnect();
    window.location.href = "/dashboard"; 
  };


  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 max-w-screen">
        <video ref={localVideo} autoPlay muted className="w-1/2 rounded-lg shadow-lg -scale-x-100 border-2 border-black" />
        <video ref={remoteVideo} autoPlay className="w-1/2 rounded-lg shadow-lg border-2 border-black" />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={toggleMute}
          className={`px-4 py-2 rounded-xl ${isMuted ? "bg-red-500" : "bg-gray-700"} text-white`}
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <button
          onClick={toggleCamera}
          className={`px-4 py-2 rounded-xl ${isCameraOff ? "bg-red-500" : "bg-gray-700"} text-white`}
        >
          {isCameraOff ? "Camera On" : "Camera Off"}
        </button>

        <button
          onClick={leaveCall}
          className="px-4 py-2 rounded-xl bg-red-600 text-white"
        >
          Leave
        </button>
      </div>
    </div>
  );
};

export default VideoInterview;
