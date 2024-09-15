import { PropsWithChildren, ReactElement, useMemo, useState } from "react";
import { ModalContext } from "./ModalContextProvider";
import { Tasks } from "../../models/tasks/tasks";

const ModalContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<null | Tasks>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleOpenModal = (payload?: Tasks, isReadOnly?: boolean) => {
    setOpen(true);

    if (!payload) return;
    setPayload(payload);
    setIsReadOnly(isReadOnly ?? false);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPayload(null);
    setIsReadOnly(false);
  };

  const value = useMemo(
    () => ({ open, payload, handleOpenModal, isReadOnly, handleCloseModal }),
    [open, payload, isReadOnly]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export default ModalContextProvider;
