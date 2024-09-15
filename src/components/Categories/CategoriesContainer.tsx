import { useDroppable } from "@dnd-kit/core";
import { CategoriesContainerCustom } from "./CategoriesContainerCustom.styled";

type CategoriesContainerProps = {
  category: string;
  children: React.ReactNode;
};

const CategoriesContainer = ({ category, children }: CategoriesContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  return (
    <CategoriesContainerCustom ref={setNodeRef}>{children}</CategoriesContainerCustom>
  );
};

export default CategoriesContainer;
