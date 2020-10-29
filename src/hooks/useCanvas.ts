import { useRef, useEffect } from "react";

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext("2d");
    }, []);

    return {
        canvasRef,
        contextRef,
    };
};
