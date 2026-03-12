import { useRef, useState } from "react";
import { io } from "socket.io-client";

export const useWebRTC = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const socketRef = useRef(null);
  const peerRef = useRef(null);

  const [connected, setConnected] = useState(false);

  const startCall = async ({ roomId, signalingServerUrl, token, role }) => {

    // connect socket
    socketRef.current = io(signalingServerUrl, {
      auth: { token }
    });

    socketRef.current.emit("join-room", { roomId });

    // get camera + mic
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localVideoRef.current.srcObject = stream;

    // create peer connection
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
      ]
    });

    // add tracks
    stream.getTracks().forEach(track => {
      peerRef.current.addTrack(track, stream);
    });

    // receive remote stream
    peerRef.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // ICE candidate
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          roomId,
          candidate: event.candidate
        });
      }
    };

    // offer
    socketRef.current.on("offer", async ({ offer }) => {

      await peerRef.current.setRemoteDescription(offer);

      const answer = await peerRef.current.createAnswer();
      await peerRef.current.setLocalDescription(answer);

      socketRef.current.emit("answer", { roomId, answer });
    });

    // answer
    socketRef.current.on("answer", async ({ answer }) => {
      await peerRef.current.setRemoteDescription(answer);
    });

    // ice candidate receive
    socketRef.current.on("ice-candidate", async ({ candidate }) => {
      await peerRef.current.addIceCandidate(candidate);
    });

    // candidate starts offer
    if (role === "candidate") {
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);

      socketRef.current.emit("offer", { roomId, offer });
    }

    setConnected(true);
  };
const cleanup = () => {

  // Stop local camera + mic
  if (localVideoRef.current?.srcObject) {
    const stream = localVideoRef.current.srcObject;
    stream.getTracks().forEach(track => track.stop());
    localVideoRef.current.srcObject = null;
  }

  // Stop remote stream
  if (remoteVideoRef.current?.srcObject) {
    const stream = remoteVideoRef.current.srcObject;
    stream.getTracks().forEach(track => track.stop());
    remoteVideoRef.current.srcObject = null;
  }

  // Remove tracks from peer connection
  if (peerRef.current) {
    peerRef.current.getSenders().forEach(sender => {
      if (sender.track) {
        sender.track.stop();
      }
    });

    peerRef.current.close();
    peerRef.current = null;
  }

  // Disconnect socket
  if (socketRef.current) {
    socketRef.current.disconnect();
    socketRef.current = null;
  }

  setConnected(false);
}; return {
    localVideoRef,
    remoteVideoRef,
    startCall,
    connected,
    cleanup
  };
};