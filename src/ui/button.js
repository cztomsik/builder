import {Base} from './base';

export class BButton extends Base{}

BButton.template = `
  <button class="button" @click="$emit('click')">{{ text }}</button>
`;

BButton.defaults = {
  text: ''
};
