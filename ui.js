class Base{
  constructor(){
    this.init();
  }

  init(){}

  mounted(){
    this.$watch('className', (c, prev) => {
      // nefunguje pro vice class v jednom retezci

      //if (prev){
      //  this.$el.classList.remove(prev);
      //}

      //if (c){
      //  this.$el.classList.add(c);
      //}
    }, {immediate: true});
  }

  static register(){
    const hooks = _.pick(this.prototype, 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed');

    const definition = _.assign({
      template: this.template,
      render: this.prototype.render,
      data: () => {
        return new this();
      },
      methods: getMethods(this.prototype),
      props: _.mapValues(this.defaults, (v) => {
        return {default: v};
      })
    }, hooks);

    Vue.component(_.kebabCase(this.name), definition);
    return;

    function getMethods(o){
      if (o === Object.prototype){
        return {};
      }

      return _.assign(getMethods(Object.getPrototypeOf(o)), _.pick(o, Object.getOwnPropertyNames(o)));
    }
  }
}
Base.defaults = {
  className: ''
};

class BContainer extends Base{}
BContainer.template = '<div><slot /></div>';

class BText extends Base{}
BText.template = '<span>{{ value }}</span>';
BText.defaults = {
  value: ''
};

class BTextInput extends Base{}
BTextInput.template = `<input class="text-input" :value=" value " :class=" 'w' + this.size " @input=" $emit('input', $event.target.value) " />`;
BTextInput.defaults = {
  value: null,
  size: 6
};

class BButton extends Base{}
BButton.template = `<button class="button" @click="$emit('click')">{{ text }}</button>`;
BButton.defaults = {
  text: ''
};

class PropertyGrid extends Base{}
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

class TreeView extends Base{}
TreeView.template = `
  <ul class="tree-view" tabindex="-1">
    <tree-node v-for=" it in items " :item=" it " :value=" value " @input=" $emit('input', $event) " />
  </ul>
`;
TreeView.defaults = {
  items: [],
  value: null
};

class TreeNode extends Base{}
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
