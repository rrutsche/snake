import styled from "styled-components";

export const CanvasLayout = styled.canvas`
    border: 1px solid black;
`;

export const SnakeContainer = styled.div`
    position: relative;
`;

export const GameOverContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
