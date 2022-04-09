import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import SpecieContainerController from '../components/SpecieContainerController.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'SpecieContainerController',
    component: SpecieContainerController
  }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
