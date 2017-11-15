/**
 * Snake utils
 */
import {
  CELL_SIZE,
  GAP_SIZE,
  SNAKE_INITIAL_LENGTH
} from 'Root/settings';
import {
  IPoint2D,
  IPosition,
  ISnakeState
} from 'Root/types';

export function moveSnake(snake: IPoint2D[], snakeState: ISnakeState): IPoint2D[] {
  return snake;
}

export function isOpposite(previous: IPoint2D, next: IPoint2D): boolean {
  return next.x === previous.x * -1 || next.y === previous.y * -1;
}

export function generateSnake(): IPoint2D[] {
  return new Array(SNAKE_INITIAL_LENGTH)
    .fill(0)
    .map((_: number, i: number) => ({ x: i, y: 0 }));
}

export function toPosition(point: number): number {
  return point * (CELL_SIZE + GAP_SIZE);
}
