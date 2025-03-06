<template>
  <li class="list-group-item py-3">
    <div class="row align-items-center">
      <div class="form-check col">
        <input
          readonly
          class="form-check-input"
          type="checkbox"
          :checked="task.status === TaskStatus.DONE"
          :id="task._id"
          @click="updateTask()"
        />
        <label
          class="form-check-label"
          :for="task._id"
          :class="{
            'text-decoration-line-through': task.status === TaskStatus.DONE,
          }"
        >
          {{ task.title }}
        </label>
      </div>

      <div class="col d-flex justify-content-center">
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

      <div class="col d-flex justify-content-end align-items-center gap-1">
        <RouterLink :to="`/task/${task._id}`" class="btn btn-light btn-sm"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
            />
            <path
              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
            />
          </svg>
        </RouterLink>

        <RouterLink
          :to="`/task/${task._id}/edit`"
          class="btn btn-secondary btn-sm"
          >Modifier</RouterLink
        >
        <button class="btn btn-danger btn-sm" @click="deleteTask()">
          Supprimer
        </button>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import {type PropType } from "vue";
import { TaskStatus, type Task } from "../entities/task.entity";
import { taskService } from "../services/task.service";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});

// emettre un événement au composant parent
const emit = defineEmits<{
  (e: "deleted", taskId: string): void;
}>();

const updateTask = async () => {
  try {
    if (!props.task._id) {
      console.error("Impossible de mettre à jour la tâche : ID est indéfini");
      return;
    }

    console.log("Mise à jour de la tâche :", props.task._id);

    props.task.status =
      props.task.status === TaskStatus.DONE ? TaskStatus.TODO : TaskStatus.DONE;

    await taskService.updateTask(props.task._id, props.task);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
  }
};

const deleteTask = async () => {
  console.log(props.task);

  console.log(props.task._id);

  try {
    if (!props.task._id) {
      console.error("Impossible de supprimer la tâche : ID est indéfini");
      return;
    }
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      console.log("Suppression de la tâche :", props.task._id);

      await taskService.deleteTask(props.task._id);
      emit("deleted", props.task._id);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
  }
};
</script>