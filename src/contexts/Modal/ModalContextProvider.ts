import { createContext, useContext } from "react";
import { Tasks } from "../../models/tasks/tasks";

type ModalContentContextType = {
  open: boolean;
  payload: Tasks | null;
  handleOpenModal: (payload?: Tasks, isReadOnly?: boolean) => void;
  handleCloseModal: () => void;
  isReadOnly: boolean;
};

const initialState: ModalContentContextType = {
  open: false,
  payload: null,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  isReadOnly: false,
};

export const ModalContext = createContext<ModalContentContextType>(initialState);

export const useModalContext = () => useContext(ModalContext);
