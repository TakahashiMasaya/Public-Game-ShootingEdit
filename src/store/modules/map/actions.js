import { Repository } from '@/assets/repository/manager';

export default {
  setMap: ({ commit }, params) => {
    commit('setMap', params);
  },
  setEditedMap: ({ commit }, params) => {
    commit('setEditedMap', params);
  },
  setRecoveryPositionX: ({ commit }, params) => {
    commit('setRecoveryPositionX', params);
  },
  nextStage: ({ commit }) => {
    commit('nextStage');
    commit('setMap');
  },
  previousStage: ({ commit }) => {
    commit('previousStage');
    commit('setMap');
  },
  initMap: ({ commit }, params) => {
    Repository.getDocument()
      .then((doc) => {
        params.resolve();
        commit('initMap', doc);
        commit('setMap');
      })
      .catch(params.reject);
  },
  updateMap: ({ state, commit }, params) => {
    Repository.registDocument({ data: state.map })
      .then(() => {
        params.resolve();
        // stateのmapsの情報を更新する
        commit('refreshMaps');
      }, params.reject);
  },
};
