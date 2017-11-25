/**
 * Snake increasing
 */
import {SIGNAL_END, SIGNAL_START, SPACE_KEY} from 'Constants';
import {Observable, Timestamp} from 'Libraries/rxjs';

const keyUps$: Observable<KeyboardEvent> = Observable
  .fromEvent(document, 'keyup');

const keyDowns$: Observable<KeyboardEvent> = Observable
  .fromEvent(document, 'keydown');

const spaceKeyUps$: Observable<KeyboardEvent> = keyUps$
  .filter((e: KeyboardEvent) => e.keyCode === SPACE_KEY);

const spaceKeyDowns$: Observable<KeyboardEvent> = keyDowns$
  .filter((e: KeyboardEvent) => e.keyCode === SPACE_KEY);

const signalStartsRaw$: Observable<number> = spaceKeyDowns$.mapTo(SIGNAL_START);
const signalEndsRaw$: Observable<number> = spaceKeyUps$.mapTo(SIGNAL_END);

const signalStartsEnds$: Observable<number> = Observable
  .merge(signalStartsRaw$, signalEndsRaw$)
  .distinctUntilChanged();

export const increaseStarts$: Observable<Timestamp<number>> = signalStartsEnds$
  .filter((signal: number) => signal === SIGNAL_START)
  .timestamp();

export const increaseEnds$: Observable<Timestamp<number>> = signalStartsEnds$
  .filter((signal: number) => signal === SIGNAL_END)
  .timestamp();
