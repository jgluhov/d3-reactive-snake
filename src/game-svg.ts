/**
 * SVG.js
 */

import * as d3 from 'Libraries/d3';
import {CELL_SIZE, GAME_HEIGHT, GAME_WIDTH, GAP_SIZE, MARGIN} from 'Settings';
import {IGroupAttr, IPoint2D, IScene} from 'Types';
import {toPosition} from 'Utils';

export const svg: any = d3.select('.game-container')
  .append('svg')
  .attr('width', GAME_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr('height', GAME_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

svg
  .selectAll('g')
  .data([
    {className: 'background'},
    {className: 'snake'},
    {className: 'apples'}
  ])
  .enter()
  .append('g')
    .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
    .attr('class', (d: IGroupAttr) => d.className);

export function renderBackground(rowCount: number, columnCount: number): void {
  const update: any = svg
    .select('.background')
    .selectAll('rect')
    .data(d3.range(rowCount * columnCount));

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
    .attr('height', CELL_SIZE);
}

export function renderSnake(snake: IPoint2D[]): void {
  const update: any = svg
    .select('.snake')
    .selectAll('rect')
    .data(snake);

  update
    .enter()
    .append('rect')
    .merge(update)
    .call(renderRect);
}

export function renderApples(apples: IPoint2D[]): void {
  const update: any = svg
    .select('.apples')
    .selectAll('circle')
    .data(apples);

  update
    .enter()
    .append('circle')
    .merge(update)
    .call(renderCircle);
}

function renderRect(rect: any, className?: string): void {
  return rect
    .attr('x', (point: IPoint2D) => {
      return toPosition(point.x);
    })
    .attr('y', (point: IPoint2D) => {
      return toPosition(point.y);
    })
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .classed(className, !!className);
}

function renderCircle(rect: any): void {
  return rect
    .attr('cx', (point: IPoint2D) => {
      return toPosition(point.x) + CELL_SIZE / 2;
    })
    .attr('cy', (point: IPoint2D) => {
      return toPosition(point.y) + CELL_SIZE / 2;
    })
    .attr('r', CELL_SIZE / 2);
}

export function renderGameOver(): void {

}

export function renderScene(scene: IScene): void {
  renderSnake(scene.snake);
  renderApples(scene.apples);
}
