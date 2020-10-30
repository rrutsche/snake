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

export const getHasGameEnded = (
    snake: PositionType[],
    options: CanvasOptions
) => {
    const snakeHead = snake[snake.length - 1];
    const snakeHitItself = snake.find(
        (segment, index) =>
            index !== snake.length - 1 &&
            segment.x === snakeHead.x &&
            segment.y === snakeHead.y
    );
    return (
        snakeHitItself ||
        snakeHead.x > options.width - SEGMENT_SIZE ||
        snakeHead.x < 0 ||
        snakeHead.y > options.height - SEGMENT_SIZE ||
        snakeHead.y < 0
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
