<template>
  <section
    id="map"
    @dragenter.stop="e_as_dragenter_out"
  >
    <h2>
      <shooting-gamefont
        string="editing map"
        width="20"
      />
    </h2>

    <section id="map_bts">
      <div class="map_select">
        <div class="map_select_title">
          <shooting-gamefont
            string="this theme"
            width="10"
          />
        </div>
        <div class="map_select_current_theme">
          <shooting-gamefont
            :string="dataValue.theme"
            width="15"
          />
        </div>
        <div
          class="map_select_tochange"
          @click.stop="e_map_select_tochange"
        >
          <span /><span />
        </div>
        <div class="map_select_change_theme">
          <div class="map_select_change_theme_title">
            <shooting-gamefont
              string="init theme to"
              width="10"
            />
          </div>
          <component-select
            :list="set_parts_map_select_list()"
            :value="dataValue.theme"
            :is-open="selectListState.theme"
            :click-select="selectTheme"
            :click-selected="selectedTheme"
          />
        </div><!--/.map_select_change_theme-->
      </div><!-- /.map_select_title -->
      <div class="map_bt_mapadd">
        <a
          class="map_bt add"
          nohref="#"
          @click="e_map_bts_add"
        >
          <shooting-gamefont
            string="add"
            width="10"
          />
        </a>
        <a
          class="map_bt remove"
          nohref=""
          @click="e_map_bts_remove"
        >
          <shooting-gamefont
            string="rmv"
            width="10"
          />
        </a>
      </div>
    </section>

    <section
      id="ruler"
      ref="ruler"
    >
      <div
        class="cannot-create-recovery-area"
        :style="styledCannotCreateRecoveryArea"
      />
      <div
        class="recovery-area"
        :style="styledRecoveryArea"
      />
      <div id="ruler_inner">
        <div
          v-for="(oRuler,i) in dataValue.map[0].length"
          :key="i"
        >
          <div
            :class="isRecoveryPoint(i)"
            @click="toggleRecoveryPoint(i)"
            @mouseover="showRecoveryArea(i)"
            @mouseleave="leaveRecoveryArea()"
          />
          <div
            class="ruler-number"
          >
            {{ (i)%4===0 ? (i)*25 : '' }}
          </div>
        </div>
      </div>
    </section>

    <section
      id="area"
      @scroll="e_map_scroll"
    >
      <div class="recoveryArea" />
      <section
        v-if="dataValue.img"
        :style="area_blocks_background_img_style"
        class="area_blocks_background_img"
      />
      <section
        ref="areaBlocks"
        class="area_blocks drop"
      >
        <div
          v-for="(oMap,index_y) in dataValue.map"
          :key="oMap.id"
          class="area_blocks_rows"
        >
          <div
            v-for="(value, index_x) in oMap"
            :key="value.id"
            class="area_block"
            :data-posx="index_x"
            :data-posy="index_y"
            :data-val="value"
            @dragend.stop.prevent="e_as_dragend"
            @dragenter.stop.prevent="e_as_dragenter"
            @dragleave.stop.prevent="e_as_dragleave"
          >
            <div
              v-if="filterPartsBlock(value)"
              class="parts_block"
              :data-width="getAttrDataValueWidth(value)"
              :data-height="getAttrDataValueHeight(value)"
              :draggable="true"
              @dragstart.stop="e_as_dragstart"
              @dragend.stop="e_as_dragend"
              @touchstart.stop.prevent="e_as_touchstart"
              @touchmove.stop.prevent="e_as_touchmove"
              @touchend.stop.prevent="e_as_touchend"
            >
              <div
                class="parts_block_inner"
                :style="getStylePartsBlock(value)"
              />
            </div><!-- /.parts_block -->
          </div>
        </div>
      </section>
    </section><!-- /#area -->

    <section id="area_parts_wrapper">
      <section id="area_parts">
        <div class="parts_blocks_wrapper enemy">
          <h3>
            <shooting-gamefont string="enemy parts" />
          </h3>
          <div class="parts_blocks">
            <div
              v-for="(value, key) in parts_enemy"
              :key="value.id"
              :data-val="key"
              class="parts_block_wrapper"
            >
              <div class="text" />
              <div
                class="parts_block"
                :data-width="getAttrDataValueWidth(key)"
                :data-height="getAttrDataValueHeight(key)"
                :data-val="key"
                :draggable="true"
                @dragstart.stop="e_as_dragstart"
                @dragend.stop="e_as_dragend"
                @touchstart.stop.prevent="e_as_touchstart"
                @touchmove.stop.prevent="e_as_touchmove"
                @touchend.stop.prevent="e_as_touchend"
              >
                <div
                  class="parts_block_inner"
                  :style="getStyleAreaPartsBlockInner(key)"
                />
              </div><!-- /.parts_block -->
            </div><!-- /.parts_block_wrapper -->
          </div><!--.parts_blocks -->
        </div><!--.parts_blocks_wrapper -->

        <div class="parts_blocks_wrapper map">
          <h3>
            <shooting-gamefont string="map parts" />
          </h3>
          <div class="parts_blocks">
            <div
              v-for="(value, key) in parts_map"
              :key="value.id"
              :data-val="key"
              class="parts_block_wrapper"
            >
              <div class="text" />
              <div
                class="parts_block"
                :data-width="getAttrDataValueWidth(key)"
                :data-height="getAttrDataValueHeight(key)"
                :data-val="key"
                :draggable="true"
                @dragstart.stop="e_as_dragstart"
                @dragend.stop="e_as_dragend"
                @touchstart.stop.prevent="e_as_touchstart"
                @touchmove.stop.prevent="e_as_touchmove"
                @touchend.stop.prevent="e_as_touchend"
              >
                <div
                  class="parts_block_inner"
                  :style="getStyleAreaPartsBlockInner(key)"
                />
              </div><!-- /.parts_block -->
            </div>
          </div><!--.parts_blocks -->
        </div><!--.parts_blocks_wrapper -->
      </section><!-- /#area_parts -->
    </section><!-- /#area_parts_wrapper -->

    <div
      v-if="draggingBlock.parts"
      id="dragging_parts_block"
      :class="{
        on: draggingBlock.class.on,
        touch: draggingBlock.class.touch
      }"
      :style="draggingBlock.styled"
    />
  </section><!-- /#map -->
