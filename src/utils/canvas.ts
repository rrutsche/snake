interface CanvasOptions {
    width: number;
    height: number;
}

export interface PositionType {
    x: number;
    y: number;
}
const SEGMENT_SIZE = 10;
const BOARD_BACKGROUND_COLOR = "white";
const BOARD_BORDER_COLOR = "black";
const SNAKE_COLOR = "lightblue";
const SNAKE_BORDER_COLOR = "darkblue";
export type DirectionType = "right" | "left" | "up" | "down";
const DIRECTION_FACTORS = {
    right: 1,
    left: -1,
    up: -1,
    down: 1,
};

export const clearCanvas = (
    ctx: CanvasRenderingContext2D,
    options: CanvasOptions
) => {
    ctx.fillStyle = BOARD_BACKGROUND_COLOR;
    ctx.strokeStyle = BOARD_BORDER_COLOR;
    ctx.fillRect(0, 0, options.width, options.height);
    ctx.strokeRect(0, 0, options.width, options.height);
};

export const drawSnakePart = (
    ctx: CanvasRenderingContext2D,
    snakePart: PositionType
) => {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, SEGMENT_SIZE, SEGMENT_SIZE);
    // Draw a border around the snake part
    ctx.strokeRect(snakePart.x, snakePart.y, SEGMENT_SIZE, SEGMENT_SIZE);
};

export const drawSnake = (
    ctx: CanvasRenderingContext2D,
    snake: PositionType[]
) => {
    snake.forEach((part) => drawSnakePart(ctx, part));
};

export const getIsOutOfBounds = (
    position: PositionType,
    options: CanvasOptions
) => {
    return (
        position.x > options.width - SEGMENT_SIZE ||
        position.x < 0 ||
        position.y > options.height - SEGMENT_SIZE ||
        position.y < 0
    );
};

export const getNextSnakePosition = (
    snake: PositionType[],
    direction: DirectionType
): PositionType => {
    const position = snake[snake.length - 1];
    const isHorizontal = direction === "right" || direction === "left";
    const x = isHorizontal
        ? position.x + SEGMENT_SIZE * DIRECTION_FACTORS[direction]
        : position.x;
    const y = !isHorizontal
        ? position.y + SEGMENT_SIZE * DIRECTION_FACTORS[direction]
        : position.y;

    return { x, y };
};
