// =====================================================
// shooting_common.js
// 共通変数.js
// =====================================================

export const SHOOTING_COMMON = { // ゲーム用スクリプト
  url_params: {},
  txt: { // スプライトされたフォントのマッピング
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
  setUrlParams() {
    const prm = window.location.search.slice(1).split(/(&|&amp;)/);
    prm.forEach((i) => {
      const p = prm[i].replace('amp;', '').split('=');
      if (p[0] === '' || p[0] === undefined) { return; }
      if (p[0] === '&') { return; }
      this.url_params = {
        ...this.url_params,
        [p[0]]: p[1],
      };
    });
  },
  setTextToFont(str, w) {
    // ブラウザ用にテキストからフォントに置換させる。
    const stringWidth = w || 30;
    let s = '';
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === ' ') {
        s += `<img src="./assets/images/shooting_spacer.png" width="${stringWidth}">`;
      } else {
        const pos = parseInt(this.txt[str[i]], 10) * (stringWidth / 60) * -1;
        s += `<div style="background:url(./assets/images/shooting_font.png) no-repeat;width:${stringWidth}px;height:${stringWidth}px;background-position:${pos}px 0px;background-size:cover;display:inline-block;"></div>`;
      }
    }
    return s;
  },
};

export const JSON_DATA = {
  val: null,
  setData(d) {
    if (!d) { return; }
    this.val = d;
  },
  getData() {
    return this.val;
  },
};
