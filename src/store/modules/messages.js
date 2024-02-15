import { nanoid } from "nanoid";

const state = {
  messages: [],
};

const getters = {};

const actions = {};

const mutations = {
  /**
   * Adds a success message to the state's messages array.
   *
   * @param {object} state - the state object
   * @param {object} message - the message object to be added
   * @return {void}
   */

  addSuccessMessage(state, message) {
    state.messages.push({
      id: nanoid(),
      severity: "success",
      ...message,
    });
  },

  /**
   * Adds an error message to the state.
   *
   * @param {object} state - the state object
   * @param {object} message - the error message object to be added
   * @return {void}
   */
  addErrorMessage(state, message) {
    state.messages.push({
      id: nanoid(),
      severity: "error",
      ...message,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
