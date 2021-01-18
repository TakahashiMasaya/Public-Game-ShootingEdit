import { createStore } from 'vuex';
import map from '@/store/modules/map/';
import edit from '@/store/modules/edit';
import user from '@/store/modules/user';

const store = createStore({
  modules: {
    map,
    edit,
    user,
  },
});

export default store;
