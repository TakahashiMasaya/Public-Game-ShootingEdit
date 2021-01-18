<template>
  <div class="col_r_group">
    <div
      ref="component_select"
      class="component_select"
    >
      <div
        :class="{
          selected: true,
          on: ul_isopen,
          top: ul_istop,
          bottom: ul_isbottom
        }"
        @click.stop="toggleSelect"
      >
        <shooting-gamefont
          :key="val"
          :string="val"
          width="15"
        />
      </div>
      <ul
        :class="{
          on: ul_isopen,
          top: ul_istop,
          bottom: ul_isbottom
        }"
      >
        <li
          v-for="(item, index) in list"
          ref="li"
          :key="item.index"
          @click.stop="toggleSelected(index)"
        >
          <shooting-gamefont
            :string="item"
            width="15"
          />
        </li>
      </ul>
    </div><!-- /.component_select -->
  </div><!-- /.col_r_group -->
</template>

<script>
import Gamefont from '@/assets/vues/component_gamefont.vue';

export default {
  components: {
    'shooting-gamefont': Gamefont,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    value: {
      type: String,
      default: '',
    },
    isOpen: Boolean,
    clickSelect: {
      type: Function,
      default: null,
    },
    clickSelected: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      val: this.value,
      ul_isopen: false,
      ul_istop: false,
      ul_isbottom: false,
    };
  },
  watch: {
    value() {
      this.val = this.value;
    },
    isOpen() {
      this.ul_isopen = this.isOpen;
      if (this.ul_isopen) {
        const { y } = this.$refs.component_select.getBoundingClientRect();
        this.ul_istop = y <= 350;
        this.ul_isbottom = y > 350;
      }
    },
  },
  methods: {
    toggleSelect() {
      if (this.clickSelect) {
        this.clickSelect();
      }
    },
    toggleSelected(index) {
      if (this.clickSelected) {
        this.clickSelected(this.list[index]);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.col_r_group {
.component_select {
  position: relative;

  div.selected {
    background-color: rgba(0, 0, 0, 1);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 3px;
    color: rgba(255,255,255,1);
    cursor: pointer;
    display: block;
    height: 3em;
    line-height: 3em;
    padding: 0px 20px;
    position: relative;
    &:after{
        content: '';
        position: absolute;
        width: 0px;
        height: 0px;
        right: 10px;
        top: calc(50% - 5px);
        border-left: 8px solid rgba(255, 255, 255, 0.8);
        border-top: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        transform-origin: 2.5px;
        transition: 0.2s;
    }

    &.on.top:after{transform: rotate(90deg);}
    &.on.bottom:after{transform: rotate(-90deg);}
  }//div.selected

  ul{
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 0px 0px 5px 5px;
    border-top: none;
    background-color:rgba(0,0,0,1);
    height: 0px;
    position: absolute;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    transition: 0.2s all;
    z-index: 10;
    &.on {
      box-shadow: 0px 1px 3px rgba(255, 255, 255, 1.0);
      height: 200px;
      opacity: 1;
    }
    &.top{top: 100%;}
    &.bottom{
      border-top:1px solid rgba(255, 255, 255, 1.0);
      border-radius: 5px 5px 0px 0px;
      bottom:100%;
    }

    li{
      background-color: rgba(0, 0, 0, 1);
      color: rgba(255,255,255,1);
      cursor: pointer;
      transition: 0.2s all;
      height: 0px;
      display: block;
      overflow: hidden;
      padding: 20px;
      &>div{line-height: 0;}
      &:not(:last-of-type)  {border-bottom: 1px solid rgba(255, 255, 255, 0.7);}
    }//li

    &.on li{
      display: flex;
      box-sizing: content-box;
      height: 15px;
      padding: 20px;
      &:hover{background-color: rgba(60, 60, 60, 1);}
      &.on{background-color: rgba(90, 90, 90, 1);}
    }
  }//ul

}//.component_select
}
</style>
