import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/assets/vues/login.vue';
import GAME_AUDIO from '@/assets/lib/shooting_audio';
import GradiusEditMain from '@/assets/vues/shooting_edit_main.vue';
import { Repository } from '@/assets/repository/manager';

import store from '@/store/';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/edit',
      name: 'edit',
      component: GradiusEditMain,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (Repository.isRepositoryNull()) {
    console.log(`Repoisitory init: repository=>${to.query.repository}`);
    Repository.init(to.query.repository);
  }
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    store.dispatch('user/login', {
      resolve: async () => {
        await GAME_AUDIO.bufferringAudios();
        store.dispatch('map/initMap', {
          resolve: () => {
            next();
          },
          reject: (error) => {
            console.alert(error);
          },
        });
      },
      reject: () => next({ // notLogin
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      }),
    });
  } else {
    next();
  }
});

export default router;
