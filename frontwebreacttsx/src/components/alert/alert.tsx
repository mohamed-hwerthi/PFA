import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { AlertPropsType } from "./Alertutils";

export default function SuccessAlert({
  ShowAlert,
  setShowAlert,
  alertName,
}: AlertPropsType) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: "20%", transform: "translateX(350px)" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon
                fontSize="inherit"
                onClick={() => {
                  setShowAlert(!ShowAlert);
                }}
              />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertName}
        </Alert>
      </Collapse>
    </Box>
  );
}
