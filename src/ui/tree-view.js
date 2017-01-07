import {Base} from './base';

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
