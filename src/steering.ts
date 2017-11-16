/**
 * Snake Steering
 */
import {Observable} from 'Libraries/rxjs';
import {keyCodes} from 'Root/constants';
import {IDirections, IPoint2D} from 'Root/types';
import {isOpposite} from 'Root/utils';

const directions: IDirections = {
  [keyCodes.arrowUp]: {x: 0, y: -1},
  [keyCodes.arrowRight]: {x: 1, y: 0},
  [keyCodes.arrowDown]: {x: 0, y: 1},
  [keyCodes.arrowLeft]: {x: -1, y: 0}
};

const initialDirection: IPoint2D = directions[keyCodes.arrowRight];

const keydown$: Observable<KeyboardEvent> = Observable
  .fromEvent(document, 'keydown');

export const direction$: Observable<IPoint2D> = keydown$
  .map((event: KeyboardEvent) => directions[event.keyCode])
  .filter((direction: IPoint2D) => !!direction)
  .scan((previous: IPoint2D, next: IPoint2D) => {
    return isOpposite(previous, next) ? previous : next;
  })
  .startWith(initialDirection)
  .distinctUntilChanged();
