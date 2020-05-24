import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Gallery from './components/gallery/Gallery';
import Home from './components/home/Home';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/jquery/dist/jquery.js'
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import GalleryService from './services/GalleryService';
import { ConfigClass } from './classes/configClass';

let server = `${ConfigClass.getUrlApi().toString()}`;

Vue.prototype.$galleryService = GalleryService;
Vue.prototype.$server = server;

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  {
    name: 'Gallery',
    path: '/gallery',
    component: Gallery
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
