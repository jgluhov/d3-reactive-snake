/**
 * Apples for snake
 */
import {BehaviorSubject, Observable} from 'Libraries/rxjs';
import {snake$} from 'Root/snake';
import {APPLE_COUNT} from 'Settings';
import {IAppleState, IPoint2D} from 'Types';
import {eatSnake, generateApples} from 'Utils';

const applesHandler$: BehaviorSubject<number> = new BehaviorSubject(APPLE_COUNT);

export const apples$: Observable<IPoint2D[]> = Observable.combineLatest(applesHandler$, snake$, (
    appleCount: number,
    snake: IPoint2D[]
  ) => ({appleCount, snake}))
  .scan<IAppleState, IPoint2D[]>(eatSnake, generateApples(APPLE_COUNT));
