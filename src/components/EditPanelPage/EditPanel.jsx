import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function EditPanel() {
  // 基礎資料
  const [stateData, setStateData] = useState({
    dataTemplate: [
      { id: 1, keyName: "DBID", dataModule: "fixString", value: "123" },
      { id: 2, keyName: "NAME", dataModule: "fixString", value: "456" },
      { id: 3, keyName: "ACCOUNT", dataModule: "fixString", value: "789" },
    ],
    // 初始化ID流水號
    idCounter: 3,
    // 產生組數
    generateCount: 3
  });

  // 新增項目
  const addItem = () => {
    stateData.idCounter++;
    let newItem = {
      id: stateData.idCounter,
      keyName: "",
      dataModule: "",
      value: ""
    };
    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: [...prevState.dataTemplate, newItem],
    }));
  };

  const removeItem = (itemId) => {
    const newDataTemplate = stateData.dataTemplate.filter(
      (e) => e.id !== itemId,
    );
    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: newDataTemplate,
    }));
  };

  // 驗證輸入值 資料型態為數值
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
      generateCount: newCount
    }));
  };

  const updateSelection = (event, itemId) => {

    setStateData(prevState => ({
      ...prevState,
      dataTemplate: prevState.dataTemplate.map(item => {
        if (item.id === itemId) {
          item.dataModule = event.target.value
        }
        return item
      })
    }));
  }

  return (
    <div>
      {/* 渲染TEMPLATE列表 */}
      <Grid container spacing={2} justifyContent="start" alignItems="center">
        {/* 說明 */}
        <Grid item xs={4}>
          KEY
        </Grid>

        <Grid item xs={5}>
          VALUE
        </Grid>
        <Grid item xs={3} container justifyContent="end" alignItems="center" spacing={2} >
          <Grid item>
            <TextField
              label="Amount"
              type="number"
              size="small"
              sx={{ width: 80 }}
              value={stateData.generateCount}
              onChange={(input) => validateNumber(input)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={addItem}
              size="small"
              startIcon={<AddIcon />}
            >
              ADD
            </Button>
          </Grid>

        </Grid>

        {/* 動態編輯列表 */}
        {stateData.dataTemplate.map((item, index) => (
          <React.Fragment key={item.id}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label={"key" + (index + 1)}
                variant="outlined"
                defaultValue={item.keyName}
              />
            </Grid>
            <Grid item container xs={7}>
              <Grid item xs={4}>
                <Select
                  size="small"
                  fullWidth
                  onChange={(e) => updateSelection(e, item.id)}
                  value={item.dataModule}
                >
                  <MenuItem value={'fixString'}>固定字串</MenuItem>
                  <MenuItem value={'loopIndex'}>迴圈索引值</MenuItem>
                  <MenuItem value={'momentjs'}>時間(Moment)</MenuItem>
                  <MenuItem value={'taiwanID'}>台灣身份證字號</MenuItem>
                  <MenuItem value={'randomChar'}>隨機字串</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  label={"value" + (index + 1)}
                  variant="outlined"
                  defaultValue={item.value}
                />
              </Grid>

            </Grid>
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
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              variant="contained"
              onClick={addItem}
              size="small"
              startIcon={<AutoAwesomeIcon />}
            >
              GENERATE
            </Button>
          </Grid>

        </Grid>

        {/* 產生結果 */}
        <Grid item xs={12}>
          RESULT
        </Grid>
      </Grid>
    </div>
  );
}

export default EditPanel;
