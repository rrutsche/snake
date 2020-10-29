import { PositionType, DIRECTIONS } from "./canvas";

export const getDirectionFromKeyEvent = (
    event: KeyboardEvent
): PositionType | void => {
    switch (event.code) {
        case "ArrowRight":
            return DIRECTIONS.RIGHT;
        case "ArrowLeft":
            return DIRECTIONS.LEFT;
        case "ArrowUp":
            return DIRECTIONS.UP;
        case "ArrowDown":
            return DIRECTIONS.DOWN;
    }
};
