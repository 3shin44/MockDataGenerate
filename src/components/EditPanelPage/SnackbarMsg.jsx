// REACT
import React, { useEffect, useState } from "react";

// MUI
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackbarMsg({ propSnackMsg }) {
  // 基礎資料
  const [state, setState] = useState({
    open: false,
    severity: "",
    message: "",
  });

  // PROP下來的顯示資訊
  useEffect(() => {
    if (propSnackMsg) {
      const { severity, message } = propSnackMsg;
      setState({ ...state, open: true, severity, message });
    }
  }, [propSnackMsg]);

  // 關閉
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
