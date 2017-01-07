import {Base} from './base';

export class TreeView extends Base{}

TreeView.template = `
  <ul class="tree-view" tabindex="-1">
    <b-tree-node v-for=" it in items " :item=" it " :value=" value " @input=" $emit('input', $event) " />
  </ul>
`;

TreeView.defaults = {
  items: [],
  value: null
};

TreeView.style = `
  .tree-view, .tree-view ul{
    list-style: none;
  }

  .tree-view ul{
    padding-left: 15px;
  }

  .tree-view span{
    cursor: pointer;
    display: inline-block;
    padding: 1px 5px;
  }

  .tree-view span:hover{
    background: #eee;
  }

  .tree-view span.active{
    background: #00f;
    color: #fff;
  }
`;

export class TreeNode extends Base{}

TreeNode.template = `
  <li>
    <span @click=" $emit('input', item) " :class=" {active: value === item} ">{{ item.name }}</span>
    <ul v-if=" item.children ">
      <b-tree-node v-for=" it in item.children " :item=" it " :value=" value " @input=" $emit('input', $event) " />
    </ul>
  </li>
`;

TreeNode.defaults = {
  value: null,
  item: null
};
