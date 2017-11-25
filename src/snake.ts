/**
 * Snake utils
 */
import {increaseEnds$, increaseStarts$} from 'IO/increasing';
import {pauseHandler$} from 'IO/pause';
import {BehaviorSubject, Observable, Timestamp} from 'Libraries/rxjs';
import {direction$} from 'Root/io/direction';
import {SNAKE_DEFAULT_SPEED, SNAKE_INITIAL_LENGTH, SNAKE_NITRO_SPEED} from 'Settings';
import {IPoint2D, ISnakeState} from 'Types';
import {adjustPoint, generateSnake, moveSnake} from 'Utils';

export const lengthHandler$: BehaviorSubject<number> = new BehaviorSubject<number>(SNAKE_INITIAL_LENGTH);
const speedHandler$: BehaviorSubject<number> = new BehaviorSubject<number>(SNAKE_DEFAULT_SPEED);

const snakeLength$: Observable<number> = lengthHandler$
  .scan((length: number, eaten: number) => {
    return length + eaten;
  });

increaseStarts$
  .mapTo(SNAKE_NITRO_SPEED)
  .subscribe(speedHandler$);

increaseEnds$
  .mapTo(SNAKE_DEFAULT_SPEED)
  .subscribe(speedHandler$);

const snakeSpeed$: Observable<number> = speedHandler$
  .withLatestFrom(pauseHandler$)
  .switchMap(([snakeSpeed, isPaused]) => {
    return isPaused ?
      Observable.never() : Observable.interval(snakeSpeed);
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
