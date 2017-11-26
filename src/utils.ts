/**
 * Snake utils
 */
import {randomUniform} from 'Libraries/d3';
import {scoreHandler$} from 'Root/score';
import {lengthHandler$} from 'Root/snake';
import {Point2D} from 'Root/structures';
import {
  CELL_SIZE,
  COLUMN_COUNT,
  EATEN_POINTS,
  GAP_SIZE, ROW_COUNT,
  SNAKE_INITIAL_LENGTH
} from 'Settings';
import {IAppleState, IPoint2D, ISnakeState} from 'Types';

export function moveSnake(snake: IPoint2D[], snakeState: ISnakeState): IPoint2D[] {
  const head: IPoint2D = snake.slice().pop();

  let x0: number = head.x;
  let y0: number = head.y;

  x0 += snakeState.direction.x;
  y0 += snakeState.direction.y;

  const isIncreased: boolean = snakeState.snakeLength > snake.length;

  const next: IPoint2D = isIncreased ?
    new Point2D() : snake.shift();

  next.x = x0;
  next.y = y0;

  return [...snake, next];
}

export function eatSnake(apples: IPoint2D[], appleState: IAppleState): IPoint2D[] {
  const { appleCount, snake } = appleState;
  const snakeHead: IPoint2D = snake.slice().pop();

  if (!apples.length) {
    return generateApples(appleCount, snake);
  }

  apples = apples.map((apple: IPoint2D): IPoint2D => {
    if (isCollided(snakeHead, apple)) {
      lengthHandler$.next(EATEN_POINTS);
      scoreHandler$.next(EATEN_POINTS);

      return generatePoint2D(snake);
    }

    return apple;
  });

  return apples;
}

export function adjustPoint(point: IPoint2D): IPoint2D {
  point.x = point.x >= COLUMN_COUNT ?
    0 : point.x < 0 ? COLUMN_COUNT - 1 : point.x;

  point.y = point.y >= ROW_COUNT ?
    0 : point.y < 0 ? ROW_COUNT - 1 : point.y;

  return point;
}

export function isOpposite(previous: IPoint2D, next: IPoint2D): boolean {
  return next.x === previous.x * -1 || next.y === previous.y * -1;
}

export function generateSnake(): IPoint2D[] {
  return new Array(SNAKE_INITIAL_LENGTH)
    .fill(0)
    .map((_: number, i: number) => new Point2D(i, 0));
}

export function toPosition(point: number): number {
  return point * (CELL_SIZE + GAP_SIZE);
}

export function generateApples(count: number, snake: IPoint2D[]): IPoint2D[] {
  return new Array(count)
    .fill(0)
    .map(() => generatePoint2D(snake));
}

export function generatePoint2D(snake: IPoint2D[]): IPoint2D {
  const point: IPoint2D = new Point2D(
    Math.floor(randomUniform(0, COLUMN_COUNT - 1)()),
    Math.floor(randomUniform(0, ROW_COUNT - 1)())
  );

  const collision: boolean = snake
    .some((segment: IPoint2D) => isCollided(segment, point));

  if (collision) {
    return generatePoint2D(snake);
  }

  return point;
}

export function isCollided(pointA: IPoint2D, pointB: IPoint2D): boolean {
  return pointA.x === pointB.x && pointA.y === pointB.y;
}

export function isGameOver(snake: IPoint2D[]): boolean {
  const sliced: IPoint2D[] = snake.slice();
  const head: IPoint2D = sliced.pop();

  return sliced.some(
    (point: IPoint2D) => isCollided(point, head)
  );
}

export function showKeymap(): void {
  document
    .querySelector('.keymap-container')
    .removeAttribute('style');
}
