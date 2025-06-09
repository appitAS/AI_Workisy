import { create } from "zustand";

const useJobStore = create((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  onselectedModel: { name: "sonar" },
  setOnselectedModel: (model) => set({ onselectedModel: model }),
}));

export default useJobStore;
