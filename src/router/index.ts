import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import SpecieContainerController from '../components/SpecieContainerController.vue'
import CharacterDetail  from '../views/CharacterDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'SpecieContainerController',
    component: SpecieContainerController
  },
  {
    path: '/character-detail/:id',
    name: 'CharacterDetail',
    component: CharacterDetail
  }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
