import { useEffect, useRef } from "react";

export const useGameLoop = (loopFn: () => void, gameOver: boolean) => {
    const gameLoop = useRef<number>(null);
    useEffect(() => {
        gameLoop.current = setInterval(loopFn, 100);
        return () => {
            clearInterval(gameLoop.current);
        };
    }, [loopFn]);

    useEffect(() => {
        if (gameOver) {
            clearInterval(gameLoop.current);
        }
    }, [gameOver]);
};

export default useGameLoop;
