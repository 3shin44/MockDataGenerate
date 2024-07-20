// REACT
import React, { useState } from "react";

// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// JS
import moduleCfg from "./moduleCfg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function InfoDialog() {
  // 基礎資料
  const [stateData, setStateData] = useState({
    open: false,
    moduleCfg: moduleCfg,
  });

  const handleClickOpen = () => {
    setStateData((prevState) => ({
      ...prevState,
      open: true,
    }));
  };

  const handleClose = () => {
    setStateData((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        說明
      </Button>
      <Dialog
        open={stateData.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>資料產生模組說明</DialogTitle>
        <DialogContent>
          {stateData.moduleCfg.map((item, index) => (
            <Box
              key={index}
              component="section"
              sx={{ p: 2, mb: 1, border: "1px dashed grey" }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                {item.displayName}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>關閉</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
