<template>
  <div class="container mt-5">
    <h1>Task Details</h1>
    <div v-if="task" class="card p-4">
      <h5>{{ task.title }}</h5>
      <p><strong>Description:</strong> {{ task.description }}</p>

      <div class="col mb-3">
        <span class="badge bg-primary" v-if="task.status === TaskStatus.TODO"
          >À FAIRE</span
        >
        <span
          class="badge bg-warning"
          v-else-if="task.status === TaskStatus.IN_PROGRESS"
          >EN COURS</span
        >
        <span
          class="badge bg-success"
          v-else-if="task.status === TaskStatus.DONE"
          >TERMINÉ</span
        >
      </div>

      <div class="d-flex">
        <RouterLink
          :to="`/task/${route.params.id}/edit`"
          class="btn btn-warning"
          >Edit</RouterLink
        >
        <RouterLink to="/" class="btn btn-primary ms-2">Back</RouterLink>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Task, TaskStatus } from "../entities/task.entity";
import { taskService } from "../services/task.service";

const route = useRoute();
const task = ref<Task | null>(null);

const fetchTask = async () => {
  try {
    task.value = await taskService.getTaskById(route.params.id as string);
  } catch (error) {
    console.error("Error fetching task:", error);
  }
};

onMounted(fetchTask);
</script>