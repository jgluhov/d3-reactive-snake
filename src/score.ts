/**
 * Snake score
 */
import {BehaviorSubject, Observable} from 'Libraries/rxjs';

export const scoreHandler$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

export const score$: Observable<number> = scoreHandler$
  .scan((total: number, points: number) => total + points)
  .share();
