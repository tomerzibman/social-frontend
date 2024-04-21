import { Paper, Typography } from "@mui/material";

const MyMessage = ({ username, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "8px",
      }}
    >
      <Paper
        elevation={3}
        square={false}
        sx={{
          maxWidth: "70%",
          padding: "8px 12px",
          backgroundColor: "#2196f3",
          marginRight: "8px",
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ textAlign: "right", marginBottom: "4px", color: "white" }}
        >
          {username}
        </Typography>
        <Typography
          variant="body1"
          style={{ textAlign: "right", color: "white" }}
        >
          {content}
        </Typography>
      </Paper>
    </div>
  );
};

export default MyMessage;
