import React, { useCallback, useRef, useState } from "react";

import { useCanvas } from "../../hooks/useCanvas";
import { useDirectionRef } from "../../hooks/useDirectionRef";
import { useGameLoop } from "../../hooks/useGameLoop";

import {
    drawSnake,
    clearCanvas,
    getHasGameEnded,
    getNextSnakeHeadPosition,
    PositionType,
    getFoodWasEaten,
    generateFood,
    drawFood,
} from "../../utils/snake";
import { CanvasLayout, GameOverContainer, SnakeContainer } from "./styled";

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
    const [food, setFood] = useState<PositionType>(null);

    const drawSnakeBody = useCallback(() => {
        const canvas = canvasRef.current;
        const snakeBody = snakeBodyRef.current;
        const direction = directionRef.current;
        const snakeHead = getNextSnakeHeadPosition(snakeBody, direction);
        snakeBody.push(snakeHead);

        const foodWasEaten = getFoodWasEaten(snakeBody, food);

        if (!food || foodWasEaten) {
            setFood(generateFood(canvas));
        } else {
            snakeBody.shift();
        }

        if (getHasGameEnded(snakeBody, canvas)) {
            setGameOver(true);
        }

        const ctx = contextRef.current;
        clearCanvas(ctx, canvas);
        drawSnake(ctx, snakeBody);
        drawFood(contextRef.current, food);
    }, [contextRef, directionRef, canvasRef, food]);

    useGameLoop(drawSnakeBody, gameOver);

    return (
        <SnakeContainer>
            {gameOver ? (
                <GameOverContainer>
                    <h2>Game Over</h2>
                </GameOverContainer>
            ) : undefined}
            <CanvasLayout
                width={AREA_SIZE}
                height={AREA_SIZE}
                ref={canvasRef}
            />
        </SnakeContainer>
    );
};
