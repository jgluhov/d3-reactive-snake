/**
 * Snake main
 */
import { Observable } from 'Libraries/rxjs';
import {
  COLUMN_COUNT,
  ROW_COUNT
} from 'Root/settings';
import { snake$ } from 'Root/snake';
import { IPoint2D } from 'Root/steering';
import 'Root/styles';
import {
  renderBackground,
  renderSnake
} from 'Root/svg';

interface IScene {
  snake: IPoint2D[];
}

renderBackground(ROW_COUNT, COLUMN_COUNT);

snake$.subscribe((snake: IPoint2D[]) => {
  renderSnake(snake);
});

const scene$: Observable<IScene> = Observable
  .combineLatest(snake$, (snake: IPoint2D[]) => ({ snake }));
