<template>
  <h1>
    <shooting-gamefont
      string="shooting game editing stage"
      width="22"
    />
  </h1>
</template>

<script>
import Gamefont from '@/assets/vues/component_gamefont.vue';

export default {
  components: {
    'shooting-gamefont': Gamefont,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
h1{text-align: center;padding:15px;color:rgba(255,255,255,1);position:relative;}
</style>
