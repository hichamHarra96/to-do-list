<template>
  <div class="card mt-5">
    <h2 class="card-header">Ajouter une Nouvelle Tâche</h2>
    <div class="card-body">

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input id="title" v-model="task.title" class="form-control w-75 " required />
        </div>

        <div class="form-floating">
          <textarea class="form-control w-75" required v-model="task.description" id="floatingTextarea2"
            style="height: 100px"></textarea>
          <label for="floatingTextarea2">Description</label>
        </div>

        <div v-if="task._id" class="mb-3">
          <label for="status" class="form-label">Statut</label>
          <select id="status" v-model="task.status" class="form-control">
            <option :value="TaskStatus.TODO">À FAIRE</option>
            <option :value="TaskStatus.IN_PROGRESS">EN COURS</option>
            <option :value="TaskStatus.DONE">TERMINÉ</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary mt-2">
          {{ task._id ? "Enregistrer les Modifications" : "Ajouter la Tache" }}
        </button>

        <router-link to="/" class="btn btn-secondary ms-2 mt-2">Annuler</router-link>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">
import { TaskStatus, type Task } from "@/entities/task.entity";

const props = defineProps<{
  task: Task;
}>();

const emit = defineEmits<{
  (e: "submited", task: Task): void;
}>();

const handleSubmit = () => {
  emit("submited", props.task);
};
</script>