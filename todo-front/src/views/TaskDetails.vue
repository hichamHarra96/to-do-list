<template>
  <div class="container mt-5">
    <h2 class="text-center mb-3">Task Details</h2>
    <div v-if="task" class="card ">

      <div class="card-header">
        <h2>{{ task.title }}</h2>
      </div>
      <div class="card-body">
        <div class="form-floating mb-3">
          <textarea class="form-control mt-2" placeholder="Leave a comment here" id="floatingTextarea2Disabled"
            style="height: 100px" disabled v-model="task.description"> </textarea>

          <label for="floatingTextarea2Disabled">description</label>
        </div>


        <div class="col mb-3">
          <span class="badge bg-primary" v-if="task.status === TaskStatus.TODO">À FAIRE</span>
          <span class="badge bg-warning" v-else-if="task.status === TaskStatus.IN_PROGRESS">EN COURS</span>
          <span class="badge bg-success" v-else-if="task.status === TaskStatus.DONE">TERMINÉ</span>
        </div>

        <div class="d-flex">
          <RouterLink :to="`/task/${route.params.id}/edit`" class="btn btn-warning">Edit</RouterLink>
          <RouterLink to="/" class="btn btn-primary ms-2">Back</RouterLink>
        </div>
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
import { Task, TaskStatus } from "@/entities/task.entity";
import { taskService } from "@/services/task.service";
import { showNotification } from "@/utils/notification";

const route = useRoute();
const task = ref<Task | null>(null);

const fetchTask = async () => {
  try {
    task.value = await taskService.getTaskById(route.params.id as string);
  } catch (error) {
    showNotification("error", "Erreur lors de la récupération de la tâche. Veuillez réessayer.");
    throw error;
  }
};

onMounted(fetchTask);
</script>