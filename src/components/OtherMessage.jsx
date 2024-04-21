import { Paper, Typography } from "@mui/material";

const OtherMessage = ({ username, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "8px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "70%",
          padding: "8px 12px",
          backgroundColor: "#ffffff",
          marginLeft: "8px",
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ textAlign: "left", marginBottom: "4px" }}
        >
          {username}
        </Typography>
        <Typography variant="body1" style={{ textAlign: "left" }}>
          {content}
        </Typography>
      </Paper>
    </div>
  );
};

export default OtherMessage;
