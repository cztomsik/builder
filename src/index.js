import * as uiComps from './ui';
import * as builderComps from './builder';

window.onload = () => {
  _.forEach(_.assign({}, uiComps, builderComps), _.method('register'));
  document.body.insertAdjacentHTML('beforeend', '<b-builder />');
  new Vue({el: document.body.lastChild});
};