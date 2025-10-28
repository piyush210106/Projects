import {create} from "zustand";
import axios from "axios";

const useCandidateStore = create((set) => ({
    exjobs: [],
    injobs: [],
    selectedjobs: [],
    meetings: [],
    appliedjobs: [],
    addexjob : async (set) => {
        try {
            const res = await axios.get("http://localhost:8000/candidate/exjobs", {withCredentials:true});
            set({exjobs: res.data});
        } catch (error) {
            set({error: error.message});
        }
    },
    addinjob : async (set) => {
        try {
            const res = await axios.get("http://localhost:8000/candidate/injobs", {withCredentials:true});
            set({injobs: res.data});
        } catch (error) {
            set({error: error.message});
        }
    },
    addselectedjob : (selectedjob) => {
        set( (state) => ({
            selectedjobs: [...state.selectedjobs, selectedjob],
        }))
    },
    removeselectedjob: (jobId) => {
        set( (state) => ({
            selectedjobs: state.selectedjobs.filter((j) => j.id !== jobId)
        }))
    },
    addmeeting: (meeting) => {
        set( (state) => ({
            meetings: [meeting, ...state.meetings]
        }))
    },
    fetchappliedjobs: async(set) => {
        try {
            const res = await axios.get("http://localhost:8000/candidate/appliedjobs", {withCredentials: true});
            set({appliedjobs: res.data});
        } catch (error) {
            console.log("Error in fetching applied jobs!!", error);
        }
    }
}));


export default useCandidateStore;