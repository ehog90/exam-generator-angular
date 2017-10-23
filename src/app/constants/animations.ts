import {animate, transition, AUTO_STYLE, style, state, trigger} from '@angular/animations';
/**
 * Created by ehog on 2017. 04. 05..
 */

export const accordionAnimations = [
  trigger('visibility', [
    state('collapsed', style({
      height: '0px'
    })),
    state('expanded', style({
      height: AUTO_STYLE
    })),
    transition('expanded <=> collapsed', animate('120ms ease-in')),
    transition('collapsed => expanded', animate('120ms ease-out'))
  ]),
  trigger('chevronDir', [
    state('collapsed', style({
      transform: 'rotate(90deg)'

    })),
    state('expanded', style({
      transform: AUTO_STYLE
    })),
    transition('expanded <=> collapsed', animate('120ms ease-in')),
    transition('collapsed => expanded', animate('120ms ease-out'))
  ])
];


export const answerFadingAnimations = [
  trigger('visibility', [
    state('collapsed', style({
      height: '0px',
      'padding-bottom': '0',
    })),
    state('expanded',   style({
      height: AUTO_STYLE,
      'padding-bottom': '3px',
    })),
    transition('expanded <=> collapsed', animate('120ms ease-in')),
    transition('collapsed => expanded', animate('120ms ease-out'))
  ])
];
