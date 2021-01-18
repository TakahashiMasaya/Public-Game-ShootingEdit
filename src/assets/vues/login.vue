<template>
  <section class="main">
    <form class="shooting-login-form">
      <shooting-edit-header />
      <div
        v-if="formMessage"
        class="form-messages"
      >
        <span>{{ formMessage }}</span>
      </div>
      <div
        :class="['form-rows', {on: activatedInput === 'username'}]"
        @click.stop="activatedInput='username'"
      >
        <div class="form-title">
          <shooting-gamefont
            string="username"
            width="15"
          />
        </div>
        <div class="form-value">
          <input
            v-model="username"
            type="text"
            @focus.stop="activatedInput='username'"
          >
        </div>
      </div>
      <div
        :class="['form-rows', {on: activatedInput === 'password'}]"
        @click.stop="activatedInput='password'"
      >
        <div class="form-title">
          <shooting-gamefont
            string="password"
            width="15"
          />
        </div>
        <div class="form-value">
          <input
            v-model="password"
            :type="revealing"
            class="form-input-passowrd"
            @focus.stop="activatedInput='password'"
          >
        </div>
        <div class="form-button">
          <button @click.stop="set_password_rev">
            <shooting-gamefont
              string="rev"
              width="10"
            />
          </button>
        </div>
      </div>
      <div class="form-footer">
        <button
          type="submit"
          class="form-submit"
          @click.stop.prevent="login"
        >
          <shooting-gamefont
            string="login"
            width="20"
          />
        </button>
      </div>
    </form>
    <shooting-edit-modal
      :loading="modal.loading"
      :show="modal.show"
      :message="modal.message"
      :execute="modal.execute"
      :not-execute="modal.notExecute"
    />
  </section>
</template>

<script>
import G_E_H from '@/assets/vues/shooting_edit_header.vue';
import G_E_M from '@/assets/vues/shooting_edit_modal.vue';
import Gamefont from '@/assets/vues/component_gamefont.vue';
import { Repository } from '@/assets/repository/manager';

export default {
  components: {
    'shooting-edit-header': G_E_H,
    'shooting-edit-modal': G_E_M,
    'shooting-gamefont': Gamefont,
  },
  data() {
    return {
      formMessage: 'Enter your username and password',
      username: '',
      password: '',
      revealing: 'password',
      activatedInput: '',
      modal: {
        loading: false,
        show: false,
        message: '',
        execute: null,
        notExecute: null,
      },
    };
  },
  mounted() {
    document.querySelectorAll('html,body').forEach((o) => o.classList.add('vue-login'));
  },
  methods: {
    login() {
      this.formMessage = 'Please wait!!';
      this.modal = {
        ...this.modal,
        loading: true,
        show: true,
      };

      Repository
        .login({
          username: this.username,
          password: this.password,
        })
        .then(
          (response) => {
            alert('You\'re logged in!');
            console.log(response);
            this.$router.push({ name: 'edit' });
          },
          (error) => {
            alert(`invalid login! ${error || ''}`);
            this.formMessage = 'Enter your username and password';
            this.modal = {
              ...this.modal,
              loading: false,
              show: false,
            };
          },
        );
    },
    set_password_rev() {
      this.revealing = (this.revealing === 'rev') ? 'password' : 'rev';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/math.scss';
section.main {
  height: calc(100vh - 70px);
    .shooting-login-form {
      background-color: rgba(255,255,255,0.2);
      padding: 30px;
      position: relative;
      border: 1px solid rgba(255,255,255,0.5);
      border-radius: 10px;
      left: 50%;
      margin: 0px auto;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      z-index: 10;

      .form-messages {
          padding: 10px 0px;
          color: rgba(255,255,255,0.8);
          text-align: center;
      }

      .form-rows {
          display: flex;
          align-items: center;
          padding: 10px 0px;
          position: relative;
          &:before {
              content: '';
              border-bottom: 1px solid rgba(255,255,255,0.2);
              width: 100%;
              position: absolute;
              bottom: 0px;
              left: 0;
          }
          &:after {
              content: '';
              border-bottom: 1px solid #ffffff;
              width: 0px;
              position: absolute;
              bottom: 0px;
              left: 50%;
              transition: width 0.2s, left 0.2s;
          }
          &.on:after {
              width: 100%;
              left: 0px;
          }
      }

      .form-title {
          flex: 0 0 10em;
          min-width: 10em;
      }
      .form-value {
          padding: 10px;
        input{
            background: transparent;
            border: none;
            color: #ffffff;
            display: inline-block;
            font-size: 150%;
            opacity: 0.7;
            width: 20em;
            position: relative;
        }
      }

      .form-button {
          padding-left: 10px;
      }
      .form-button button{
          background-color: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 5px;
          cursor: pointer;
      }

      .form-footer {
          padding: 10px 0px;
          text-align: center;
      }

      button.form-submit {
          background-color: rgba(0,0,0,1);
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,1);
          padding: 10px 30px;
          display: inline-block;
          cursor: pointer;
      }
  }
}
</style>
