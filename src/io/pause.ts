/**
 * Snake pause
 */
import {escKeyCode} from 'Constants';
import {BehaviorSubject, Observable} from 'Libraries/rxjs';

export const pauseHandler$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

Observable
  .fromEvent(document, 'keydown')
  .filter((e: KeyboardEvent) => e.keyCode === escKeyCode)
  .scan((isPaused: boolean, _: KeyboardEvent) => !isPaused, false)
  .subscribe(pauseHandler$);
