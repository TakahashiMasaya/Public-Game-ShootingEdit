import getters from './getters';
import mutations from './mutations';
import actions from './actions';
// {
//   title: '',
//   body: '',
//   map: [],
//   theme: '',
//   initx: '0',
//   backgroundImage: '',
//   backgroundInitX: '',
//   backgroundMusic: '',
//   backgroundMusicChangeX: '',
//   boss: '',
//   speed: '',
//   difficult: '',
//   mapInfinite: 'false',
//   recoveryPositionX: [number...],
// }

export default {
  namespaced: true,
  state: {
    maps: [],
    map: {},
    stage: 0,
  },
  mutations,
  getters,
  actions,
};
