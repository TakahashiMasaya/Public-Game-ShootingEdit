export default {
  resetEditedCount: (state) => {
    state.editedCount = 0;
  },
  editedCount: (state) => {
    state.editedCount += 1;
  },
  openTheme: (state) => {
    // テーマ以外を全てfalseにして、
    // テーマのみtrueにする
    const keys = Object.keys(state.selectboxStatus);
    state.selectboxStatus = {
      ...(keys.reduce((a, c) => ({
        ...a,
        [c]: false,
      }), {})),
      theme: true,
    };
  },
  openBackgroundImage: (state) => {
    const keys = Object.keys(state.selectboxStatus);
    state.selectboxStatus = {
      ...(keys.reduce((a, c) => ({
        ...a,
        [c]: false,
      }), {})),
      backgroundImage: true,
    };
  },
  openBackgroundMusic: (state) => {
    const keys = Object.keys(state.selectboxStatus);
    state.selectboxStatus = {
      ...(keys.reduce((a, c) => ({
        ...a,
        [c]: false,
      }), {})),
      backgroundMusic: true,
    };
  },
  openBoss: (state) => {
    const keys = Object.keys(state.selectboxStatus);
    state.selectboxStatus = {
      ...(keys.reduce((a, c) => ({
        ...a,
        [c]: false,
      }), {})),
      boss: true,
    };
  },
  allSelectboxClose: (state) => {
    state.selectboxStatus = {
      backgroundImage: false,
      backgroundMusic: false,
      boss: false,
    };
  },
};
