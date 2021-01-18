import { Repository } from '@/assets/repository/manager';

export default {
  namespaced: true,
  state: {
    login: false,
  },
  getters: {
  },
  mutations: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      state.login = false;
    },
  },
  actions: {
    login: ({ commit }, params) => {
      Repository.authenticate(
        () => {
          params.resolve();
          commit('login');
        }, // login
        () => {
          params.reject();
        }, // notLogin
      );
    },
    logout: ({ commit }, params) => {
      Repository.logout()
        .then(() => {
          params.resolve();
          commit('logout');
        })
        .catch(() => {
          params.reject();
        });
    },
  },
};
