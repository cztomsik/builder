Vue.config.devtools = true;

import {Base} from './ui/base';

export class Builder extends Base{
  init(){
    super.init();

    this.snippets = {
      C: {name: 'b-container', options: {className: ''}, children: []},
      T: {name: 'b-text', options: {value: 'Text'}},
      B: {name: 'b-button', options: {text: 'Button'}},
      FG: {name: 'b-container', options: {className: 'form-group'}, children: [{name: 'b-text', options: {value: 'Label'}}, {name: 'b-text-input', options: {size: 6}}]}
    };

    // TODO: ast
    this.nodes = (sessionStorage.nodes && JSON.parse(sessionStorage.nodes)) || [_.cloneDeep(this.snippets.C)];
    this.selection = null;
  }

  updated(){
    // TODO: ast
    sessionStorage.nodes = JSON.stringify(this.nodes);
  }

  add(node){
    if (this.selection && this.selection.children){
      this.selection.children.push(_.cloneDeep(node));
    }
  }

  // NOTE: delete is keyword
  del(){
    if ( ! (this.selection && this.selection.parent)){
      return;
    }

    this.selection.parent.children = _.without(this.selection.parent.children, this.selection);
    this.selection = null;
  }
}
Builder.template = `
  <div class="builder">
    <tree-view class="outline w12" :items=" nodes " v-model=" selection " @keyup.native.delete="del" />
    <designer :items=" nodes " v-model=" selection " @keyup.native.delete="del" />
    <div class="right w16">
      <b-button v-for=" (v, k) in snippets " @click=" add(v) " :text=" k " />

      <property-grid :data=" selection && selection.options " />
    </div>
  </div>
`;

export class Designer extends Base{
  init(){
    this.hover = null;
  }
}
Designer.template = `
  <div class="designer" tabindex="-1">
    <div class="preview">
      <div @mouseleave=" hover = null ">
        <x-comp v-for=" it in items " :node=" it " @input=" $emit('input', $event) " @hover=" hover = $event " />
      </div>
    </div>

    <x-rect v-if="value" class="active" :rect=" value.$el && value.$el.getBoundingClientRect() " />
    <x-rect v-if="hover" class="hover" :rect=" hover.$el && hover.$el.getBoundingClientRect() " />
  </div>
`;
Designer.defaults = {
  items: [],
  value: null
};

export class XComp extends Base{
  render(c){
    const on = {hover: (node) => {this.$emit('hover', node)}, input: (node) => {this.$emit('input', node)}};
    const nativeOn = {mousedown: (e) => {e.stopPropagation(); this.$emit('input', this.node)}, mousemove: (e) => {e.stopPropagation(); this.$emit('hover', this.node)}};

    return c(this.node.name, {props: this.node.options, on: on, nativeOn: nativeOn}, _.map(this.node.children, (child) => {
      return c('x-comp', {props: {node: child}, on: on});
    }));
  }

  // TODO: ast
  mounted(){
    this.$watch('node', (n) => {
      n.parent = this.$parent.$parent.node;
      n.$el = this.$el;

      n.toJSON = function(){return _.omit(this, 'parent', '$el')};
    }, {immediate: true});
  }
}
XComp.defaults = {
  node: null
};

export class XRect extends Base{}
XRect.template = `
  <div class="rect" :style=" rect && {position: 'fixed', left: rect.left + 'px', top: rect.top + 'px', width: rect.width + 'px', height: rect.height + 'px'} " @click=" $emit('click') " />
`;
XRect.defaults = {
  rect: null
};
