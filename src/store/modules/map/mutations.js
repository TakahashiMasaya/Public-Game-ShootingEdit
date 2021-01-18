import jsonConfig from '@/assets/jsons/shooting_config.json';

const keyThemes = jsonConfig.map.theme;

export default {
  initMap: (state, payload) => {
    state.maps = payload;
  },
  setMap: (state, payload) => {
    const stage = state.maps[payload || state.stage];
    state.map = {
      ...stage,
      map: [...stage.map],
    };
  },
  setEditedMap: (state, payload) => {
    const modifiedPayload = Object.keys(payload).reduce((key, current) => {
      if (current === 'theme') {
        const value = Object.keys(keyThemes)
          .reduce((ac, cu) => (payload[current] === keyThemes[ac].name ? ac : cu));
        return {
          ...key,
          [current]: value,
        };
      }
      return {
        ...key,
        [current]: payload[current],
      };
    }, {});

    state.map = {
      ...state.map,
      ...modifiedPayload,
    };
  },
  setRecoveryPositionX: (state, payload) => {
    state.map = {
      ...state.map,
      recoveryPositionX: payload,
    };
  },
  nextStage: (state) => {
    state.stage += 1;
  },
  previousStage: (state) => {
    state.stage -= 1;
  },
  refreshMaps: (state) => {
    const { entryid } = state.map;
    state.maps = state.maps.reduce((ac, current) => [
      ...ac,
      (current.entryid === entryid) ? state.map : current,
    ], []);
  },
};
