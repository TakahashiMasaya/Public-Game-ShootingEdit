<template>
  <div
    id="wrapper"
    @click.stop="all_selectbox_close"
  >
    <shooting-edit-header />
    <shooting-edit-area
      ref="edit_area"
      :json-config="json_config"
      :init-theme="init_theme"
    />
    <shooting-edit-components
      ref="edit_components"
      :json-config="json_config"
    />
    <shooting-edit-footer
      :state="footer.state"
      :action="footer.action"
      :touch-start="footer.touchStart"
      :touch-end="footer.touchEnd"
    />
    <shooting-edit-modal
      :show="modal.show"
      :loading="modal.loading"
      :display="modal.display"
      :message="modal.message"
      :execute="modal.execute"
      :not-execute="modal.notExecute"
    />
    <shooting-edit-popup
      :show="popup.show"
      :message="popup.message"
    />
  </div>
</template>

<script>
import GAME_AUDIO from '@/assets/lib/shooting_audio';

import G_E_H from '@/assets/vues/shooting_edit_header.vue';
import G_E_A from '@/assets/vues/shooting_edit_area.vue';
import G_E_C from '@/assets/vues/shooting_edit_components.vue';
import G_E_F from '@/assets/vues/shooting_edit_footer.vue';
import G_E_M from '@/assets/vues/shooting_edit_modal.vue';
import G_E_P from '@/assets/vues/component_popup.vue';
import jcg from '../jsons/shooting_config.json';

