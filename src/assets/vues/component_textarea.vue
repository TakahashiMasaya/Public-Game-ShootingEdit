<template>
  <div class="col_r_group">
    <textarea
      :name="name"
      :cols="cols"
      :rows="rows"
      :value="val"
      @input="input && input($event.target.value)"
    />
  </div><!-- /.col_r_group -->
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    cols: {
      type: Number,
      default: 0,
    },
    rows: {
      type: Number,
      default: 0,
    },
    value: {
      type: String,
      default: '',
    },
    input: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      val: this.value,
      n: this.name,
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
 textarea{
    background-color:rgba(0,0,0,1);
    border:1px solid rgba(255,255,255,0.7);
    border-radius:3px;
    color:rgba(255,255,255,1);
    font-size:1.5em;
    padding: 10px;
    width: 100%;
  }
}
</style>
