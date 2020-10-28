import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { useCanvas } from "../../hooks/useCanvas";

import { getDirectionFromKeyEvent } from "../../utils/dom";

const CanvasLayout = styled.canvas`
    border: 1px solid purple;
`;

type DirectionType = "right" | "left" | "up" | "down";

interface PositionType {
    x: number;
    y: number;
}

const GRID_SIZE = 10;
const START_POSITION: PositionType = {
    x: 50,
    y: 50,
};
const DIRECTION_FACTORS = {
    right: 1,
    left: -1,
    up: -1,
    down: 1,
};
// https://thoughtbot.com/blog/html5-canvas-snake-game

export const Snake = () => {
    // const [direction, setDirection] = useState<DirectionType>("right");
    const directionRef = useRef<DirectionType>("right");
    const positionRef = useRef<PositionType>(START_POSITION);
    const { canvasRef, contextRef } = useCanvas();

    const render = useCallback(() => {
        const direction = directionRef.current;
        const canvas = canvasRef.current;
        const position = positionRef.current;
        const isHorizontal = direction === "right" || direction === "left";
        const x = isHorizontal
            ? position.x + GRID_SIZE * DIRECTION_FACTORS[direction]
            : position.x;
        const y = !isHorizontal
            ? position.y + GRID_SIZE * DIRECTION_FACTORS[direction]
            : position.y;

        positionRef.current = { x, y };
        const outOfBounds =
            x > canvas.width - GRID_SIZE ||
            x < 0 ||
            y > canvas.height - GRID_SIZE ||
            y < 0;
        if (outOfBounds) {
            console.log("You lost: OUT OF BOUNDS");
        }

        const ctx = contextRef.current;
        if (ctx) {
            // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "rgb(200,0,0)";
            // const x = 50 * (frameCount * 0.01);
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
        }
    }, [contextRef, directionRef, positionRef, canvasRef]);

    useEffect(() => {
        const intervalId = setInterval(render, 100);
        return () => {
            clearInterval(intervalId);
        };
    }, [render]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const dir = getDirectionFromKeyEvent(event);
            if (dir) {
                directionRef.current = dir;
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return <CanvasLayout width={800} height={500} ref={canvasRef} />;
};
