/**
 * Snake types
 */

export { Selection, BaseType } from 'd3-selection';

export interface IPoint2D {
  x: number;
  y: number;
}

export interface IDirections {
  [key: number]: IPoint2D;
}

export interface ISnakeState {
  snakeLength: number;
  direction: IPoint2D;
}

export interface IScene {
  snake: IPoint2D[];
}

export interface IMargin {
  TOP: number;
  RIGHT: number;
  BOTTOM: number;
  LEFT: number;
}

export interface IKeyCodes {
  [key: string]: number;
}
