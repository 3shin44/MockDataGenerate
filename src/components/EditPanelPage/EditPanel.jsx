import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
function EditPanel() {
  // 基礎資料
  const [stateData, setStateData] = useState({
    dataTemplate: [
      { keyName: "key1", value: "123" },
      { keyName: "key2", value: "456" },
    ],
  });

  // 新增項目
  const addItem = () => {
    let newItem = {
      keyName: "",
      value: "",
    };
    setStateData((prevState) => ({
      ...prevState,
      dataTemplate: [...prevState.dataTemplate, newItem],
    }));
  };

  return (
    <>
      {/* 渲染TEMPLATE列表 */}
      <Grid container spacing={1} direction="column" alignItems="flex-start">
        {stateData.dataTemplate.map((item, index) => (
          <Grid item xs={6} key={index}>
            <TextField size="small" label="Outlined" variant="outlined" />
          </Grid>
        ))}
      </Grid>

      {/* 控制按鈕: 新增 */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
          <Button
            variant="contained"
            onClick={addItem}
            size="small"
            endIcon={<SendIcon />}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default EditPanel;
