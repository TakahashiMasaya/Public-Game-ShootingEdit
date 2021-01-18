<template>
  <div class="col_r_group">
    <label>
      <input
        :value="val"
        :name="name"
        :checked="val"
        type="checkbox"
        @input="checked && checked($event.target.checked)"
      >
      <span />
    </label>
  </div><!-- /.col_r_group -->
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    value: Boolean,
    checked: {
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
  input{
    display:none;
    &+ span{
      display:block;
      border:1px solid rgba(255,255,255,0.7);
      background-color:rgba(0,0,0,1);
      width:100px;
      height:46px;
      border-radius:3px;
      position:relative;
      transition: all 0.5s;
      &:before{
        content:'';
        width:40px;
        height:40px;
        background-color:rgba(255,255,255,0.8);
        position:absolute;
        top:2px;
        left:2px;
        border-radius:3px;
      }
    }
    &:checked+ span{
      background-color:rgba(255,255,255,0.5);
      &:before{
        left:calc(100% - 43px);
      }
    }
  }
}
</style>
