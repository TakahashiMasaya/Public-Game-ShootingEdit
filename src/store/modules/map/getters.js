import jsonConfig from '@/assets/jsons/shooting_config.json';

const keyThemes = jsonConfig.map.theme;

export default {
  getMap: (state) => {
    const { map } = state;
    const { theme: themeId } = state.map;
    return {
      ...map,
      theme: keyThemes[themeId].name,
    };
  },
  getStage: (state) => state.stage,
  getBgMusic: (state) => `bg_${state.map.bgmusic}`,
  getStageMap: (state) => {
    const map = state.maps[state.stage];
    return {
      ...map,
      map: [...map.map],
    };
  },
  getEditedMap: (state) => state.map,
  getStageCount: (state) => state.maps.length,
  getCurrentEnemies: (state) => keyThemes[state.map.theme].enemies,
  getCurrentMap: (state) => keyThemes[state.map.theme].map,
  getTheme: (state) => Object.keys(keyThemes)
    .reduce((ac, cu) => (state.map.theme === keyThemes[ac].name ? ac : cu)),
};
