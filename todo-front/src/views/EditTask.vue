<template>
  <div class="container mt-5">
    <h1>Modifier la Tâche</h1>
    <div v-if="task" class="card p-4">
      <TaskForm
        :task="task"
        submitButtonText="Enregistrer les Modifications"
        @submited="updateTask"
      />
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Task } from "../entities/task.entity";
import { taskService } from "../services/task.service";
import TaskForm from "@/components/TaskForm.vue";

const route = useRoute();
const router = useRouter();
const task = ref<Task | null>(null);

const fetchTask = async () => {
  try {
    task.value = await taskService.getTaskById(route.params.id as string);
  } catch (error) {
    console.error("Erreur lors de la récupération de la tâche:", error);
  }
};

const updateTask = async (updatedTask: Task) => {
    console.log("Mise à jour de la tâche :", updatedTask);
  if (!task.value) return;
  try {
    await taskService.updateTask(route.params.id as string, updatedTask);
    router.push(`/`);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche:", error);
  }
};

onMounted(fetchTask);
</script>
