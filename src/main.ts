import './styles';
import './svg';
import { direction$ } from './steering';

direction$.subscribe((e) => {
  console.log(e);
});
