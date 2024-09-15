import { Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useModalContext } from "../../contexts/Modal/ModalContextProvider";
import Filters from "../Filters/Filters";
import { SidebarContainer } from "./SidebarContainer.styles";
import { SidebarIconsContainer } from "./SidebarIconsContainer.styles";
import { AddTaskButton } from "./AddTaskButton";

const Sidebar = () => {
  const { handleOpenModal } = useModalContext();
  return (
    <SidebarContainer>
      <Filters />
      <Box sx={{ flexGrow: "1" }} />
      <SidebarIconsContainer onClick={() => handleOpenModal()}>
        <AddTaskButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Add Task
        </AddTaskButton>
      </SidebarIconsContainer>
    </SidebarContainer>
  );
};
export default Sidebar;