</template>

<script>
import Gamefont from '@/assets/vues/component_gamefont.vue';
import C_S from './component_select.vue';

export default {
  components: {
    'shooting-gamefont': Gamefont,
    'component-select': C_S,
  },
  props: {
    jsonConfig: {
      type: Object,
      default: () => ({}),
    },
    initTheme: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      e_timeStamp: 0, // パーツのタイムスタンプ情報
      styledRecoveryArea: {},
      draggingBlock: {
        parts: null,
        styled: {
          left: '0px',
          top: '0px',
        },
        class: {
          on: false,
          touch: false,
        },
      }, // ドラッグ対象オブジェクト
      area_blocks_background_img_style: null, // マップ表示スタイル
    };
  },
  computed: {
    parts_enemy() {
      // 敵のパーツ一式
      return this.$store.getters['map/getCurrentEnemies'];
    },
    parts_map() {
      // マップのパーツ一式
      return this.$store.getters['map/getCurrentMap'];
    },
    selectListState() {
      const { theme } = this.$store.getters['edit/selectboxStatus'];
      return {
        theme,
      };
    },
    dataValue() {
      const {
        theme,
        background_initx: backgroundInitx,
        background_img: backgroundImage,
        map,
      } = this.$store.getters['map/getMap'];
      return {
        initx: backgroundInitx,
        img: backgroundImage,
        map: map.slice(),
        theme,
      };
    },
    recoveryPoint() { //  リカバリポイント情報
      return [...new Array(this.dataValue.map[0].length)]
        .map((o, i) => {
          const { recoveryPositionX } = this.$store.getters['map/getMap'];
          return recoveryPositionX && recoveryPositionX.indexOf(i * 25) !== -1;
        });
    },
    styledCannotCreateRecoveryArea() {
      return {
        left: `${20 * (this.dataValue.map[0].length - 41)}px`,
      };
    },
  },
  watch: {
    dataValue() {
      this.area_blocks_background_img_style = this.getStyleAreaBlockBKImg();
    },
  },
  mounted() {
    this.area_blocks_background_img_style = this.getStyleAreaBlockBKImg();
  },
  methods: {
    isRecoveryPoint(rulerPoint) {
      return this.recoveryPoint[rulerPoint] ? 'recovery-point on' : 'recovery-point';
    },
    toggleRecoveryPoint(rulerPoint) {
      this.recoveryPoint[rulerPoint] = !this.recoveryPoint[rulerPoint];
      this.showRecoveryArea(rulerPoint);
      this.editedCount();
      this.$store.dispatch(
        'map/setRecoveryPositionX',
        this.recoveryPoint.reduce((ar, cu, i) => (
          cu ? [...ar, i * 25] : ar
        ), []),
      );
    },
    leaveRecoveryArea() {
      this.styledRecoveryArea = {
        display: 'none',
        left: 'inherit',
      };
    },
    showRecoveryArea(rulerPoint) {
      if (!this.recoveryPoint[rulerPoint]) {
        this.styledRecoveryArea = {
          display: 'none',
          left: 'inherit',
        };
        return;
      }
      this.styledRecoveryArea = {
        display: 'block',
        left: `${20 * rulerPoint}px`,
      };
    },
    editedCount() {
      this.$store.dispatch('edit/editedCount');
    },
    set_parts_map_select_list() {
      return Object.keys(this.jsonConfig.map.theme).map((o) => (
        this.jsonConfig.map.theme[o].name
      ));
    },
    getStyleAreaBlockBKImg() {
      const {
        map,
        background_initx: backgroundInitX,
        background_img: backgroundImage,
      } = this.$store.getters['map/getMap'];
      const w = map[0].length * 20 * (5 / 4);
      const h = map.length * 20 * (5 / 4);
      return {
        background: (backgroundImage === 'none') ? '' : `url(./assets/images/shooting_background_${backgroundImage}.png)`,
        width: `${(w - backgroundInitX)}px`,
        height: `${h}px`,
        left: `${(backgroundInitX * (4 / 5))}px`,
      };
    },
    filterPartsBlock(_p) {
      if (_p === undefined) { return false; }
      if (_p === null) { return false; }
      if (_p === '0') { return false; }
      return true;
    },
    getImgPartsBlock(p) {
      const img = (p.match(/[A-Z]/) === null)
        ? this.parts_enemy[p]
        : this.parts_map[p];

      if (img === undefined) {
        return null;
      }
      const jsonImg = this.jsonConfig.canvasimgs.imgs;
      if (jsonImg[img] === undefined) {
        return null;
      }

      const {
        src,
        w,
        h,
        backgroundSize,
        transformOrigin,
        transform,
        posx,
        posy,
      } = jsonImg[img];
      return {
        src,
        w: w || 20,
        h: h || 20,
        backgroundSize: backgroundSize || 'cover',
        transform: transform || 'scale(1,1)',
        transformOrigin: transformOrigin || 'center',
        posx: posx || 0,
        posy: posy || 0,
      };
    },
    getStylePartsBlock(_p) {
      // マップエリア内、敵とマップパーツのスタイル定義
      const o = this.getImgPartsBlock(_p);
      if (o === null) { return null; }
      const {
        src,
        w,
        h,
        transform,
        backgroundSize,
        transformOrigin,
        posx,
        posy,
      } = o;
      return ({
        border: '0.2px dotted rgba(255,255,255,1.0)',
        background: `url(./assets/${src}) ${posx || 0}px ${posy || 0}px/ ${backgroundSize || 'cover'} no-repeat`,
        width: `${w}px`,
        height: `${h}px`,
        transform,
        transformOrigin,
      });
    },
    getAttrDataValueWidth(_p) {
      // data属性width
      const o = this.getImgPartsBlock(_p);
      if (o === null) { return null; }
      return o.w;
    },
    getAttrDataValueHeight(_p) {
      // data属性height
      const o = this.getImgPartsBlock(_p);
      if (o === null) { return null; }
      return o.h;
    },
    getStyleAreaPartsBlockInner(_p) {
      // パーツブロック内、敵とマップパーツのスタイル定義
      const o = this.getImgPartsBlock(_p);
      if (o === null) { return null; }
      // scaleで調整させるための設定
      // 幅・高さを参照して比率を求める
      const w = (o.w <= o.h) ? 100 * (o.w / o.h) : 100;
      const h = (o.w <= o.h) ? 100 : 100 * (o.h / o.w);
      const top = (o.w <= o.h) ? '0' : `calc(50% - ${h / 2}px)`;
      const left = (o.w <= o.h) ? `calc(50% - ${w / 2}px)` : '0';
      const rate = (o.w <= o.h) ? 100 / o.h : 100 / o.w;
      return {
        background: `url(./assets/${o.src}) ${o.posx * rate}px ${(o.posy || 0) * rate}px/${o.backgroundSize || 'center'} no-repeat`,
        width: `${w}px`,
        height: `${h}px`,
        top,
        left,
        transform: o.transform,
        transformOrigin: o.transformOrigin,
      };
    },
    area_block_class_clear() {
      document.querySelectorAll('.area_block.on,.area_block.over').forEach((o) => o.classList.remove('on', 'over'));
    },

    e_map_select_tochange() {
      document.querySelector('.map_select').classList.toggle('on');
    },
    e_map_bts_add() {
      // マップの後方にブロックを追加する
      const { map } = this.$store.getters['map/getMap'];
      this.$store.dispatch('map/setEditedMap', {
        map: map.map((o) => `${o}0`),
      });
      this.editedCount();
    },
    e_map_bts_remove() {
      // マップの後方からブロックを削除する
      const { map } = this.$store.getters['map/getMap'];
      this.$store.dispatch('map/setEditedMap', {
        map: map.map((o) => o.slice(0, -1)),
      });
    },
    e_map_scroll(e) {
      const { width } = this.$refs.areaBlocks.getBoundingClientRect();
      //  スクロールが両端に届いた時の調整
      if (e.target.scrollLeft === 0) {
        // 左端
        this.$refs.ruler.scrollLeft = 0;
        return;
      }
      if (e.target.scrollLeft >= width) {
        // 右端
        this.$refs.ruler.scrollLeft = width;
        return;
      }
      this.$refs.ruler.scrollLeft = e.currentTarget.scrollLeft;
    },

    //  dataのmapデータに値をセットする
    set_dataValue_map(x, y, val) {
      //  何かしら値が設定されていない場合は、セットしない
      if (x === undefined || x === null
        || y === undefined || y === null
        || val === undefined || val === null) {
        return;
      }
      const mapX = Math.trunc(x / 20);
      const mapY = Math.trunc(y / 20);

      const str = this.dataValue.map[mapY];
      this.dataValue.map[mapY] = str.slice(0, mapX) + val + str.slice(mapX + 1, str.length);
      this.$store.dispatch('map/setEditedMap', {
        map: this.dataValue.map,
      });
    },
    is_enable_dragPartsBlock_in_area(e) {
      //  ドロップ先が#area内にあるか
      const $area = document.querySelector('#area');
      const {
        left,
        right,
        top,
        bottom,
      } = $area.getBoundingClientRect();

      //  console.log(e);
      //  console.log(_areaPosition)
      //  ブラウザの表示部分から表示位置を取得する
      const {
        clientX,
        clientY,
      } = (e.changedTouches) ? e.changedTouches[0] : e;
      const eX = clientX;
      const eY = clientY;
      return eX >= left
        && eX <= right
        && eY >= top
        && eY <= bottom;
    },
    get_pos_in_area(e) {
      //  #area内、area_blockの位置を取得
      const $area = document.querySelector('#area');
      const { x, y } = $area.getBoundingClientRect();

      //  console.log(e);
      //  console.log(_areaPosition)
      //  ブラウザの表示部分から表示位置を取得する
      const ev = (e.changedTouches) ? e.changedTouches[0] : e;
      const eX = ev.clientX;
      const eY = ev.clientY;

      return {
        x: eX - x + $area.scrollLeft,
        y: eY - y + $area.scrollTop,
      };
    },
    is_dragPartsBlock_in_area() {
      // ドラッグ対象オブジェクトが#area内かどうかの判別
      return this.draggingBlock.parts.closest('#area');
    },

    // ===================
    //  以下はiPad用のメソッド
    // ===================
    is_out_with_dragPartsBlock(e) {
      // オブジェクト（e）が、area_partsからはみ出るか判定
      // true:はみ出る
      // false:はみ出ない
      if (!this.is_enable_dragPartsBlock_in_area(e)) {
        // #area以外であれば無条件ではみ出ない判定
        return false;
      }
      const position = {
        x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
        y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY,
      };
      // areaの位置取得
      const $area = document.querySelector('#area');
      const areaPosition = $area.getBoundingClientRect();

      // マップエリアのサイズを取得
      const mapArea = {
        width: this.dataValue.map[0].length * 20,
        height: this.dataValue.map.length * 20,
      };
      // ドラッグオブジェクトのサイズを取得
      const partsBlock = {
        width: parseInt(this.draggingBlock.parts.dataset.width, 10),
        height: parseInt(this.draggingBlock.parts.dataset.height, 10),
      };

      // console.log(`${mapArea.width} / ${_partsBlock.width} / ${_e.x} / ${$area.scrollLeft}`)
      // console.log(`${mapArea.height} / ${_partsBlock.height}
      // / ${_e.y - areaPosition.top} / ${$area.scrollTop}`)
      // ドラッグオブジェクトが、マップエリアからはみ出ないようにする。
      return (mapArea.width < partsBlock.width
        + (position.x - 20 - areaPosition.left) + $area.scrollLeft
      || mapArea.height < partsBlock.height
        + (position.y - 20 - areaPosition.top) + $area.scrollTop);
    },
    is_touch_enable(e) {
      // タッチによるドラッグ・ドロップ有効判定
      // 500ms以上による長押しで有効
      return e.timeStamp - this.e_timeStamp >= 500;
    },
    e_as_touchstart(e) {
      // touchイベント開始用
      this.e_timeStamp = e.timeStamp;
      console.log('_e_as_touchstart');
      this.draggingBlock.parts = e.currentTarget;
      this.draggingBlock.class.touch = true;
    },
    e_as_touchmove(e) {
      // touchイベント移動用
      // console.log(e.timeStamp)
      if (!this.is_touch_enable(e)) {
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      // overのリセット
      document.querySelectorAll('#area .area_block').forEach((o) => o.classList.remove('over'));

      // オブジェクトをタッチ位置に調整する
      // #map起点を調整する
      const $map = document.querySelector('#map');
      const $pb = document.querySelector('#dragging_parts_block');
      this.draggingBlock.styled = {
        left: `${e.changedTouches[0].pageX - $map.offsetLeft}px`,
        top: `${e.changedTouches[0].pageY - $map.offsetTop}px`,
        position: 'absolute',
      };
      if ($pb.innerHTML === '') {
        $pb.appendChild(this.draggingBlock.parts.parentElement.cloneNode(true));
      }

      // ドラッグオブジェクトに対して、
      // ドラッグ可否のステータスをセットする
      this.draggingBlock.class.on = this.is_out_with_dragPartsBlock(e);

      if (!this.is_enable_dragPartsBlock_in_area(e)) {
        // #areaからはみ出る場合は、以下の処理は行わない
        return;
      }
      const pos = this.get_pos_in_area(e);
      if (!document.querySelectorAll('#area .area_blocks_rows')[Math.trunc(pos.y / 20)]) { return; }
      // over
      document.querySelectorAll('#area .area_blocks_rows')[Math.trunc(pos.y / 20)].childNodes[Math.trunc(pos.x / 20)].classList.add('over');
      console.log('_e_as_touchmove');
    },
    e_as_touchend(e) {
      console.log('_e_as_touchend');
      this.draggingBlock.class.touch = false;
      this.area_block_class_clear();
      if (!this.draggingBlock.parts) {
        return;
      }

      if (!this.is_touch_enable(e)) {
        this.draggingBlock.parts = null;
        return;
      }
      if (this.is_out_with_dragPartsBlock(e)) {
        //  #area内でかつドロップできない条件の場合は、ここで終了
        this.draggingBlock.parts = null;
        return;
      }
      if (!this.is_dragPartsBlock_in_area()
        && !this.is_enable_dragPartsBlock_in_area(e)) {
        //  #area外からのパーツからドラッグして、
        //  #area内にドロップできなければ終了
        this.draggingBlock.parts = null;
        return;
      }

      //  =======ここから編集完了処理
      if (this.is_dragPartsBlock_in_area()) {
        //  #areaからのドラッグであれば、元を削除する
        const { posx, posy } = this.draggingBlock.parts.closest('.area_block').dataset;
        //   データのセット
        this.set_dataValue_map(
          parseInt(posx, 10) * 20,
          parseInt(posy, 10) * 20,
          '0',
        );
      }
      if (this.is_enable_dragPartsBlock_in_area(e)) {
        //  #areaへドロップした場合は、
        //  その領域にデータをセットする。
        const { x, y } = this.get_pos_in_area(e);
        //   データのセット
        this.set_dataValue_map(
          x,
          y,
          this.draggingBlock.parts.parentElement.dataset.val,
        );
      }
      this.area_block_class_clear();
      this.draggingBlock.parts = null;
      //  編集カウントを増やす
      this.editedCount();
    },

    //  ===================
    //  以下はPC用のメソッド
    //  ===================
    is_drag_dragPartsBlock_in_area(e) {
      //  ドラッグ対象オブジェクトが#area内かどうかの判別
      return e.currentTarget.closest('#area');
    },
    e_as_dragstart(e) {
      console.log('_f_as_dragstart');
      this.draggingBlock.parts = e.currentTarget;
    },
    e_as_dragleave(e) {
      console.log('_f_as_dragleave');
      e.currentTarget.classList.remove('on');
      e.currentTarget.classList.remove('over');
    },
    e_as_dragenter(e) {
      e.currentTarget.classList.add(this.is_map_area_out(e) ? 'over' : 'on');
    },
    e_as_dragenter_out() {
      console.log('e_as_dragenter_out');
    },
    e_as_dragend(e) {
      console.log('f_as_dragend');
      //  ドロップ元の座標とドロップ先の座標を取得したら、
      //  ドロップ元の座標には0、ドロップ先の座標にはdata-valを設定
      this.editedCount();
      if (this.draggingBlock.parts === null) {
        return;
      }

      if (this.is_out_with_dragPartsBlock(e)) {
        //  #area内でかつドロップできない条件の場合は、ここで終了
        this.draggingBlock.parts = null;
        return;
      }
      if (!this.is_dragPartsBlock_in_area()
        && !this.is_enable_dragPartsBlock_in_area(e)) {
        //  #area外からのパーツからドラッグして、
        //  #area内にドロップできなければ終了
        this.draggingBlock.parts = null;
        return;
      }

      //  以下は通常処理
      //  ドロップ先の座標を取得
      if (this.is_dragPartsBlock_in_area()) {
        //  #areaからのドラッグであれば、元を削除する
        const { posx, posy } = e.currentTarget.parentElement.dataset;
        //   データのセット
        this.set_dataValue_map(
          parseInt(posx, 10) * 20,
          parseInt(posy, 10) * 20,
          '0',
        );
      }
      if (this.is_enable_dragPartsBlock_in_area(e)) {
        const { x, y } = this.get_pos_in_area(e);
        //   データのセット
        this.set_dataValue_map(
          x,
          y,
          this.draggingBlock.parts.parentElement.dataset.val,
        );
      }
      //  リセット
      this.area_block_class_clear();
      this.draggingBlock.parts = null;
    },
    is_map_area_out(e) {
      //  オブジェクト（e）が、area_partsからはみ出るか判定
      //  true:はみ出る
      //  false:はみ出ない
      //  area_partsの座標を取得
      const {
        offsetLeft,
        offsetTop,
      } = e.currentTarget;
      //  ップエリアのサイズを取得
      const mapareaW = this.dataValue.map[0].length * 20;
      const mapareaH = this.dataValue.map.length * 20;
      //  ドラッグオブジェクトのサイズを取得
      const partsBlockW = parseInt(this.draggingBlock.parts.dataset.width, 10);
      const partsBlockH = parseInt(this.draggingBlock.parts.dataset.height, 10);

      // ドラッグオブジェクトが、マップエリアからはみ出ないようにする。
      if (mapareaW - offsetLeft < partsBlockW
        || mapareaH - offsetTop < partsBlockH) {
        // マップエリア外であれば表示させない
        return false;
      }
      return true;
    },
    selectedTheme(val) {
      this.editedCount();
      this.init_theme(val);
    },
    selectTheme() {
      this.$store.dispatch('edit/openTheme');
    },
  },
};
</script>

