import 'vant/lib/index.css';
import './assets/main.css';

import {
  Button,
  Cell,
  CellGroup,
  Circle,
  ConfigProvider,
  Empty,
  Field,
  Icon,
  Popup,
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
app.use(Circle);
app.use(ConfigProvider);
app.use(Empty);
app.use(Field);
app.use(Icon);
app.use(Popup);
app.use(SwipeCell);
app.use(Tab);
app.use(Tabs);
app.use(TextEllipsis);
app.mount('#app');
