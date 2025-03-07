<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12 col-md-8 mx-auto">
        <div class="card">
          <div class="card-header bg-dark text-white">
            <h2 class="h5 mb-0">Liste des Tâches</h2>
          </div>

          <div class="card-body">
            
            <div v-if="isLoading" class="text-center py-3">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
            </div>

            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>

            <ul class="list-group list-group-flush" v-if="!isLoading && !error">
              <TaskItem
                v-for="task in tasks"
                :key="task._id"
                :task="task"
                @deleted="removeTask"
              />
            </ul>

            <!-- État vide -->
            <div
              v-if="!isLoading && !error && tasks.length === 0"
              class="text-center py-3 text-muted"
            >
              Aucune tâche disponible
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Task } from "../entities/task.entity";
import { taskService } from "../services/task.service";
import TaskItem from "../components/TaskItem.vue";

const tasks = ref<Task[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

// Charge les tâches au montage du composant
const fetchTasks = async () => {
  try {
    tasks.value = await taskService.getTasks();
  } catch (err) {
    error.value = "Erreur lors de la récupération des tâches";
    console.error("Erreur lors de la récupération des tâches:", err);
  } finally {
    isLoading.value = false;
  }
};

const removeTask = (taskId: string) => {
  tasks.value = tasks.value.filter((task) => task._id !== taskId);
};

onMounted(fetchTasks);
</script>