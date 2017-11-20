/**
 * Snake settings
 */
import {IMargin} from 'Types';

export const MARGIN: IMargin = {
  TOP: 10,
  RIGHT: 10,
  BOTTOM: 10,
  LEFT: 10
};

export const COLUMN_COUNT: number = 30;
export const ROW_COUNT: number = 30;
export const GAP_SIZE: number = 1;
export const CELL_SIZE: number = 12;

export const GAME_WIDTH: number = COLUMN_COUNT * (CELL_SIZE + GAP_SIZE);
export const GAME_HEIGHT: number = ROW_COUNT * (CELL_SIZE + GAP_SIZE);

export const SNAKE_INITIAL_LENGTH: number = 5;
export const SNAKE_SPEED: number = 200;

export const EATEN_POINTS: number = 1;
export const APPLE_COUNT: number = 1;

export const SCORE_WIDTH: number = 120 - MARGIN.LEFT - MARGIN.RIGHT;
export const SCORE_HEIGHT: number = 120 - MARGIN.TOP - MARGIN.BOTTOM;

export const FPS: number = 60;
