import { useRef, useEffect } from "react";

export type DrawFunctionType = (
    ctx: CanvasRenderingContext2D,
    frameCount: number
) => void;

export interface CanvasOptions {
    context?: string;
}

export const useCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext("2d");
    }, []);

    return {
        canvasRef,
        contextRef,
    };
};
