import { Paper, Typography, Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

const MyMessage = ({ username, content, readAt }) => {
  return (
    <Stack>
      <Box
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
      </Box>
      {readAt && (
        <Typography
          variant="caption"
          color="gray"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "8px",
          }}
        >
          Read {dayjs(readAt).calendar()}
        </Typography>
      )}
    </Stack>
  );
};

export default MyMessage;
