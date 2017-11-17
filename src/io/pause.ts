/**
 * Snake pause
 */
import {escKeyCode} from 'Constants';
import {keydown$} from 'IO/keydown';
import {Observable} from 'Libraries/rxjs';

export const pause$: Observable<boolean> = keydown$
  .filter((e: KeyboardEvent) => e.keyCode === escKeyCode)
  .scan((isPaused: boolean, _: KeyboardEvent) => !isPaused, false);
