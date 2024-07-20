// 資料模組基礎設定檔
const moduleCfg = [
  {
    displayName: "固定字串",
    moduleType: "fixText",
    holderText: "產生固定字串",
    description: "產生固定字串, 例: test Text",
  },
  {
    displayName: "迴圈索引值",
    moduleType: "loopIndex",
    holderText: "使用迴圈索引值",
    description: "使用迴圈索引值, 可傳入計算式, 如: +1, +100",
  },
  {
    displayName: "時間(Moment)",
    moduleType: "momentjs",
    holderText: "使用Moment.js",
    description:
      "傳入Moment.js語法<br>  " +
      "基礎用法: .format('YYYY/MM/DD') 指定日期格式 <br>  " +
      "進階用法: 傳入迴圈索引值'$index', 遞增日期 .add('$index', 'd') <br>  " +
      "官方說明: <a href='https://momentjs.com/'>momentjs</a>",
  },
  // 多一組鎖定, 不須自定義參數
  {
    displayName: "台灣身份證字號",
    moduleType: "taiwanID",
    holderText: "(自動產生) 台灣身份證字號",
    disabled: true,
    description: "無自定義參數, 隨機產生身分證字號",
  },
  {
    displayName: "隨機字串",
    moduleType: "randomChar",
    holderText: "產生指定長度隨機字串",
    description:
      "產生指定長度隨機字串, 傳入整數值<br>  " + "無指定或非數值預設長度: 5",
  },
  {
    displayName: "手機號碼",
    moduleType: "phoneNumber",
    holderText: "產生隨機手機號碼",
    disabled: true,
    description: "無自定義參數, 產生隨機手機號碼",
  },
];

export default moduleCfg;
