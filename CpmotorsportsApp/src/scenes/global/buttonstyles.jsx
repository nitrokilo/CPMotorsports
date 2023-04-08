import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function MyButton(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
      }}
      onClick={props.onClick}
      color="secondary"
    >
      {props.text}
    </Button>
  );
}
