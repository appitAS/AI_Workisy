import { create } from "zustand";

const useJobStore = create((set) => ({
  jobs: [],
  isLoading: false,
  error: null,
  setError: (error) => set({ error }),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setJobs: (jobs) => set({ jobs }),
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
  onselectedModel: { name: "sonar" },
  setOnselectedModel: (model) => set({ onselectedModel: model }),
}));

export default useJobStore;
