import {BButton, BText, BTextInput, BContainer, PropertyGrid, TreeView, TreeNode} from './ui';
import {Builder, Designer, XComp, XRect} from './builder';

window.onload = () => {
  _.forEach([BButton, BText, BTextInput, BContainer, Builder, PropertyGrid, TreeView, TreeNode, Designer, XComp, XRect], _.method('register'));
  document.body.insertAdjacentHTML('beforeend', '<builder />');
  new Vue({el: 'builder'});
};