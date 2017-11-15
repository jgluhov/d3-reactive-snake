/**
 * Snake utils
 */

import { BehaviorSubject, Observable } from 'Libraries/rxjs';
import { SNAKE_INITIAL_LENGTH, SNAKE_SPEED } from 'Root/settings';
import { direction$ } from 'Root/steering';
import { IPoint2D, ISnakeState } from 'Root/types';
import { generateSnake, moveSnake } from 'Root/utils';

const lengthHandler$: BehaviorSubject<number> = new BehaviorSubject<number>(SNAKE_INITIAL_LENGTH);

const snakeSpeed$: Observable<number> = Observable.interval(SNAKE_SPEED);

const snakeLength$: Observable<number> = lengthHandler$
  .scan((snakeLength: number, points: number) => snakeLength + points);

export const snake$: Observable<IPoint2D[]> = snakeSpeed$
  .withLatestFrom(
    snakeLength$, direction$, (_: number, snakeLength: number, direction: IPoint2D) => ({snakeLength, direction})
  )
  .scan<ISnakeState, IPoint2D[]>(moveSnake, generateSnake())
  .share()
  .startWith(generateSnake());