<style lang="scss" scoped>
#map{
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 1) inset;
  background: linear-gradient(to bottom, rgba(40, 40, 40, 1) 0%, rgba(20, 20, 20, 1) 20%);
  border:2px solid rgba(255, 255, 255, 1);
  border-radius:3px;
  color: rgba(255,255,255,1);
  margin-bottom:80px;
  overflow:hidden;
  margin: 0px 20px;
  margin-bottom: 20px;
  position: relative;
  *{
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  h2{padding:20px; text-align:center;}

  section#map_bts {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 30px 20px;
    position: relative;
    z-index: 15;

    a {
      background-color: rgba(255,255,255,0.3);
      border: 1px solid rgba(255,255,255,1);
      border-radius: 5px;
      cursor: pointer;
      display: inline-block;
      line-height: 0px;
      padding: 10px;
      transition: 0.3s background-color;
    }

    .map_bt_mapadd {
      align-items: center;
      display: flex;
      a:not(:last-of-type){margin-right: 20px;}
    }

    .map_select {
      align-items: center;
      border: 1px solid rgba(255,255,255,0.4);
      border-radius: 5px;
      display: flex;
      height: 70px;
      margin-right: 20px;
      padding: 10px 20px;
      position: relative;
      z-index: 10;

      &>*:not(:last-child){
        margin-right: 20px;
      }
      .map_select_tochange {
        cursor: pointer;
        display: flex;
        span {
          border-left: 10px solid rgba(255,255,255,0.8);
          border-top: 7px solid transparent;
          border-bottom: 7px solid transparent;
          display: block;
          height: 0px;
          width: 0px;
        }
      }

      .map_select_change_theme {
          align-items: center;
          border-left: 1px solid rgba(255, 255, 255, 0.4);
          display: none;
          padding-left: 20px;
          justify-content: space-between;

          &>*:not(:last-child){
            margin-right: 20px;
          }

          .col_r_group{
            min-width: 200px;
          }
      }
      &.on .map_select_tochange{
        transform: rotate(180deg);
      }
      &.on .map_select_change_theme{
        display: flex;
      }

    }
  }

  #ruler {
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-top: 2px solid #ffffff;
    margin: 30px;
    margin-bottom: 0px;
    position: relative;
    overflow: hidden;

    .cannot-create-recovery-area {
      width: 820px;
      height: 100%;
      position: absolute;
      top: 0px;
      background-color: rgba(255, 255, 255, 0.3);
      z-index: 5;
      &::before {
        content: 'can\'t create recovery point';
        position: absolute;
        left: 0px;
        display: none;
      }
      &.on::before {
        display: block;
      }
    }

    .recovery-area {
      display: none;
      width: 820px;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: rgba(255, 255, 0, 0.4);
      z-index: 0;
      border: 2px solid rgba(255,255,0,1);
    }

    #ruler_inner{
      display:flex;
      div.recovery-point {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        z-index: 2;
        border-top: 15px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        &.on {
          border-top: 15px solid rgba(255, 155, 53, 1);
        }
      }
      div.ruler-number {
        flex-shrink: 0;
        line-height: 1em;
        color: rgba(255, 255, 255, 0.5);
        white-space: nowrap;
        width: 20px;
        height: 2em;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          height: 100%;
          display: block;
          top: 0px;
          border: 1px dotted rgba(255, 255, 255, 0.3);
        }
      }
    }
  }// #ruler

  #area{
    background-color:rgba(0,0,0,1);
    border:2px solid rgba(255,255,255,0.8);
    height:405px;
    margin-bottom:2em;
    margin-left:30px;
    margin-right:30px;
    overflow:auto;
    position:relative;
    -webkit-overflow-scrolling: touch;
    -khtml-user-drag:element;

    #area_selectable{
      background-color:rgba(0,0,0,0.1);
      border:1px dotted rgba(0,0,0,1);
      display:none;
      position:absolute;
      z-index:10;
      &.on{display:block;}
    }

    .area_blocks_background_img {
      background: none;
      background-repeat: repeat;
      height: 100%;
      left: 0px;
      position: absolute;
      transform-origin: top left;
      transform: scale(0.8);
      top: 0px;
      width: 100%;
      z-index: 0;
    }

    .area_blocks{
      left:0px;position:absolute;top:0px;
      &.drop{z-index:10;}

      .area_blocks_rows{
        display:flex;
        .area_block{
          border:1px dotted rgba(255,255,255,0.3);
          flex-shrink:0;
          height:20px;
          position:relative;
          width:20px;
          &.on:before{
              content: 'Can\'t Drop!!';
              color: rgba(0,0,0,1);
              position: absolute;
              padding: 0px 1em;
              display: inline-block;
              background-color:rgba(255,255,255,0.8);
              border-radius: 5px;
              right: 0px;
              white-space: nowrap;
              z-index:100;
          }
          .parts_block{
            position: relative;
            z-index:0;
            .parts_block_inner{
              position: absolute;
            }
            &.touch .parts_block_inner {
              background-color: rgba(255,255,255,0.5) !important;
              opacity: 0.5;
            }
          }
          &.over{background-color:rgba(255,255,255,0.4);}
        }
      }
    }
  }// #area

  #area_parts{
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(to bottom, rgba(50, 50, 50, 1) 0%, rgba(20, 20, 20, 1) 100%);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 1) inset;
    display:flex;
    overflow:hidden;
    overflow-x:auto;
    position:relative;
    z-index:0;

    .parts_blocks_wrapper{
      flex-shrink:0;overflow:hidden;padding:30px 30px;width:50%;
      h3{border-bottom:1px solid rgba(255,255,255,1);margin-bottom:10px;padding-bottom:10px;}
    }

    .parts_blocks{
      display:flex;
      padding: 10px 0px;
      position: relative;
      overflow-x:auto;
      overflow-y:hidden;
      -webkit-overflow-scrolling: touch;
      &.on{overflow-x: hidden;}

      .parts_block_wrapper{
        flex: 0 0 100px;
        margin:10px 0px;
        margin-right: 40px;
        position:relative;
        text-align:center;
        width:100px;
        .text{display:none;}

        .parts_block{
          border: 1px dotted rgba(255,255,255,1);
          background-color:rgba(255,255,255,0.2) !important;
          overflow:hidden;
          height:100px;
          position:relative;
          width:100px;
          .parts_block_inner{
            overflow:hidden;
            position: absolute;
            height:100px;
            width:100px;
          }
        }
      }

    }// .parts_blocks
  }// #area_parts

  #dragging_parts_block{
    background-color: rgba(255,255,255,0.5);
    border: 1px dotted #ffffff;
    opacity: 0.9;
    position: absolute;
    z-index: 100;
    &.on:before{
      content: 'Can\'t Drop!!';
      color: rgba(0,0,0,1);
      position: absolute;
      padding: 0px 1em;
      display: inline-block;
      background-color:rgba(255,255,255,0.8);
      border-radius: 5px;
      left: 0px;
      top: -20px;
      white-space: nowrap;
      z-index:100;
    }
  }

}// #map

</style>
