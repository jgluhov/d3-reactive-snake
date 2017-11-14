import * as d3 from './lib/d3';

import {
  WIDTH,
  HEIGHT,
  MARGIN,
  CELL_SIZE,
  GAP_SIZE,
} from './settings';

export const svg = d3.select('.container')
  .append('svg')
    .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const background = svg
  .append('g')
    .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`)
    .attr('class', 'background');

export const renderBackground = (rowCount, columnCount) => {
  const update = background
    .selectAll('rect')
    .data(d3.range(rowCount * columnCount));

  update
    .enter()
    .append('rect')
      .attr('x', (_, i) => {
        return Math.floor(i % columnCount) * (CELL_SIZE + GAP_SIZE);
      })
      .attr('y', (_, i) => {
        return Math.floor(i / columnCount) * (CELL_SIZE + GAP_SIZE);
      })
      .attr('width', CELL_SIZE)
      .attr('height', CELL_SIZE)
      .attr('class', 'cell');
};
