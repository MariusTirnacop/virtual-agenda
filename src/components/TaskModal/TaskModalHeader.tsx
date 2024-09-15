import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Tasks } from "../../models/tasks/tasks";

type TaskModalHeaderProps = {
  handleCloseModal: () => void;
  payload: Tasks | null;
  isReadOnly: boolean;
};

export const TaskModalHeader = ({
  handleCloseModal,
  payload,
  isReadOnly,
}: TaskModalHeaderProps) => {
  const getTitle = () => {
    if (isReadOnly) {
      return "View Task";
    }
    if (payload) {
      return "Edit Task";
    }
    return "Create new task";
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6" component="h2">
        {getTitle()}
      </Typography>
      <IconButton onClick={handleCloseModal} aria-label="close modal">
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
