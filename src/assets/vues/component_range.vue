<template>
  <div class="col_r_group">
    <shooting-gamefont
      :key="val"
      :string="val"
      width="15"
      class="val"
    />
    <label>
      <shooting-gamefont
        :string="(min).toString()"
        width="15"
      />
      <input
        type="range"
        :name="name"
        :min="min"
        :max="max"
        :step="step"
        :value="val"
        @input="slide && slide($event.target.value)"
      >
      <shooting-gamefont
        :string="(max).toString()"
        width="15"
      />
    </label>
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
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 0,
    },
    value: {
      type: String,
      default: '',
    },
    slide: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      val: this.value,
    };
  },
  watch: {
    value() {
      this.val = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.col_r_group{
  display:flex;width:100%;align-items: center;
  &:not(:last-child){margin-bottom:10px;}
  .val{
    background-color:rgba(0,0,0,1);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius:3px;
    color:rgba(255,255,255,1);
    margin-right:20px;
    text-align: center;
    padding:10px 20px;
    width:140px;
  }
  label > div{display:inline-block;}
  input[type="range"] {
    margin:0px 20px;
    width: 250px;
  }
}
</style>
