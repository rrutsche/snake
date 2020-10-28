import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { useCanvas } from "../../hooks/useCanvas";
import { useDirection } from "../../hooks/useDirection";
import { useGameLoop } from "../../hooks/useGameLoop";

const CanvasLayout = styled.canvas`
    border: 1px solid purple;
`;

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
    const [gameOver, setGameOver] = useState(false);
    const positionRef = useRef<PositionType>(START_POSITION);
    const snakeBodyRef = useRef<PositionType[]>([START_POSITION]);
    const { canvasRef, contextRef } = useCanvas();
    const directionRef = useDirection();

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        const snakeBody = snakeBodyRef.current;
        const position = snakeBody[snakeBody.length - 1];
        const direction = directionRef.current;
        const isHorizontal = direction === "right" || direction === "left";
        const x = isHorizontal
            ? position.x + GRID_SIZE * DIRECTION_FACTORS[direction]
            : position.x;
        const y = !isHorizontal
            ? position.y + GRID_SIZE * DIRECTION_FACTORS[direction]
            : position.y;

        snakeBody.push({ x, y });
        positionRef.current = { x, y };
        const outOfBounds =
            x > canvas.width - GRID_SIZE ||
            x < 0 ||
            y > canvas.height - GRID_SIZE ||
            y < 0;

        if (outOfBounds) {
            setGameOver(true);
        }

        const ctx = contextRef.current;
        if (ctx) {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
            if (snakeBody.length > 3) {
                const itemToRemove = snakeBody.shift();
                ctx.clearRect(
                    itemToRemove.x,
                    itemToRemove.y,
                    GRID_SIZE,
                    GRID_SIZE
                );
            }
        }
    }, [contextRef, directionRef, positionRef, canvasRef]);

    useGameLoop(render, gameOver);

    return gameOver ? (
        <h1>Game Over</h1>
    ) : (
        <CanvasLayout width={800} height={500} ref={canvasRef} />
    );
};
