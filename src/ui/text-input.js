import {Base} from './base';

export class BTextInput extends Base{}

BTextInput.template = `
  <input class="text-input" :value=" value " :class=" 'w' + this.size " @input=" $emit('input', $event.target.value) " />
`;

BTextInput.defaults = {
  value: null,
  size: 6
};
