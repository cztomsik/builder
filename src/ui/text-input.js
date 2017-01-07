import {Base} from './base';

export class TextInput extends Base{}

TextInput.template = `
  <input class="text-input" :value=" value " :class=" 'w' + this.size " @input=" $emit('input', $event.target.value) " />
`;

TextInput.defaults = {
  value: null,
  size: 6
};

TextInput.style = `
  .text-input{
    border: 1px solid;
  }
`;
