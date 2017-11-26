/**
 * Snake main
 */
import 'IO/increasing';
import {animationFrame, Observable} from 'Libraries/rxjs';
import {apples$} from 'Root/apples';
import {renderBackground, renderScene} from 'Root/game-svg';
import {score$} from 'Root/score';
import {renderScore} from 'Root/score-svg';
import 'Root/score-svg';
import {snake$} from 'Root/snake';
import 'Root/styles';
import {COLUMN_COUNT, FPS, ROW_COUNT} from 'Settings';
import {IPoint2D, IScene} from 'Types';
import {isGameOver, showKeymap} from 'Utils';

const scene$: Observable<IScene> = Observable
  .combineLatest(snake$, apples$, (
    snake: IPoint2D[],
    apples: IPoint2D[]
  ) => ({snake, apples}));

const game$: Observable<IScene> = Observable
  .interval(1000 / FPS, animationFrame)
  .withLatestFrom(scene$, (_: number, scene: IScene) => scene)
  .takeWhile((scene: IScene) => !isGameOver(scene.snake));

document.addEventListener(
  'DOMContentLoaded',
  () => {
    showKeymap();
    renderBackground(ROW_COUNT, COLUMN_COUNT);

    game$.subscribe(renderScene);
    score$.subscribe(renderScore);
  },
  true
);
