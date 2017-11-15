/**
 * SVG.js
 */

import * as d3 from 'Libraries/d3';
import { BaseType, Selection } from 'Libraries/d3';
import {
  CELL_SIZE,
  GAP_SIZE,
  HEIGHT,
  MARGIN,
  WIDTH
} from 'Root/settings';
import {IPoint2D} from 'Root/steering';

export const svg: Selection<BaseType, {},  HTMLElement, any> = d3.select('.container')
  .append('svg')
    .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const backgroundEl: Selection<BaseType, {},  HTMLElement, any> = svg
  .append('g')
    .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
    .attr('class', 'background');

const snakeEl: Selection<BaseType, {},  HTMLElement, any> = svg
  .append('g')
    .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
    .attr('class', 'snake');

export function  renderBackground(rowCount: number, columnCount: number): void {
  const update: Selection<BaseType, number, BaseType, {}> = backgroundEl
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
      .attr('class', 'cell');
}

export function renderSnake(snake: IPoint2D[]): void {
  console.log(snake);
}
