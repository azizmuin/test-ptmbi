<template>
  <div>
    <div class="menu">
      <nav>
        <router-link to="/" class="mr-5"><button>Home</button></router-link>
        <router-link to="/owner" class="ml-5"><button>Owner</button></router-link>
      </nav>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script setup>

</script>