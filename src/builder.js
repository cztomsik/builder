Vue.config.devtools = true;

import {Base} from './ui/base';

export class Builder extends Base{
  init(){
    super.init();

    this.snippets = {
      C: {name: 'b-container', options: {className: ''}, children: []},
      T: {name: 'b-text', options: {value: 'Text'}},
      TI: {name: 'b-text-input', options: {}},
      B: {name: 'b-button', options: {text: 'Button'}}
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
    <b-tree-view class="outline w12" :items=" nodes " v-model=" selection " @keyup.native.delete="del" />
    <b-designer :items=" nodes " v-model=" selection " @keyup.native.delete="del" />
    <div class="right w16">
      <b-button v-for=" (v, k) in snippets " @click=" add(v) " :text=" k " />

      <b-property-grid :node=" selection " />
    </div>
  </div>
`;
Builder.style = `
  .builder{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
  }

  .builder > *{
    padding: 5px;
  }

  .builder .right{
    background: #eee;
  }

  .outline{
    background: #eee;
  }

  .designer{
    flex: 1;
  }

  .rect{
    pointer-events: none;
  }

  .rect.active{
    background: #00f;
    opacity: 0.2;
  }

  .rect.hover{
    box-shadow: 0 0 1px 1px #00f;
  }

  .preview :empty:after{
    content: ':empty';
    font-size: 20px;
    opacity: 0.2;
  }
`;

export class Designer extends Base{
  init(){
    this.hover = null;
  }
}
Designer.template = `
  <div class="designer" tabindex="-1" @click.self=" $emit('input', null) ">
    <div class="preview">
      <div @mouseleave=" hover = null ">
        <b-x-comp v-for=" it in items " :node=" it " @input=" $emit('input', $event) " @hover=" hover = $event " />
      </div>
    </div>

    <b-x-rect v-if="value" class="active" :rect=" value.$el && value.$el.getBoundingClientRect() " />
    <b-x-rect v-if="hover" class="hover" :rect=" hover.$el && hover.$el.getBoundingClientRect() " />
  </div>
`;
Designer.defaults = {
  items: [],
  value: null
};

let dragged = null;
let copy = null;

export class XComp extends Base{
  render(c){
    // forward
    const on = {
      hover: _.bindKey(this, '$emit', 'hover'),
      input: _.bindKey(this, '$emit', 'input')
    };

    // handle hover & selection
    const nativeOn = {
      // commented because of DnD
      mousemove: (e) => {e.stopPropagation(); /*e.stopImmediatePropagation(); e.preventDefault();*/ this.$emit('hover', this.node)},
      mousedown: (e) => {e.stopPropagation(); /*e.stopImmediatePropagation(); e.preventDefault();*/ this.$emit('input', this.node)},
      dragstart: (e) => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', 'foo');
        e.dataTransfer.effectAllowed = 'copyMove';
        dragged = this.node;
      },
      dragover: (e) => {
        if (dragged && (dragged !== this.node)){
          e.stopPropagation();
          e.preventDefault();

          copy = e.dataTransfer.effectAllowed === 'copy';

          this.$emit('hover', this.node);
        }
      },
      drop: (e) => {
        if (dragged){
          e.stopPropagation();
          e.preventDefault();

          // remember, because it could change below (vue vdom)
          const refNode = this.node;

          if ( ! copy){
            dragged.parent.children = _.without(dragged.parent.children, dragged);
          }

          const toInsert = (copy) ?_.cloneDeep(dragged) :dragged;

          if (this.node.children){
            refNode.children.push(toInsert);
          } else {
            refNode.parent.children.splice(_.indexOf(refNode.parent.children, refNode), 0, toInsert);
          }
       }
      },
      dragend: (e) => {
        dragged = null;
      }
    };

    return c(this.node.name, {props: this.node.options, on: on, nativeOn: nativeOn}, _.map(this.node.children, (child) => {
      return c('b-x-comp', {props: {node: child}, on: on});
    }));
  }

  // TODO: ast
  mounted(){
    this.$watch('node', (n) => {
      n.parent = this.$parent.$parent.node;
      n.$el = this.$el;
      n.$el.draggable = !! n.parent;

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

export class PropertyGrid extends Base{}
PropertyGrid.template = `
  <table class="table" v-if=" node ">
    <tr v-for=" k in _.keys(Base.lib[this.node.name].defaults) ">
      <td>{{ k }}</td>
      <td style="padding-left: 5px">
        <b-text-input v-model=" node.options[k] " />
      </td>
    </tr>
  </table>
`;
PropertyGrid.defaults = {
  node: null
};
