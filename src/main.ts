/**
 * Snake main
 */

import {animationFrame, Observable} from 'Libraries/rxjs';
import {
  COLUMN_COUNT,
  ROW_COUNT
} from 'Root/settings';
import {snake$} from 'Root/snake';
import 'Root/styles';
import {
  renderBackground,
  renderSnake
} from 'Root/svg';
import {
  IPoint2D,
  IScene
} from 'Root/types';

renderBackground(ROW_COUNT, COLUMN_COUNT);

const scene$: Observable<IScene> = Observable
  .combineLatest(snake$, (snake: IPoint2D[]) => ({snake}));

scene$.subscribe((scene: IScene) => {
  renderSnake(scene.snake);
});
