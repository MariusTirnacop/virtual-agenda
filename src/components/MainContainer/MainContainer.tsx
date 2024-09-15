import { PropsWithChildren } from "react";
import { StyledMainContainer } from "./MainContainer.styles";

const MainContainer = ({ children }: PropsWithChildren) => {
  return <StyledMainContainer>{children}</StyledMainContainer>;
};

export default MainContainer;
