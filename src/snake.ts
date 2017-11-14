import {
  Observable,
  BehaviorSubject,
} from './lib/rxjs';
import {
  SNAKE_INITIAL_LENGTH,
  SNAKE_SPEED,
} from './settings';
import { direction$, Point2D } from './steering';
import {
  generateSnake,
  moveSnake,
} from './utils';

const lengthHandler$ = new BehaviorSubject<number>(SNAKE_INITIAL_LENGTH);

const snakeSpeed$ = Observable.interval(SNAKE_SPEED);

const snakeLength$: Observable<number> = lengthHandler$
  .scan((snakeLength, points) => snakeLength + points);

export const snake$: Observable<Point2D[]> = snakeSpeed$
  .withLatestFrom(
    snakeLength$, direction$, (_, snakeLength, direction) => [snakeLength, direction],
  )
  .scan(moveSnake, generateSnake());
