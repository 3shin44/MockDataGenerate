// REACT
import React, { useState, useEffect } from "react";

// MUI
import { Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// JS
import moduleCfg from "./moduleCfg";

function DataModule({ propSelect, onSelection }) {
  // 基礎資料
  const [moduleData, setModuleData] = useState({
    // 資料模組列表與提示參數
    moduleList: moduleCfg,
    // 使用者編輯資料
    currentSelect: "",
    currentCmd: "",
  });

  // 有預選時自動帶入
  useEffect(() => {
    if (propSelect) {
      setModuleData((prevData) => ({
        ...prevData,
        currentSelect: propSelect.dataModule,
        currentCmd: propSelect.generateCmd,
      }));
    }
  }, [propSelect]);

  // 取得指定模組資料 (無資料時預設使用固定字串組)
  const getModuleSet = () => {
    let getItem = moduleData.moduleList.find(
      (item) => item.moduleType === moduleData.currentSelect,
    );

    // 無資料時預設使用固定字串組
    if (!getItem) {
      getItem = moduleData.moduleList[0];
      setModuleData((prevState) => ({
        ...prevState,
        currentSelect: "fixText",
      }));
    }

    return getItem;
  };

  // 通知上層資料更新 & 更新自身狀態
  const updateEditContent = (actionType, data) => {
    let newSelection = moduleData.currentSelect;
    let newCmd = moduleData.currentCmd;

    // 選項更新 (清空目前編輯內容)
    if (actionType === "selectOption") {
      newSelection = data.target.value;
      newCmd = "";
    }

    // 內文更新
    if (actionType === "inputText") {
      newCmd = data.target.value;
    }

    // 更新自身狀態
    setModuleData((prevState) => ({
      ...prevState,
      currentSelect: newSelection,
      currentCmd: newCmd,
    }));

    // 通知上層更新
    onSelection(newSelection, newCmd);
  };

  return (
    <React.Fragment>
      <Grid container justifyContent="start" alignItems="center">
        <Grid item xs={4}>
          {/* SELECT選擇 資料產生模組 */}
          <Select
            size="small"
            fullWidth
            onChange={(e) => updateEditContent("selectOption", e)}
            value={moduleData.currentSelect}
          >
            {moduleData.moduleList.map((item, index) => (
              <MenuItem key={index} value={item.moduleType}>
                {item.displayName}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={8}>
          {/* 使用者輸入自定義參數 */}
          <TextField
            placeholder={getModuleSet().holderText}
            onChange={(e) => updateEditContent("inputText", e)}
            value={moduleData.currentCmd || ""}
            disabled={getModuleSet().disabled || false}
            fullWidth
            size="small"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DataModule;
