export default {
  resetEditedCount: ({ commit }) => {
    commit('resetEditedCount');
  },
  editedCount: ({ commit }) => {
    commit('editedCount');
  },
  setFooter: ({ commit }, params) => {
    commit('setFooter', params);
  },
  openTheme: ({ commit, state }) => {
    const { theme } = state.selectboxStatus;
    if (theme) {
      commit('allSelectboxClose');
      return;
    }
    commit('openTheme');
  },
  openBackgroundImage: ({ commit, state }) => {
    const { backgroundImage } = state.selectboxStatus;
    if (backgroundImage) {
      commit('allSelectboxClose');
      return;
    }
    commit('openBackgroundImage');
  },
  openBackgroundMusic: ({ commit, state }) => {
    const { backgroundMusic } = state.selectboxStatus;
    if (backgroundMusic) {
      commit('allSelectboxClose');
      return;
    }
    commit('openBackgroundMusic');
  },
  openBoss: ({ commit, state }) => {
    const { boss } = state.selectboxStatus;
    if (boss) {
      commit('allSelectboxClose');
      return;
    }
    commit('openBoss');
  },
  allSelectboxClose: ({ commit }) => {
    commit('allSelectboxClose');
  },
};
