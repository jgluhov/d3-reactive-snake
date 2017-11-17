/**
 * Snake keydown
 */
import {Observable} from 'Libraries/rxjs';

export const keydown$: Observable<KeyboardEvent> = Observable
  .fromEvent(document, 'keydown');
