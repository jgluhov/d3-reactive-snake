/**
 * Snake utils
 */
import {
  CELL_SIZE,
  COLUMN_COUNT,
  GAP_SIZE, ROW_COUNT,
  SNAKE_INITIAL_LENGTH
} from 'Root/settings';
import {
  IPoint2D,
  ISnakeState
} from 'Root/types';

export function moveSnake(snake: IPoint2D[], snakeState: ISnakeState): IPoint2D[] {
  const head: IPoint2D = snake.slice().pop();
  const next: IPoint2D = snake.shift();

  let x0: number = head.x;
  let y0: number = head.y;

  x0 += snakeState.direction.x;
  y0 += snakeState.direction.y;

  next.x = x0;
  next.y = y0;

  return [...snake, next];
}

export function adjustPoint(point: IPoint2D): IPoint2D {
  point.x = point.x >= COLUMN_COUNT ? 0 : point.x < 0 ? COLUMN_COUNT - 1 : point.x;
  point.y = point.y >= ROW_COUNT ? 0 : point.y < 0 ? ROW_COUNT - 1 : point.y;

  console.log(point);

  return point;
}

export function isOpposite(previous: IPoint2D, next: IPoint2D): boolean {
  return next.x === previous.x * -1 || next.y === previous.y * -1;
}

export function generateSnake(): IPoint2D[] {
  return new Array(SNAKE_INITIAL_LENGTH)
    .fill(0)
    .map((_: number, i: number) => ({x: i, y: 0}));
}

export function toPosition(point: number): number {
  return point * (CELL_SIZE + GAP_SIZE);
}
