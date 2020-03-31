import Drawer from 'element-ui/packages/drawer';
import Collapse from 'element-ui/packages/collapse';
import CollapseItem from 'element-ui/packages/collapse-item';
import Cascader from './components/cascader';

import 'element-ui/lib/theme-chalk/drawer.css';
import 'element-ui/lib/theme-chalk/cascader.css';

import App from './App';
import Topbar from './Topbar';
import { apiClient } from '../../src/lib/apiClient';

Vue.component(Drawer.name, Drawer);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Cascader.name, Cascader);

Vue.prototype.$apiClient = apiClient;
Vue.prototype.$document = $(document);

new Vue({
  render: h => h(App),
}).$mount('#_neoJSVue');

new Vue({
  render: h => h(Topbar),
}).$mount('#_neoTopbar');
