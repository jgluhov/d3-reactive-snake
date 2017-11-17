/**
 * Snake pause
 */
import {escKeyCode} from 'Constants';
import {keydown$} from 'IO/keydown';
import {BehaviorSubject, Observable} from 'Libraries/rxjs';

export const pauseHandler$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

keydown$
  .filter((e: KeyboardEvent) => e.keyCode === escKeyCode)
  .scan((isPaused: boolean, _: KeyboardEvent) => !isPaused, false)
  .subscribe(pauseHandler$);
