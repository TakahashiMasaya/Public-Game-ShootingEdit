import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    editedCount: 0,
    selectboxStatus: {
      theme: false,
      backgroundImage: false,
      backgroundMusic: false,
      boss: false,
    },
  },
  mutations,
  getters,
  actions,
};
