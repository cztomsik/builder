export class Base{
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

    document.head.insertAdjacentHTML('beforeend', `<style>${this.style}</style>`);

    const name = 'b-' + _.kebabCase(this.name);

    Base.lib[name] = this;
    Vue.component(name, definition);
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

Base.lib = {};
