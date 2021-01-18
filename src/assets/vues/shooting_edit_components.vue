<template>
  <section>
    <div
      id="title"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="title" />
      </label>
      <div class="col_r">
        <component-input
          v-model="dataValue.title"
          name="title"
          :input="setTitle"
          :value="dataValue.title"
        />
      </div>
    </div><!-- /#title -->

    <div
      id="body"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="body" />
      </label>
      <div class="col_r">
        <component-textarea
          v-model="dataValue.body"
          name="body"
          :cols="80"
          :rows="5"
          :input="setBody"
          :value="dataValue.body"
        />
      </div>
    </div><!-- /#body -->

    <div
      id="bgimg"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="bg_img" />
      </label>
      <div class="col_r">
        <component-select
          ref="bgimg_select"
          name="bgimg"
          :list="selectListBackGroundImage"
          :value="dataValue.background_img"
          :is-open="selectListState.image"
          :click-select="selectBackgroundImage"
          :click-selected="selectedBackgroundImage"
        />
        <component-range
          ref="bgimg_range"
          name="bgimg"
          :min="1000"
          :max="2000"
          :step="25"
          :value="dataValue.background_initx"
          :slide="setBackgroundImageRange"
        />
      </div><!-- /.col_r -->
    </div><!-- /#bg_img -->

    <div
      id="bgmusic"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="bg_music" />
      </label>
      <div class="col_r">
        <component-select
          ref="bgmusic_select"
          name="bgmusic"
          :list="selectListBackGroundMusic"
          :value="dataValue.bgmusic"
          :is-open="selectListState.music"
          :click-select="selectBackgroundMusic"
          :click-selected="selectedBackgroundMusic"
        />
        <component-range
          ref="bgmusic_range"
          name="bgmusic"
          :min="0"
          :max="2000"
          :step="25"
          :value="dataValue.bgchange"
          :slide="setBackgroundMusicRange"
        />
        <div class="col_r_group flex">
          <a
            class="bgmusic_play"
            @click="bgmusic_play"
          ><span>▶</span></a>
          <a
            class="bgmusic_stop"
            @click="bgmusic_stop"
          ><span>■</span></a>
        </div>
      </div><!-- /.col_r -->
    </div><!-- /#bgmusic -->

    <div
      id="boss"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="boss" />
      </label>
      <div class="col_r">
        <component-select
          ref="boss_select"
          name="boss"
          :list="selectListBoss"
          :value="dataValue.boss"
          :is-open="selectListState.boss"
          :click-select="selectBoss"
          :click-selected="selectedBoss"
        />
      </div>
    </div><!-- #boss -->

    <div
      id="speed"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="speed" />
      </label>
      <div class="col_r">
        <component-range
          ref="speed"
          name="speed"
          :min="1"
          :max="5"
          :step="1"
          :value="dataValue.speed"
          :slide="setSpeedRange"
        />
      </div>
    </div><!-- #speed -->

    <div
      id="difficult"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="difficult" />
      </label>
      <div class="col_r">
        <component-range
          ref="difficult"
          name="difficult"
          :min="1"
          :max="5"
          :step="1"
          :value="dataValue.difficult"
          :slide="setDifficultRange"
        />
      </div>
    </div><!-- #speed -->

    <div
      id="map_infinite"
      class="form_group"
    >
      <label class="col_l">
        <shooting-gamefont string="infinite" />
      </label>
      <div class="col_r">
        <component-checkbox
          ref="infinite"
          name="infinite"
          :value="dataValue.map_infinite === 'true'"
          :checked="checkInfinite"
        />
      </div><!-- ./col_r -->
    </div><!-- ./form_group -->
  </section>
</template>

<script>
import Gamefont from '@/assets/vues/component_gamefont.vue';
import GAME_AUDIO from '@/assets/lib/shooting_audio';
import C_I from './component_input.vue';
import C_TA from './component_textarea.vue';
import C_S from './component_select.vue';
import C_R from './component_range.vue';
import C_C from './component_checkbox.vue';

