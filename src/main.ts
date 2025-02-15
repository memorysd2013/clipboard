import 'vant/lib/index.css';
import './assets/main.css';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('新版本可用，是否重新載入？')) {
      updateSW();
    }
  },
});

import {
  Button,
  Cell,
  CellGroup,
  ConfigProvider,
  Empty,
  Field,
  Icon,
  Popup,
  PullRefresh,
  SwipeCell,
  Tab,
  Tabs,
  TextEllipsis,
} from 'vant';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);
app.use(Button);
app.use(Cell);
app.use(CellGroup);
app.use(ConfigProvider);
app.use(Empty);
app.use(Field);
app.use(Icon);
app.use(Popup);
app.use(PullRefresh);
app.use(SwipeCell);
app.use(Tab);
app.use(Tabs);
app.use(TextEllipsis);
app.mount('#app');
