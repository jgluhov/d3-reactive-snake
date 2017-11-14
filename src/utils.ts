import { Point2D } from './steering';
import { SNAKE_INITIAL_LENGTH } from './settings';

export function moveSnake(snake: Point2D[], [snakeLength, direction]): Point2D[] {
  // console.log(snake, snakeLength, direction);

  return snake;
}

export function isOpposite(previous: Point2D, next: Point2D): boolean {
  return next.x === previous.x * -1 || next.y === previous.y * -1;
}

export function generateSnake(): Point2D[] {
  /* tslint:disable */
  return new Array(SNAKE_INITIAL_LENGTH)
    .fill(0)
    .map((_, i: number) => ({ x: i, y: 0 }));
}
