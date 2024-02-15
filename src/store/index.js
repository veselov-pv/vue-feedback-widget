import { createStore } from "vuex";
import messages from "./modules/messages";

export const store = createStore({
  modules: {
    messages,
  },
});

export default store;
