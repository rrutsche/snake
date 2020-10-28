import { useEffect, useRef } from "react";

import { getDirectionFromKeyEvent } from "../utils/dom";

type DirectionType = "right" | "left" | "up" | "down";

export const useDirection = () => {
    const directionRef = useRef<DirectionType>("right");
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            const dir = getDirectionFromKeyEvent(event);
            if (dir) {
                console.log("direction", dir);
                directionRef.current = dir;
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return directionRef;
};
