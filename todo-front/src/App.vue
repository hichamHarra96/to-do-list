<template>

  <nav class="navbar bg-dark border-bottom border-body"  data-bs-theme="dark">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Accueil</RouterLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/task/add"  class="btn btn-light">Nouvelle Tâche</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  
  <main class="container py-4">
    <RouterView />
  </main>
</template>
