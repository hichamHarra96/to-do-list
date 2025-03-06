<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Accueil</RouterLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/task/add" class="btn btn-primary">Nouvelle Tâche</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  
  <main class="container py-4">
    <RouterView />
  </main>
</template>
