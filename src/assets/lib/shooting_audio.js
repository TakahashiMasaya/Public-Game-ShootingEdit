// =====================================================
// shooting_audio.js
// 共通変数.js
// =====================================================
import config from '@/assets/jsons/shooting_config.json';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const GAME_AUDIO = { // オーディオ系スクリプト
  audios: [],
  audioContext: null,
  audioBufferLoader: null,
  audioNowObjBg: null, // バックグラウンド現在再生用
  audioContextSourceBg: null, // バックグラウンド再生用
  audioSetTimeout: null,
  audioLoadedCount: 0,
  isAudioContextSourceBg: false, // バックグラウンド再生中判別フラグ
  init() {
    this.audioContext = new window.AudioContext();
    const { audios } = config.canvasimgs;
    Object.keys(audios).forEach((v) => {
      const { src, volume, loopOffset } = audios[v];
      this.audios[v] = {
        src: `./assets/${src}`,
        volume,
        loopOffset,
        buf: {},
      };
    });
  },
  bufferringAudios() {
    this.init();
    return new Promise((res, rej) => {
      if (!this.audios) {
        rej(new Error('obj is an illegal.'));
        return;
      }

      let audioLoadedCount = 0;
      Object.keys(this.audios).forEach((key) => {
        window.fetch(this.audios[key].src, { cache: 'no-cache' })
          .then((audioData) => audioData.arrayBuffer())
          .then((arrayBufferAudioData) => {
            audioLoadedCount += 1;
            this.audioContext.decodeAudioData(arrayBufferAudioData, (_buf) => {
              this.audios[key].buf = _buf;
              if (audioLoadedCount >= Object.keys(this.audios).length) {
                res();
              }
            },
            () => {
              console.log(`一部音声読み込みに失敗しました。再度立ち上げなおしてください:${this.audios[key].src}`);
              rej(this.audios[key].src);
            });
          });
      });
    });
  },
  reset() {
    this.audioContext = null;
    this.audioBufferLoader = null;
    this.audioNowObjBg = null;
    this.audioContextSourceBg = null;
    this.isAudioContextSourceBg = false;
    this.audioSetTimeout = null;

    this.audioLoadedCount = 0;
  },
  setPlay(obj) {
    // 効果音用再生
    if (obj === null || obj === undefined) { return; }
    const s = this.audioContext.createBufferSource();
    s.buffer = obj.buf;
    s.loop = false;
    s.connect(this.audioContext.destination);
    s.start(0);
  },
  setOnBG(obj) {
    if (obj === undefined) { return; }
    this.audioNowObjBg = obj;
  },
  setPlayOnBG(name = '', loop = true) {
    // バックグラウンド用再生
    // 再生中の場合は、上書きする。
    // obj:再生させたい音声オブジェクト
    // loop:ループ可否
    // time:再生完了時間（ms）
    const audioObject = (this.audios[name] === undefined) ? this.audioNowObjBg : this.audios[name];
    if (audioObject === null) { return; }
    const time = audioObject.loopOffset || 0;

    if (this.isAudioContextSourceBg === true) {
      this.audioContextSourceBg.stop();
      this.isAudioContextSourceBg = false;
    }
    const t = this.audioContext.createBufferSource();
    t.buffer = audioObject.buf;
    this.audioNowObjBg = audioObject; // バッファの一時保存用
    t.connect(this.audioContext.destination);
    t.loop = (loop || loop === undefined);
    t.loopStart = time || 0;
    t.loopEnd = audioObject.buf.duration;
    t.start();

    this.audioContextSourceBg = t;
    this.isAudioContextSourceBg = true;
  },
  setStopOnBG() {
    // バックグラウンド用停止
    if (!this.isAudioContextSourceBg) { return; }
    this.audioContextSourceBg.stop();
    this.isAudioContextSourceBg = false;
    clearTimeout(this.audioSetTimeout);
  },
};

export default GAME_AUDIO;
