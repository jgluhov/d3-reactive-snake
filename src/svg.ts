import * as d3 from './lib/d3';

import {
  width,
  height,
  margin,
} from './settings';

d3.select('#container')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
