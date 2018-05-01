import Vue from 'vue';
import Router from 'vue-router';

import StartPage from '@/views/StartPage.vue';
import Deck from './views/Deck';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'start-page',
      component: StartPage,
    },
    {
      path: '/deck',
      name: 'deck',
      component: Deck,
    },
  ],
});
