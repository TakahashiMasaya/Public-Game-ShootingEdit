<template>
  <section id="popup">
    <transition>
      <div
        v-if="show"
        class="inner"
      >
        {{ message }}
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      status: {
        show: this.show,
        message: this.message,
        timeOut: null,
      },
    };
  },
  watch: {
    show() {
      this.status = {
        ...this.status,
        show: this.show,
      };
    },
    message() {
      this.status = {
        ...this.status,
        message: this.message,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#popup{
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
    opacity:1;
    padding: 10px 30px;
    position: absolute;
    left: calc(50% - 45%);
    transform: translateY(-80px);
    width:90%;
    transition: opacity 0.5s, transform 0.5s;
    span{margin-left:1em;}
  }
  .v-enter, .v-leave-to {
    opacity: 0;transform: translateY(0px);
  }

}

</style>
