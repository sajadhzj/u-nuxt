import { defineStore } from "pinia";

interface FetchStateInterface {
  errors: any;
  response: Record<string, boolean>;
  loading: Record<string, boolean>;
}
interface FetchGetterInterface {
  [key: string]: (...args: any[]) => any;
}

interface FetchActionInterface {
  hasError(error: string): boolean;
}
export const useFetchStore = defineStore<
  "useFetchStore",
  FetchStateInterface,
  FetchGetterInterface,
  FetchActionInterface
>("useFetchStore", {
  state: (): FetchStateInterface => ({
    errors: {},
    response: {},
    loading: {},
  }),
  getters: {},
  actions: {
    hasError(error: string = "|") {
      const [id, key] = error.split("|") as [string, any];

      return this.errors?.[id]?.[key] && this.errors?.[id]?.[key].length > 0;
    },
  },
});
