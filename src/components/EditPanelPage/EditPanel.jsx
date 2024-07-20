// REACT
import React, { useState, useEffect } from "react";

// MUI
import { Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// COMPONENT
import DataModule from "./DataModule";
import InfoDialog from "./InfoDialog";
import SnackbarMsg from "./SnackbarMsg";

// JS
import { dataBuilder } from "../../util/dataBuilder";

function EditPanel() {
  // 基礎資料
  const [stateData, setStateData] = useState({
    // 預設資料, 引導使用者看範例資料集
    dataTemplate: [
      { id: 1, keyName: "DBID", dataModule: "loopIndex", generateCmd: "+1" },
      {
        id: 2,
        keyName: "GROUP",
        dataModule: "fixText",
        generateCmd: "testGroupName",
      },
      { id: 3, keyName: "ACCOUNT", dataModule: "randomChar", generateCmd: "5" },
      { id: 4, keyName: "ID", dataModule: "taiwanID", generateCmd: "" },
      {
        id: 5,
        keyName: "CREATE_DATE",
        dataModule: "momentjs",
        generateCmd: ".format('YYYY/MM/DD')",
      },
      {
        id: 6,
        keyName: "MODIFY_DATE",
        dataModule: "momentjs",
        generateCmd: ".add('$index', 'd').format('YYYY-MM-DD')",
      },
    ],
    // ID流水號
    idCount: 0,
    // 產生組數: 預設值
    generateCount: 3,
    // 產生結果字串 (JSON FORMAT)
    resultString: "",
  });

  // 掛載完成時更新流水號起始號碼
  useEffect(() => {
    stateData.idCount = stateData.dataTemplate.length;
  }, []);

  // 新增項目
  const addItem = () => {
    stateData.idCount++;
    let newItem = {
      id: stateData.idCount,
      keyName: "",
      dataModule: "",
      generateCmd: "",
    };
    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: [...prevState.dataTemplate, newItem],
    }));
  };

  // 移除項目
  const removeItem = (itemId) => {
    const newDataTemplate = stateData.dataTemplate.filter(
      (element) => element.id !== itemId,
    );
    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: newDataTemplate,
    }));
  };

  // 更新輸入KEY值
  const updateKeyName = (e, itemId) => {
    let newKeyName = e.target.value;
    let newDataTemplate = stateData.dataTemplate.map((element) => {
      if (element.id === itemId) {
        element.keyName = newKeyName;
      }
      return element;
    });
    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: newDataTemplate,
    }));
  };

  // 產生資料組數 驗證輸入值 資料型態為數值
  const validateNumber = (event) => {
    let newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount)) {
      // 最小值為1
      newCount = newCount > 0 ? newCount : 1;
    } else {
      newCount = stateData.generateCount;
    }

    setStateData((prevState) => ({
      ...prevState,
      generateCount: newCount,
    }));
  };

  // 更新使用者編輯的VALUE結果
  const syncSelection = (select, cmd, itemId) => {
    let newArr = stateData.dataTemplate.map((element) => {
      if (element.id === itemId) {
        element.dataModule = select;
        element.generateCmd = cmd;
      }
      return element;
    });

    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: newArr,
    }));
  };

  // 更新產生結果
  const updateResult = (e) => {
    let newResult = e.target.value;
    setStateData((prevState) => ({
      ...prevState,
      resultString: newResult,
    }));
  };

  // 執行資料產生
  const execGenerator = () => {
    // 防炸檢查 有資料&&檢查重複KEY
    if (stateData.dataTemplate.length === 0 || haveSameKey()) {
      sentSnackMsg({
        severity: "error",
        message: "KEY值重複或未設定資料組",
      });
      return;
    }

    // 丟給產生器
    let newResult = dataBuilder(
      stateData.dataTemplate,
      stateData.generateCount,
    );

    // 檢查產生結果是否正確
    if (newResult.status !== "success") {
      sentSnackMsg({
        severity: "warning",
        message: newResult.message,
      });
      return;
    }

    // 正確後更新 取出結果並美化JSON字串
    setStateData((prevState) => ({
      ...prevState,
      resultString: JSON.stringify(newResult.jsonArray, null, 2),
    }));
  };

  // 檢查資料是否有重複KEY存在
  const haveSameKey = () => {
    const mappingObj = {};
    let existSameKey = false;

    // 逐筆檢查 (有檢查到應該跳出forEach, 但這樣比較好讀)
    stateData.dataTemplate.forEach((element) => {
      // 有找到重複
      if (Object.hasOwn(mappingObj, element.keyName) || !element.keyName) {
        existSameKey = true;
      } else {
        // 沒重複就紀錄該筆KEY, 供之後比對
        mappingObj[element.keyName] = 1;
      }
    });
    return existSameKey;
  };

  // 警示訊息提示元件使用
  const [snackMsg, setSnackMsg] = useState(null);
  const sentSnackMsg = (snackObj) => {
    const { severity, message } = snackObj;
    setSnackMsg({
      severity,
      message,
    });
  };

  // 執行複製功能
  const execCopy = () => {
    try {
      const textToCopy = stateData.resultString;
      navigator.clipboard.writeText(textToCopy).then(() => {
        sentSnackMsg({
          severity: "success",
          message: "複製成功",
        });
      });
    } catch (error) {
      console.log(error);
      sentSnackMsg({
        severity: "error",
        message: `${error}`,
      });
    }
  };

  // 清除資料
  const clearResult = () => {
    setStateData((prevState) => ({
      ...prevState,
      resultString: "",
    }));
  };

  return (
    <React.Fragment>
      {/* 渲染TEMPLATE列表 */}
      <Grid container spacing={2} justifyContent="start" alignItems="center">
        {/* 說明 */}
        <Grid item xs={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            KEY
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              VALUE
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: 2 }} gutterBottom>
              (資料產生模組:自定義參數)
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          container
          justifyContent="end"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="總筆數"
              type="number"
              size="small"
              sx={{ width: 80 }}
              value={stateData.generateCount}
              onChange={(input) => validateNumber(input)}
            />
          </Grid>

          <Grid item>
            <Button
              onClick={addItem}
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
            >
              增加
            </Button>
          </Grid>
          <Grid item>
            <InfoDialog></InfoDialog>
          </Grid>
        </Grid>

        {/* 動態編輯列表 */}
        {stateData.dataTemplate.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* KEY值 */}
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label={"key" + (index + 1)}
                variant="outlined"
                onChange={(e) => updateKeyName(e, item.id)}
                value={item.keyName}
              />
            </Grid>
            {/* VALUE: 使用者填寫的VALUE與設定內容
                PROP: 丟下去預設選項
                ON: 使用者編輯後同步更新資料上來
            */}
            <Grid item container xs={7}>
              <DataModule
                propSelect={item}
                onSelection={(select, cmd) =>
                  syncSelection(select, cmd, item.id)
                }
              ></DataModule>
            </Grid>
            {/* 刪除某筆資料按鈕 */}
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                onClick={() => removeItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </React.Fragment>
        ))}

        {/* 產生按鈕 */}
        <Grid item xs={12} spacing={1} container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={execGenerator}
              size="small"
              startIcon={<AutoAwesomeIcon />}
            >
              產生
            </Button>
          </Grid>

          {/* 我知道很難用 只想秀一下條件渲染 */}
          <Grid item>
            {stateData.resultString && (
              <Grid item>
                <Button
                  onClick={execCopy}
                  variant="contained"
                  size="small"
                  color="secondary"
                  startIcon={<ContentCopyIcon />}
                >
                  複製
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item>
            {stateData.resultString && (
              <Grid item>
                <Button
                  onClick={clearResult}
                  variant="contained"
                  size="small"
                  color="warning"
                  startIcon={<RemoveIcon />}
                >
                  清除
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* 產生結果 */}
        <Grid item xs={12}>
          <TextField
            label="RESULT"
            variant="outlined"
            multiline
            fullWidth
            minRows={4}
            onChange={updateResult}
            value={stateData.resultString}
          />
        </Grid>
      </Grid>

      {/* 警示訊息元件 */}
      <SnackbarMsg propSnackMsg={snackMsg}></SnackbarMsg>
    </React.Fragment>
  );
}

export default EditPanel;
