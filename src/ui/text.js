import {Base} from './base';

export class Text extends Base{}

Text.template = '<span>{{ value }}</span>';

Text.defaults = {
  value: ''
};
