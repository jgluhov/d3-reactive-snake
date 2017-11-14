import { BehaviorSubject } from './lib/rxjs';
import { snakeLength } from './settings';

const length$ = new BehaviorSubject<number>(snakeLength);

export const snakeLength$ = length$
  .scan((snakeLength, points) => {
    return snakeLength + points;
  });
