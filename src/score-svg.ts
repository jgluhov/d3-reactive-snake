/**
 * Score scg
 */
import * as d3 from 'Libraries/d3';
import {MARGIN, SCORE_HEIGHT, SCORE_WIDTH} from 'Settings';
import {IGradientAttr, IScore} from 'Types';

const svg: any = d3.select('.score-container')
  .append('svg')
    .attr('width', SCORE_WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr('height', SCORE_HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .append('g')
    .attr('transform', `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

const defs: any = svg
  .append('defs');

defs
  .append('radialGradient')
    .attr('id', 'sun-gradient')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', '50%')
    .selectAll('stop')
    .data([
      {offset: '0%', color: '#FFF76B'},
      {offset: '50%', color: '#FFF845'},
      {offset: '90%', color: '#FFDA4E'},
      {offset: '100%', color: '#FB8933'}
    ])
    .enter()
    .append('stop')
      .attr('offset', (d: IGradientAttr) => d.offset)
      .attr('stop-color', (d: IGradientAttr) => d.color);

const circleEl: any = svg
  .append('circle')
  .attr('cx', SCORE_WIDTH / 2)
  .attr('cy', SCORE_HEIGHT / 2)
  .attr('r', SCORE_WIDTH / 2)
  .attr('fill', 'url(#sun-gradient)');

export function renderScore(score: number): void {
  const update: any = svg
    .selectAll('text')
    .data([{score}]);

  const enter: any = update
    .enter()
      .append('text')
        .attr('class', 'score-text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('x', SCORE_WIDTH / 2)
        .attr('y', SCORE_HEIGHT / 2);

  renderBeating();

  enter
    .merge(update)
    .text((d: IScore) => d.score);
}

function renderBeating(): void {
  circleEl
    .transition()
    .duration(150)
    .attr('r', SCORE_WIDTH / 2 - 20)
    .transition()
    .duration(500)
    .ease(d3.easeElasticOut)
    .attr('r', SCORE_WIDTH / 2);
}
