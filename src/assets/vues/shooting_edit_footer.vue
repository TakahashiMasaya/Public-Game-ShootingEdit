<template>
  <section id="menu">
    <section id="menu_inner">
      <a
        nohref=""
        :class="state.prev"
        @click.stop="action.prev"
        @mouseenter.stop="touchStart.prev"
        @mouseleave.stop="touchEnd.prev"
        @touchstart.stop="touchStart.prev"
        @touchend.stop="touchEnd.prev"
      >
        <shooting-gamefont string="prev" />
      </a>
      <a
        nohref=""
        :class="state.confirmUpdate"
        @click.stop="action.confirmUpdate"
        @mouseenter.stop="touchStart.confirmUpdate"
        @mouseleave.stop="touchEnd.confirmUpdate"
        @touchstart.stop="touchStart.confirmUpdate"
        @touchend.stop="touchEnd.confirmUpdate"
      >
        <shooting-gamefont string="update" />
      </a>
      <a
        nohref=""
        :class="state.next"
        @click.stop="action.next"
        @mouseenter.stop="touchStart.next"
        @mouseleave.stop="touchEnd.next"
        @touchstart.stop="touchStart.next"
        @touchend.stop="touchEnd.next"
      >
        <shooting-gamefont string="next" />
      </a>
      <a
        nohref=""
        :class="state.logout"
        @click.stop="action.logout"
        @mouseenter.stop="touchStart.logout"
        @mouseleave.stop="touchEnd.logout"
        @touchstart.stop="touchStart.logout"
        @touchend.stop="touchEnd.logout"
      >
        <shooting-gamefont string="logout" />
      </a>
    </section><!-- /#menu_inner -->
  </section>
</template>

<script>
import Gamefont from '@/assets/vues/component_gamefont.vue';

export default {
  components: {
    'shooting-gamefont': Gamefont,
  },
  props: {
    state: {
      type: Object,
      default: () => {},
    },
    action: {
      type: Object,
      default: () => {},
    },
    touchStart: {
      type: Object,
      default: () => {},
    },
    touchEnd: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      status: {
        action: this.action,
        state: this.state,
      },
    };
  },
  watch: {
    state() {
      this.status = {
        ...this.status,
        state: {
          ...this.status.state,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  #menu{
    border-top:2px solid rgba(200, 200, 200, 1);
    background: linear-gradient(to bottom, rgba(50, 50, 50, 1) 0%, rgba(20, 20, 20, 1) 100%);
    box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 1) inset;
    position:fixed;
    bottom: 0px;
    width:100%;
    z-index: 50;
    #menu_inner{
      margin:0px auto;padding:20px 0px;text-align:center;width:1000px;
      a{
        background-color:rgba(220,220,220,0.3);
        border:1px solid rgba(255,255,255,1);
        border-radius:5px;
        cursor:pointer;
        display:inline-block;
        line-height:0px;
        padding:15px 20px;
        transition:0.3s background-color;
        text-decoration:none;
        color:rgba(255,255,255,1);

        &.active{background-color:rgba(255,255,255,0.6);}
        &.disabled{cursor:default;opacity:0.3;}
      }
    }
  }

  &.ismenu #menu{bottom:0px;position:fixed;transform:translateY(0px);z-index:100;}
}
</style>
