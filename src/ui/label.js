import {Base} from './base';

export class Label extends Base{}

Label.template = `
  <label>{{ text }}</label>
`;

Label.defaults = {
  text: ''
};
