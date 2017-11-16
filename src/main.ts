/**
 * Snake main
 */
import {Observable} from 'Libraries/rxjs';
import {apples$} from 'Root/apples';
import {snake$} from 'Root/snake';
import 'Root/styles';
import {renderApples, renderBackground, renderSnake} from 'Root/svg';
import {COLUMN_COUNT, ROW_COUNT} from 'Settings';
import {IPoint2D, IScene} from 'Types';

renderBackground(ROW_COUNT, COLUMN_COUNT);

const scene$: Observable<IScene> = Observable
  .combineLatest(snake$, apples$, (
    snake: IPoint2D[],
    apples: IPoint2D[]
  ) => ({snake, apples}));

scene$.subscribe((scene: IScene) => {
  renderSnake(scene.snake);
  renderApples(scene.apples);
});
