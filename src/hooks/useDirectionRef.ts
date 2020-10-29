import { useEffect, useRef } from "react";
import { DIRECTIONS, PositionType } from "../utils/canvas";

import { getDirectionFromKeyEvent } from "../utils/dom";

export const useDirectionRef = () => {
    const directionRef = useRef<PositionType>(DIRECTIONS.RIGHT);
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

    return directionRef;
};
