<template>
  <div class="add-todo container mt-4">
    <TaskForm :task="task" @submited="addTask" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { taskService } from "@/services/task.service";
import { Task, TaskStatus } from "@/entities/task.entity";
import { useRouter } from "vue-router";
import TaskForm from "@/components/TaskForm.vue";
import { showNotification } from "@/utils/notification";

const task = ref<Task>({
  title: "",
  description: "",
  status: TaskStatus.TODO,
});

const router = useRouter();

const addTask = async (newTask: typeof task.value) => {
  try {
    await taskService.createTask(newTask);
    showNotification("success", "Tâche ajoutée avec succès !");
    router.push(`/`);
  } catch (error) {
    showNotification("error", "Erreur lors de l'ajout de la tâche");
    throw error;
  }
};
</script>
