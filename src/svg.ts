import * as d3 from './lib/d3';

import {
  width,
  height,
  margin,
  cellSize,
  gapSize,
} from './settings';

export const svg = d3.select('.container')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

const background = svg
  .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
    .attr('class', 'background');

export const renderBackground = (rows, columns) => {
  const update = background
    .selectAll('rect')
    .data(d3.range(rows * columns));

  update
    .enter()
    .append('rect')
      .attr('x', (_, i) => {
        return Math.floor(i % columns) * (cellSize + gapSize);
      })
      .attr('y', (_, i) => {
        return Math.floor(i / columns) * (cellSize + gapSize);
      })
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('class', 'cell');
};
