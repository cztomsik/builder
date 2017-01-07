import {Base} from './base';

export class BContainer extends Base{}
BContainer.template = '<div><slot /></div>';

export class BText extends Base{}
BText.template = '<span>{{ value }}</span>';
BText.defaults = {
  value: ''
};

export class BTextInput extends Base{}
BTextInput.template = `<input class="text-input" :value=" value " :class=" 'w' + this.size " @input=" $emit('input', $event.target.value) " />`;
BTextInput.defaults = {
  value: null,
  size: 6
};

export class BButton extends Base{}
BButton.template = `<button class="button" @click="$emit('click')">{{ text }}</button>`;
BButton.defaults = {
  text: ''
};

export class PropertyGrid extends Base{}
PropertyGrid.template = `
  <table class="table">
    <tr v-for=" k in _.keys(data) ">
      <td>{{ k }}</td>
      <td style="padding-left: 5px">
        <b-text-input v-model=" data[k] " />
      </td>
    </tr>
  </table>
`;
PropertyGrid.defaults = {
  data: null
};

export class TreeView extends Base{}
TreeView.template = `
  <ul class="tree-view" tabindex="-1">
    <tree-node v-for=" it in items " :item=" it " :value=" value " @input=" $emit('input', $event) " />
  </ul>
`;
TreeView.defaults = {
  items: [],
  value: null
};

export class TreeNode extends Base{}
TreeNode.template = `
  <li>
    <span @click=" $emit('input', item) " :class=" {active: value === item} ">{{ item.name }}</span>
    <ul v-if=" item.children ">
      <tree-node v-for=" it in item.children " :item=" it " :value=" value " @input=" $emit('input', $event) " />
    </ul>
  </li>
`;
TreeNode.defaults = {
  value: null,
  item: null
};
