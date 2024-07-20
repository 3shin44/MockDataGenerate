// REACT
import React from "react";
// MUI
import { Typography, Box } from "@mui/material";
// COMPONENT
import EditPanel from "../components/EditPanelPage/EditPanel";

function EditPanelPage() {
  // 更新TITLE
  document.title = "Mock Data Generator";
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 4, fontWeight: "bold" }}
        gutterBottom
      >
        模擬資料產生器
      </Typography>
      <EditPanel />
    </Box>
  );
}

export default EditPanelPage;
