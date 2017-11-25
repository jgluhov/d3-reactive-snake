/**
 * RxJS library
 */
export {Observable} from 'rxjs/Observable';
export {Timestamp} from 'rxjs/Rx';
export {BehaviorSubject} from 'rxjs/BehaviorSubject';
export {animationFrame} from 'rxjs/scheduler/animationFrame';

/* tslint:disable */
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/timestamp';
import 'rxjs/add/operator/first';

// TODO: remove, only for dev
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
