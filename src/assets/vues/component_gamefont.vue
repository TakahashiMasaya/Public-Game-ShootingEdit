<template>
  <div class="gamefont">
    <div
      v-for="(character, i) in getText()"
      :key="i"
      :style="getStyle(character)"
    />
  </div><!-- /.gamefont -->
</template>

<script>
export default {
  props: {
    string: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '14',
      required: false,
    },
  },
  data() {
    return {
      text: this.string,
      size: this.width,
      mappedText: { // フォントのマッピング
        0: '0',
        1: '60',
        2: '120',
        3: '180',
        4: '240',
        5: '300',
        6: '360',
        7: '420',
        8: '480',
        9: '540',
        a: '600',
        b: '660',
        c: '720',
        d: '780',
        e: '840',
        f: '900',
        g: '960',
        h: '1020',
        i: '1080',
        j: '1140',
        k: '1200',
        l: '1260',
        m: '1320',
        n: '1380',
        o: '1440',
        p: '1500',
        q: '1560',
        r: '1620',
        s: '1680',
        t: '1740',
        u: '1800',
        v: '1860',
        w: '1920',
        x: '1980',
        y: '2040',
        z: '2100',
        ':': '2160',
        _: '2280',
        '-': '2340',
      },
    };
  },
  watch: {
    string() {
      this.text = this.string;
    },
  },
  methods: {
    getText() {
      return this.text.split('');
    },
    getStyle(string = '') {
      const styledPosition = parseInt(this.mappedText[string], 10)
        * (this.size / 60) * -1;
      return (string === ' ')
        ? {
          background: 'url(./assets/images/shooting_spacer.png)',
          width: `${this.size}px`,
        }
        : {
          background: 'url(./assets/images/shooting_font.png) no-repeat',
          width: `${this.size}px`,
          height: `${this.size}px`,
          backgroundSize: 'cover',
          backgroundPosition: `${styledPosition}px 0px`,
        };
    },
  },
};
</script>

<style lang="scss" scoped>
.gamefont > div {
  display: inline-block;
}
</style>
