/**
 * Snake utils
 */
import {pauseHandler$} from 'IO/pause';
import {BehaviorSubject, Observable} from 'Libraries/rxjs';
import {direction$} from 'Root/io/direction';
import {SNAKE_INITIAL_LENGTH, SNAKE_SPEED} from 'Settings';
import {IPoint2D, ISnakeState} from 'Types';
import {adjustPoint, generateSnake, moveSnake} from 'Utils';

export const lengthHandler$: BehaviorSubject<number> = new BehaviorSubject<number>(SNAKE_INITIAL_LENGTH);

const snakeSpeed$: Observable<number> = Observable
  .interval(SNAKE_SPEED);

const snakeLength$: Observable<number> = lengthHandler$
  .scan((length: number, eaten: number) => {
    return length + eaten;
  });

export const snake$: Observable<IPoint2D[]> = pauseHandler$
  .switchMap((isPaused: boolean) => {
    return isPaused ? Observable.never() : snakeSpeed$;
  })
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
