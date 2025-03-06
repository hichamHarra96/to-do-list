import { createRouter, createWebHistory } from "vue-router";
import TaskList from "@/views/TaskList.vue";
import AddTask from "@/views/AddTask.vue";
import EditTask from "@/views/EditTask.vue";
import TaskDetails from "@/views/TaskDetails.vue";

const routes = [
  { path: "/", component: TaskList },
  { path: "/task/add", component: AddTask },
  { path: "/task/:id", component: TaskDetails },
  { path: "/task/:id/edit", component: EditTask, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