export default {
  components: {
    'shooting-edit-header': G_E_H,
    'shooting-edit-area': G_E_A,
    'shooting-edit-components': G_E_C,
    'shooting-edit-footer': G_E_F,
    'shooting-edit-modal': G_E_M,
    'shooting-edit-popup': G_E_P,
  },
  data() {
    return {
      json_config: jcg,
      footer: {
        state: {
          prev: '',
          next: '',
          confirmUpdate: '',
          logout: '',
        },
        action: {
          prev: this.prev,
          next: this.next,
          confirmUpdate: this.confirmUpdate,
          logout: this.logout,
        },
        touchStart: {
          prev: () => {
            this.footer.state.prev = this.footer.state.prev === 'disabled'
              ? 'disabled'
              : 'active';
          },
          next: () => {
            this.footer.state.next = this.footer.state.next === 'disabled'
              ? 'disabled'
              : 'active';
          },
          confirmUpdate: () => {
            this.footer.state.confirmUpdate = this.footer.state.confirmUpdate === 'disabled'
              ? 'disabled'
              : 'active';
          },
          logout: () => {
            this.footer.state.logout = this.footer.state.logout === 'disabled'
              ? 'disabled'
              : 'active';
          },
        },
        touchEnd: {
          prev: () => {
            this.footer.state.prev = this.footer.state.prev === 'disabled'
              ? 'disabled'
              : '';
          },
          next: () => {
            this.footer.state.next = this.footer.state.next === 'disabled'
              ? 'disabled'
              : '';
          },
          confirmUpdate: () => {
            this.footer.state.confirmUpdate = this.footer.state.confirmUpdate === 'disabled'
              ? 'disabled'
              : '';
          },
          logout: () => {
            this.footer.state.logout = this.footer.state.logout === 'disabled'
              ? 'disabled'
              : '';
          },
        },
      },
      modal: {
        show: false,
        loading: false,
        display: false,
        message: '',
        execute: null,
        notExecute: null,
      },
      popup: {
        show: false,
        message: '',
      },
    };
  },
  mounted() {
    document.querySelectorAll('html,body').forEach((o) => { o.classList.remove('vue-login'); });
    document.body.classList.add('on');
    this.footer = {
      ...this.footer,
      state: {
        ...this.footer.state,
        prev: 'disabled',
      },
    };
  },
  methods: {
    getEditedCount() {
      return this.$store.getters['edit/getEditedCount'];
    },
    change_stage() {
      this.resetEditCount();
      this.set_status_for_footer_button();
    },
    set_status_for_footer_button() {
      const stage = this.$store.getters['map/getStage'];
      const stageCount = this.$store.getters['map/getStageCount'];
      this.footer = {
        ...this.footer,
        state: {
          ...this.footer.state,
          prev: (stage <= 0) ? 'disabled' : '',
          next: (stage >= stageCount - 1) ? 'disabled' : '',
        },
      };
    },
    prev() {
      if (this.footer.state.prev === 'disabled') {
        return;
      }
      GAME_AUDIO.setStopOnBG();
      if (this.getEditedCount() !== 0) {
        // 編集中の処理
        this.modal = {
          show: true,
          display: true,
          message: 'このステージが編集中の状態ですが続けますか?',
          execute: () => {
            this.$store.dispatch('map/previousStage');
            this.change_stage();
            this.modal = {
              ...this.modal,
              show: false,
            };
          },
          notExecute: () => {
            this.modal = {
              ...this.modal,
              show: false,
            };
          },
        };
        return;
      }

      this.$store.dispatch('map/previousStage');
      this.change_stage();
    }, // prev()
    next() {
      if (this.footer.state.next === 'disabled') {
        return;
      }
      GAME_AUDIO.setStopOnBG();
      if (this.getEditedCount() !== 0) {
        // 編集中の処理
        this.modal = {
          show: true,
          display: true,
          message: 'このステージが編集中の状態ですが続けますか?',
          execute: () => {
            this.$store.dispatch('map/nextStage');
            this.change_stage();
            this.modal = {
              ...this.modal,
              show: false,
            };
          },
          notExecute: () => {
            this.modal = {
              ...this.modal,
              show: false,
            };
          },
        };
        return;
      }

      this.$store.dispatch('map/nextStage');
      this.change_stage();
    }, // next()
    confirmUpdate() {
      GAME_AUDIO.setStopOnBG();
      this.modal = {
        show: true,
        display: true,
        loading: false,
        message: 'このステージを更新しますか?',
        execute: () => {
          this.update();
          this.modal = {
            ...this.modal,
            display: false,
            loading: true,
          };
        },
        notExecute: () => {
          this.modal = {
            ...this.modal,
            display: false,
            show: false,
          };
        },
      };
    },
    logout() {
      GAME_AUDIO.setStopOnBG();
      this.modal = {
        show: true,
        display: true,
        message: 'ログアウトしますか?',
        execute: () => {
          this.modal = {
            ...this.modal,
            display: false,
            loading: true,
          };
          this.$store.dispatch('user/logout', {
            resolve: () => {
              this.$store.dispatch('edit/resetEditedCount');
              this.$router.push('/');
            },
            reject: () => {},
          });
        },
        notExecute: () => {
          this.modal = {
            ...this.modal,
            show: false,
          };
        },
      };
    },

    update() {
      console.log('update');
      this.$store.dispatch('map/updateMap', {
        resolve: () => {
          this.modal = {
            ...this.modal,
            show: false,
            loading: false,
          };
          this.popup = {
            ...this.popup,
            show: true,
            message: '登録を完了しました',
          };
          window.setTimeout(() => {
            this.popup = {
              ...this.popup,
              show: false,
            };
          }, 2000);
          this.resetEditCount();
        },
        reject: (e) => {
          this.modal = {
            ...this.modal,
            show: false,
            loading: false,
          };
          if (e.code === 401) {
            this.popup = {
              ...this.popup,
              show: true,
              message: '認証に失敗したため、ログイン画面に戻ります',
            };
            this.$store.dispatch('user/logout', {
              resolve: () => {
                this.$store.dispatch('edit/resetEditedCount');
                this.$router.push('/');
              },
              reject: () => {},
            });
            return;
          }

          this.popup = {
            ...this.popup,
            show: true,
            message: '登録に失敗しました',
          };
          window.setTimeout(() => {
            this.popup = {
              ...this.popup,
              show: false,
            };
          }, 2000);
          this.resetEditCount();
          console.log(`fail...  ${e}`);
        },
      });
    },
    resetEditCount() {
      this.$store.dispatch('edit/resetEditedCount');
    },
    all_selectbox_close() {
      console.log('main close');
      this.$store.dispatch('edit/allSelectboxClose');
    },
    init_theme(theme) {
      // テーマを初期化
      this.modal = {
        show: true,
        display: true,
        message: '現在の状態を全て破棄し、新しいテーマに変更しますか?',
        execute: () => {
          this.$store.dispatch('edit/allSelectboxClose');
          this.modal = {
            ...this.modal,
            show: false,
          };
          // テーマを初期化
          const { entryid } = this.$store.getters['map/getMap'];
          this.$store.dispatch('map/setEditedMap', {
            background_img: 'none',
            background_initx: '1000',
            bgchange: '1000',
            bgmusic: 'type1',
            body: '本文',
            boss: 'enemy_bigcore',
            difficult: '1',
            entryid,
            initx: '0',
            map: [...new Array(20)].map(() => '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'),
            map_infinite: 'false',
            speed: '1',
            theme,
            title: 'タイトル',
          });
        },
        notExecute: () => {
          this.modal = {
            ...this.modal,
            show: false,
          };
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
html body.ispopup{height:100%;}
body{
  height: 100%;
  #wrapper{
    display:block;
    padding-bottom:120px;
  }
  &:before{
    height: 100%;
  }
}
</style>
