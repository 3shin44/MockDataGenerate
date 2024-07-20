import moment from "moment";
import {
  generateTaiwanID,
  generateRandomString,
  generateRandomPhoneNumber,
} from "./dataModule";

// 資料產生器入口
export function dataBuilder(dataList, count) {
  // 回傳物件格式
  let result = {
    status: "fail",
    message: "",
    jsonArray: [],
  };

  // TRY: 如果傳入錯誤指令與格式, CATCH儲存錯誤訊息後回傳
  try {
    // 產生設定檔物件
    let config = configBuilder(dataList);

    // 產測資
    for (let index = 0; index < count; index++) {
      // 建立該筆資料基礎物件
      let template = templateBuilder(dataList);
      // 依據KEY與對應指令產VALUE
      for (const [key, value] of Object.entries(template)) {
        template[key] = valueBuilder(config, key, index);
      }
      // 做完推到jsonArray
      result.jsonArray.push(template);
    }
    // 更新回傳狀態
    result.status = "success";
  } catch (error) {
    // CATCH將error物件字串化後丟回
    result.message = `${error}`;
  }

  return result;
}

// 產生單組資料模板
function templateBuilder(dataList) {
  let template = {};
  // 物件裡面產生對應KEY值 (VALUE給valueBuilder做)
  dataList.forEach((element) => {
    template[element.keyName] = undefined;
  });
  return template;
}

// 產生各組資料 對應模組與使用者輸入指令
// 直接用keyName取到 dataModule/generateCmd
// 例如: {
//          DBID: {
//                  dataModule: "loopIndex",
//                  generateCmd: "+1"
//                },
//          ID:   {
//                  dataModule: "taiwanID",
//                  generateCmd: ""
//                }
//       }
function configBuilder(dataList) {
  let config = {};
  // generate Key
  dataList.forEach((element) => {
    config[element.keyName] = {};
    config[element.keyName].dataModule = element.dataModule;
    config[element.keyName].generateCmd = element.generateCmd;
  });
  return config;
}

// 由config取出對應 產資料模組, 產生指令與替換迴圈值
// 後面會丟給其他LIB
function valueBuilder(config, key, index) {
  let dataValue;
  let moduleType = config[key].dataModule;
  let cmd = config[key].generateCmd;

  switch (moduleType) {
    case "fixText":
      dataValue = cmd;
      break;

    case "loopIndex":
      cmd = `${index}${cmd}`;
      dataValue = Number(eval(cmd));
      break;

    case "momentjs":
      cmd = "moment()" + cmd;
      cmd = cmd.replaceAll("$index", Number(index));
      // 有點炫砲 new Function
      dataValue = new Function("moment", `return ${cmd}`)(moment);
      break;

    case "taiwanID":
      dataValue = generateTaiwanID();
      break;

    case "randomChar":
      cmd = Number(cmd);
      // 傳入參數防爆寫在generateRandomString
      dataValue = generateRandomString(cmd);
      break;

    case "phoneNumber":
      dataValue = generateRandomPhoneNumber();
      break;

    default:
      dataValue = "";
      break;
  }

  return dataValue;
}
