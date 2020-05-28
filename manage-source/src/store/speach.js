export default {
  namespaced: true,
  state: {
    cerActiveName: 'first',
  },
  mutations: {
    speachCerActiveName(state, name) {
      state.cerActiveName = name || 'first';
    },
  },
};
