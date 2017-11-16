/**
 * SVG.js
 */

import * as d3 from 'Libraries/d3';
import {
  CELL_SIZE,
  GAP_SIZE,
  HEIGHT,
  MARGIN,
  WIDTH
} from 'Root/settings';
import {IPoint2D} from 'Root/types';
import {toPosition} from 'Root/utils';

export const svg: any = d3.select('.container')
  .append('svg')
  .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const backgroundEl: any = svg
  .append('g')
  .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
  .attr('class', 'background');

const snakeEl: any = svg
  .append('g')
  .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
  .attr('class', 'snake');

export function renderBackground(rowCount: number, columnCount: number): void {
  const update: any = backgroundEl
    .selectAll('rect')
    .data<number>(d3.range(rowCount * columnCount));

  update
    .enter()
    .append('rect')
    .attr('x', (_: number, i: number) => {
      return Math.floor(i % columnCount) * (CELL_SIZE + GAP_SIZE);
    })
    .attr('y', (_: number, i: number) => {
      return Math.floor(i / columnCount) * (CELL_SIZE + GAP_SIZE);
    })
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('class', 'background-cell');
}

export function renderSnake(snake: IPoint2D[]): void {
  const update: any = snakeEl
    .selectAll('rect')
    .data(snake);

  update
    .enter()
    .append('rect')
    .merge(update)
    .call(renderCell);
}

function renderCell(rect: any): any {
  return rect
    .attr('x', (point: IPoint2D) => {
      return toPosition(point.x);
    })
    .attr('y', (point: IPoint2D) => {
      return toPosition(point.y);
    })
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('class', 'snake-cell');
}
