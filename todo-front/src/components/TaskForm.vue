<template>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Titre</label>
        <input
          id="title"
          v-model="task.title"
          class="form-control"
          required
        />
      </div>
  
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <input
          type="text"
          v-model="task.description"
          class="form-control"
          required
        />
      </div>
  
      <div v-if="task._id" class="mb-3">
        <label for="status" class="form-label">Statut</label>
        <select id="status" v-model="task.status" class="form-control">
          <option :value="TaskStatus.TODO">À FAIRE</option>
          <option :value="TaskStatus.IN_PROGRESS">EN COURS</option>
          <option :value="TaskStatus.DONE">TERMINÉ</option>
        </select>
      </div>
  
    <button type="submit" class="btn btn-primary">{{ task._id ? "Enregistrer les Modifications" : "Ajouter la Tache" }}</button>
      <router-link to="/" class="btn btn-secondary ms-2">Annuler</router-link>
    </form>
  </template>
  
  <script setup lang="ts">
  import { TaskStatus, type Task } from "../entities/task.entity";
  
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