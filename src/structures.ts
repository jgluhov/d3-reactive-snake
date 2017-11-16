/**
 * Point2D class
 */
import {IPoint2D} from 'Root/types';

export class Point2D implements IPoint2D {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}
