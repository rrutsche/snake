import React, { FC, CanvasHTMLAttributes } from "react";
import styled from "styled-components";
import { DrawFunctionType, CanvasOptions, useCanvas } from "../hooks/useCanvas";

type CanvasProps = {
    draw: DrawFunctionType;
    options?: CanvasOptions;
} & CanvasHTMLAttributes<HTMLCanvasElement>;

const CanvasLayout = styled.canvas`
    border: 1px solid purple;
`;

export const Canvas: FC<CanvasProps> = (props) => {
    const { draw, options, ...rest } = props;
    const canvasRef = useCanvas(draw, options);
    return <CanvasLayout width={800} height={500} ref={canvasRef} {...rest} />;
};
