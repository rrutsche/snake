import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCanvas } from "../../hooks/useCanvas";
import { useDirectionRef } from "../../hooks/useDirectionRef";
import { useGameLoop } from "../../hooks/useGameLoop";

import {
    drawSnake,
    clearCanvas,
    getHasGameEnded,
    getNextSnakePosition,
    PositionType,
} from "../../utils/canvas";

const CanvasLayout = styled.canvas`
    border: 1px solid black;
`;

const AREA_SIZE = 400;

const snake: PositionType[] = [
    { x: 110, y: 200 },
    { x: 120, y: 200 },
    { x: 130, y: 200 },
    { x: 140, y: 200 },
    { x: 150, y: 200 },
    { x: 160, y: 200 },
    { x: 170, y: 200 },
    { x: 180, y: 200 },
    { x: 190, y: 200 },
    { x: 200, y: 200 },
];
// https://thoughtbot.com/blog/html5-canvas-snake-game
// https://www.educative.io/blog/javascript-snake-game-tutorial

export const Snake = () => {
    const [gameOver, setGameOver] = useState(false);
    const snakeBodyRef = useRef<PositionType[]>(snake);
    const { canvasRef, contextRef } = useCanvas();
    const directionRef = useDirectionRef();

    // const makeFoodItem = useCallback(
    //     (snakePosition: PositionType) => {
    //         const { width, height } = canvasRef.current;
    //         const snakeBody = snakeBodyRef.current;
    //         const ctx = contextRef.current;
    //         const suggestedPoint: PositionType = {
    //             x: Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE,
    //             y: Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE,
    //         };
    //         const isOccupiedBySnake = snakeBody.find((item) => {
    //             return (
    //                 item.x === suggestedPoint.x && item.y === suggestedPoint.y
    //             );
    //         });
    //         if (isOccupiedBySnake) {
    //             makeFoodItem(snakePosition);
    //         } else {
    //             ctx.fillStyle = "rgb(10,100,0)";
    //             ctx.fillRect(
    //                 suggestedPoint.x,
    //                 suggestedPoint.y,
    //                 GRID_SIZE,
    //                 GRID_SIZE
    //             );
    //         }
    //     },
    //     [canvasRef, contextRef]
    // );

    const drawSnakeBody = useCallback(() => {
        const canvas = canvasRef.current;
        const snakeBody = snakeBodyRef.current;
        const direction = directionRef.current;
        const nextPosition = getNextSnakePosition(snakeBody, direction);
        snakeBody.push(nextPosition);
        if (snakeBody.length > 3) {
            snakeBody.shift();
        }

        if (getHasGameEnded(snakeBody, canvas)) {
            setGameOver(true);
        }

        const ctx = contextRef.current;
        clearCanvas(ctx, canvas);
        drawSnake(ctx, snakeBody);

        // makeFoodItem(position);

        // if (position.x == suggestedPoint[0] &amp;&amp; currentPosition['y'] == suggestedPoint[1])
    }, [contextRef, directionRef, canvasRef]);

    useGameLoop(drawSnakeBody, gameOver);

    return gameOver ? (
        <h1>Game Over</h1>
    ) : (
        <CanvasLayout width={AREA_SIZE} height={AREA_SIZE} ref={canvasRef} />
    );
};
