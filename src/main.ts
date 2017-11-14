import './styles';
import { renderBackground } from './svg';
import { direction$ } from './steering';
import { snakeLength$ } from './snake';
import { rows, columns } from './settings';

direction$.subscribe((e) => {
  console.log(e);
});

snakeLength$.subscribe((d) => {
  console.log(d);
});

renderBackground(rows, columns);
