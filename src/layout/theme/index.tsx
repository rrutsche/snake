import React, { ReactNode, FC } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }
`;

interface LayoutProps {
    children: ReactNode;
}

export const Theme: FC<LayoutProps> = ({ children }) => {
    return (
        <React.Fragment>
            <GlobalStyle />
            {children}
        </React.Fragment>
    );
};
