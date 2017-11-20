/**
 * Snake main
 */
import {animationFrame, Observable} from 'Libraries/rxjs';
import {apples$} from 'Root/apples';
import {renderBackground, renderGameOver, renderScene} from 'Root/game-svg';
import {score$} from 'Root/score';
import {renderScore} from 'Root/score-svg';
import 'Root/score-svg';
import {snake$} from 'Root/snake';
import 'Root/styles';
import {COLUMN_COUNT, FPS, ROW_COUNT} from 'Settings';
import {IPoint2D, IScene} from 'Types';
import {isGameOver} from 'Utils';

renderBackground(ROW_COUNT, COLUMN_COUNT);

const scene$: Observable<IScene> = Observable
  .combineLatest(snake$, apples$, (
    snake: IPoint2D[],
    apples: IPoint2D[]
  ) => ({snake, apples}));

const game$: Observable<IScene> = Observable
  .interval(1000 / FPS, animationFrame)
  .withLatestFrom(scene$, (_: number, scene: IScene) => scene)
  .takeWhile((scene: IScene) => !isGameOver(scene.snake));

game$.subscribe({
  next: renderScene,
  complete: renderGameOver
});

score$.subscribe(renderScore);
