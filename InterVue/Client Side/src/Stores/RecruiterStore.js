import  {create}  from "zustand";

const useRecruiterStore = create((set) => ({
    appliedCandidates: [],
    addcandidate: (can) => {
        set( (state) => ({
            appliedCandidates: [can, ...state.appliedCandidates]
        }))
    },
    removeCandidate: (canId) => {
        set((state) => ({
           appliedCandidates: state.appliedCandidates.filter((c) => c.id !== canId)
        }))
    }
}));

export {useRecruiterStore};