export default {
  components: {
    'shooting-gamefont': Gamefont,
    'component-input': C_I,
    'component-textarea': C_TA,
    'component-select': C_S,
    'component-range': C_R,
    'component-checkbox': C_C,
  },
  props: {
    jsonConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const { others, canvasimgs, map } = this.jsonConfig;
    return {
      // ここは入力フォームに入力項目を設定する
      selectListBackGroundImage: [
        ...Object.keys(others.background_img),
        'none',
      ],
      selectListBackGroundMusic: [
        ...Object.keys(canvasimgs.audios)
          .filter((audio) => audio.indexOf('bg_') !== -1)
          .map((audio) => audio.replace('bg_', '')),
      ],
      selectListBoss: [
        ...Object.keys(map.enemies_boss),
      ],
    };
  }, // data
  computed: {
    dataValue() {
      return this.$store.getters['map/getMap'];
    },
    selectListState() {
      const { backgroundImage, backgroundMusic, boss } = this.$store.getters['edit/selectboxStatus'];
      return {
        image: backgroundImage,
        music: backgroundMusic,
        boss,
      };
    },
  },
  methods: {
    editedCount() {
      this.$store.dispatch('edit/editedCount');
    },
    setTitle(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        title: value,
      });
    },
    setBody(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        body: value,
      });
    },
    selectedBackgroundImage(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        background_img: value,
      });
      this.$store.dispatch('edit/allSelectboxClose');
    },
    selectBackgroundImage() {
      this.$store.dispatch('edit/openBackgroundImage');
      GAME_AUDIO.setStopOnBG();
    },
    setBackgroundImageRange(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        background_initx: value,
      });
    },
    selectedBackgroundMusic(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', { bgmusic: value });
      this.$store.dispatch('edit/allSelectboxClose');
    },
    selectBackgroundMusic() {
      GAME_AUDIO.setStopOnBG();
      this.$store.dispatch('edit/openBackgroundMusic');
    },
    setBackgroundMusicRange(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        bgchange: value,
      });
    },
    selectedBoss(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', { boss: value });
      this.$store.dispatch('edit/allSelectboxClose');
    },
    selectBoss() {
      GAME_AUDIO.setStopOnBG();
      this.$store.dispatch('edit/openBoss');
    },
    setSpeedRange(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        speed: value,
      });
    },
    setDifficultRange(value) {
      this.editedCount();
      this.$store.dispatch('map/setEditedMap', {
        difficult: value,
      });
    },
    checkInfinite(value) {
      this.editedCount();
      const { map, map_infinite: mapInfinite } = this.$store.getters['map/getStageMap'];
      let edittedMap = null;
      const mapCopy = [...map];
      if (value) {
        edittedMap = (mapInfinite === 'true') ? mapCopy : mapCopy.concat(map);
      } else {
        edittedMap = (mapInfinite === 'true') ? mapCopy.splice(0, 20) : mapCopy;
      }
      this.$store.dispatch('map/setEditedMap', {
        map: edittedMap,
        map_infinite: value ? 'true' : 'false',
      });
    },
    bgmusic_play() {
      GAME_AUDIO.setPlayOnBG(`${this.$store.getters['map/getBgMusic']}`);
    },
    bgmusic_stop() {
      GAME_AUDIO.setStopOnBG();
    },
  },
};
</script>

<style lang="scss" scoped>
section{
  position:relative;
  .form_group{
    border: 1px solid rgba(255,255,255,0);display:flex;margin-bottom:10px;padding:10px 20px;
    &:hover{
      border: 1px solid rgba(255,255,255,0.5);
      border-radius: 5px;
      background-color: rgba(255,255,255,0.2);
      box-shadow: 0 2px 5px rgba(99, 39, 39, 0.6);
    }
    .col_l{
      flex-shrink:0;margin-top:15px;margin-right:3%;text-align:right;width:22%;
      color:rgba(255,255,255,1);
    }
    .col_r{
      color:rgba(255,255,255,1);width:77%;
      .col_r_group:not(:last-of-type){margin-bottom:10px;}
    }

    /* bgmusic */
    &#bgmusic .col_r .col_r_group{
      &.flex{display:flex;}
      &> a{
        background-color: rgba(150,150,150,1);
        border:1px solid rgba(255,255,255,0.7);
        border-radius:5px;
        cursor:pointer;
        display:block;
        height:40px;
        position: relative;
        width:40px;
        span {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          margin: auto;
          height: 1em;
          width: 1em;
          line-height: 1em;
          font-size: 150%;
        }
      }
    }

  }
}

</style>
