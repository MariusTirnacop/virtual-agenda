import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { TaskPriorityEnum, Tasks } from "../../models/tasks/tasks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTasksContext } from "../../contexts/Tasks/TasksProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useModalContext } from "../../contexts/Modal/ModalContextProvider";
import { useDraggable } from "@dnd-kit/core";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const TaskCard = ({ task }: { task: Tasks }) => {
  const { deleteTask } = useTasksContext();
  const { handleOpenModal } = useModalContext();
  const handlePriorityColor = (priority: TaskPriorityEnum) => {
    switch (priority) {
      case TaskPriorityEnum.LOW:
        return "green";
      case TaskPriorityEnum.MEDIUM:
        return "orange";
      case TaskPriorityEnum.HIGH:
        return "red";
      default:
        return "green";
    }
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} sx={{ my: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Box
          {...attributes}
          {...listeners}
          sx={{
            cursor: "grab",
            display: "flex",
            alignItems: "center",

            width: "30px",
          }}
        >
          <DragIndicatorIcon />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "row",
            }}
          >
            <Box>
              <Typography variant="h6">{task.title}</Typography>
              <Typography
                variant="body2"
                sx={{
                  bgcolor: handlePriorityColor(task.priority),
                  color: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: "medium",
                  mb: 1,
                  width: "fit-content",
                }}
              >
                {task.priority}
              </Typography>
              <Typography variant="body2">
                {task.description.length > 20
                  ? `${task.description.slice(0, 20)}...`
                  : task.description}
              </Typography>
              <Typography variant="body2">
                Date: {task.startDate.format("DD/MM/YYYY")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <IconButton
                onClick={() => {
                  handleOpenModal(task, true);
                }}
                size="small"
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleOpenModal(task, false);
                }}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteTask(task.id)} size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
