<template>
  <section
    v-if="status.show"
    class="background"
  >
    <section
      v-if="status.display"
      class="modal"
    >
      <div class="message_area">
        {{ status.message }}
      </div>
      <div class="footer_area">
        <button
          ref="yes"
          @click.stop="status.execute()"
        >
          YES
        </button>
        <button
          ref="no"
          @click.stop="status.notExecute()"
        >
          NO
        </button>
      </div>
    </section>

    <section
      v-if="status.loading"
      id="loading"
    >
      <div id="loading_icon">
        <div class="rotate outside" />
        <div class="rotate inside" />
      </div><!-- #loading_icon -->
    </section><!-- #loading -->
  </section><!-- #loading -->
</template>

<script>
export default {
  props: {
    loading: Boolean,
    show: Boolean,
    display: Boolean,
    message: {
      type: String,
      default: '',
    },
    execute: {
      type: Function,
      default: null,
    },
    notExecute: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      status: {
        show: this.show,
        message: this.message,
        execute: this.execute,
        notExecute: this.notExecute,
        display: this.display,
        loading: this.loading,
      },
    };
  },
  watch: {
    loading() {
      this.status = {
        ...this.status,
        loading: this.loading,
      };
    },
    show() {
      this.status = {
        ...this.status,
        show: this.show,
      };
    },
    display() {
      this.status = {
        ...this.status,
        display: this.display,
      };
    },
    message() {
      this.status = {
        ...this.status,
        message: this.message,
      };
    },
    execute() {
      this.status = {
        ...this.status,
        execute: this.execute,
      };
    },
    notExecute() {
      this.status = {
        ...this.status,
        notExecute: this.notExecute,
      };
    },
  },
  methods: {
    show_modal(message = '', execute = null, notExecute = null) {
      this.status.loading = false;
      this.modal = {
        display: true,
        message,
        execute,
        notExecute,
      };
    },
    show_loading() {
      this.modal.display = false;
      this.status.loading = true;
    },
    close_modal() {
      this.modal.display = false;
      this.status.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.background{
  background-color:rgba(255,255,255,0.8);
  overflow: hidden;
  position:fixed;
  left:0px;
  top:0px;
  height:100%;
  width:100%;
  z-index:100;

  .modal{
    background-color: rgba(255,255,255,1);
    border-radius: 3px;
    display: block;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    padding:20px;
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &.on {display:block;}
    .message_area {padding-bottom: 20px;}

    .footer_area button {
      padding: 10px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.05);
      margin: 0px 5px;
    }
  }
}

.component_dialog{
  bottom: 0px;
  position: fixed;
  width: 100%;
  z-index: 101;

  div{
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    display: block;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    top: 0px;
    opacity: 0;
    padding: 10px 30px;
    position: absolute;
    left: calc(50% - 45%);
    transform: translateY(0);
    width:90%;
    animation: component_dialog_anim 4s ease 0s 1 alternate none running;

    span{margin-left:1em;}
  }
}

@keyframes component_dialog_anim {
  0% {opacity: 0;transform: translateY(0);}
  10% {opacity: 1;transform: translateY(-80px);}
  90% {opacity: 1;transform: translateY(-80px);}
  100% {opacity: 0;transform: translateY(0);}
}

/*  Loading
=====================*/
#loading{
  display: block;
  #loading_icon {
    animation: ani_loading_opacity 0.1s linear infinite;
    bottom: 0px;
    display: block;
    height: 200px;
    left: 0px;
    margin: auto;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 200px;
    z-index: 110;

    &:after {
      bottom: 40px;
      content: 'Processing...';
      color: #0066ff;
      letter-spacing: 3px;
      font-weight: bold;
      position: absolute;
      text-align: center;
      width: 200px;
    }
  }
  .rotate {
    border: 5px solid #0066ff;
    border-radius: 50%;
    border-right-color: transparent;
    height: 30px;
    margin: auto;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 30px;

    &.outside {
      animation: ani_loading_rotate_out 1s linear infinite;
      height: 50px;
      width: 50px;
    }
    &.inside {
      animation: ani_loading_rotate_in 1s linear infinite;
    }

  }

}

@keyframes ani_loading_rotate_out {
  0% {transform: rotate(0deg);}
  50% {transform: rotate(180deg);}
  100% {transform: rotate(360deg);}
}

@keyframes ani_loading_rotate_in {
  0% {transform: rotate(0deg);}
  50% {transform: rotate(-180deg);}
  100% {transform: rotate(-360deg);}
}

@keyframes ani_loading_opacity {
  0% {opacity: 1;}
  50% {opacity: 0.5;}
  100% {opacity: 1;}
}
</style>
