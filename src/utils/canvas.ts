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
export const DIRECTIONS = {
    RIGHT: { x: SEGMENT_SIZE, y: 0 },
    LEFT: { x: -SEGMENT_SIZE, y: 0 },
    UP: { x: 0, y: -SEGMENT_SIZE },
    DOWN: { x: 0, y: SEGMENT_SIZE },
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
    direction: PositionType
): PositionType => {
    const position = snake[snake.length - 1];
    const x = position.x + direction.x;
    const y = position.y + direction.y;
    return { x, y };
};
