import './assets/main.css';
import 'vant/lib/index.css';

import {
  Popup,
  Field,
  Button,
  CellGroup,
  SwipeCell,
  Cell,
  Tabs,
  Tab,
  TextEllipsis,
  Icon,
} from 'vant';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(Popup);
app.use(Field);
app.use(CellGroup);
app.use(Cell);
app.use(SwipeCell);
app.use(Tabs);
app.use(Tab);
app.use(TextEllipsis);
app.use(Button);
app.use(Icon);
app.mount('#app');
