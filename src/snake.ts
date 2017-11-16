/**
 * Snake utils
 */

import {BehaviorSubject, Observable} from 'Libraries/rxjs';
import {EATEN_POINTS, SNAKE_INITIAL_LENGTH, SNAKE_SPEED} from 'Root/settings';
import {direction$} from 'Root/steering';
import {IPoint2D, ISnakeState} from 'Root/types';
import {adjustPoint, generateSnake, moveSnake} from 'Root/utils';

const lengthHandler$: BehaviorSubject<number> = new BehaviorSubject<number>(SNAKE_INITIAL_LENGTH);

const snakeSpeed$: Observable<number> = Observable.interval(SNAKE_SPEED);

const snakeLength$: Observable<number> = lengthHandler$
  .scan((length: number, eaten: number) => {
    return length + eaten;
  });

export const snake$: Observable<IPoint2D[]> = snakeSpeed$
  .withLatestFrom(
    snakeLength$, direction$, (
      _: number,
      snakeLength: number,
      direction: IPoint2D
    ) => ({snakeLength, direction})
  )
  .scan<ISnakeState, IPoint2D[]>(moveSnake, generateSnake())
  .switchMap((snake: IPoint2D[]) => {
    return Observable
      .from(snake)
      .map(adjustPoint)
      .toArray();
  })
  .startWith(generateSnake())
  .share();
