import {Base} from './base';

export class Link extends Base{}

Link.template = `
  <a href="#">{{ text }}</a>
`;

Link.defaults = {
  text: ''
};
