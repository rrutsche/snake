type DirectionType = "right" | "left" | "up" | "down";

export const getDirectionFromKeyEvent = (
    event: KeyboardEvent
): DirectionType | void => {
    switch (event.code) {
        case "ArrowRight":
            return "right";
        case "ArrowLeft":
            return "left";
        case "ArrowUp":
            return "up";
        case "ArrowDown":
            return "down";
    }
};
