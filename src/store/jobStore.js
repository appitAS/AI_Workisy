import { create } from "zustand";

const useJobStore = create((set) => ({
  jobs: [],
  isLoading: false,
  error: null,
  resumeFile: null,
  onselectedModel: { name: "sonar" },
  prompt: "",

  setError: (error) => set({ error }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setJobs: (jobs) => set({ jobs }),
  setPrompt: (prompt) => set({ prompt }),
  setOnselectedModel: (model) => set({ onselectedModel: model }),
  setResumeFile: (file) => set({ resumeFile: file }),
}));

export default useJobStore;
