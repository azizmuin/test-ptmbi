<template>
  <div>
    <input type="text" v-model="search" class="search-input">
  </div>
  <table>
    <thead>
      <tr>
        <th>Nomor</th>
        <th>Menu</th>
        <th>Lokasi Icon</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in filteredItems" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ data.menu }}</td>
        <td>{{ data.icon }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('');

const dataMenu = ref([
  {
    menu: "Pulsa",
    icon: "https://serbamurah.com"
  },
  {
    menu: "Pulsa Murah",
    icon: "https://pt-mbi.com"
  },
  {
    menu: "Pulsa Diskon",
    icon: "https://kiospulsa.com"
  },
  {
    menu: "Gratis",
    icon: "https://paketdata.xyz"
  }
])

const filteredItems = computed(() => {
  return dataMenu.value.filter(item => {
    return item.menu.toLowerCase().indexOf(search.value.toLowerCase()) > -1 || item.icon.toLowerCase().indexOf(search.value.toLowerCase()) > -1
  })
})
</script>

<style>
.search-input {
  height: 26px;
  margin-bottom: 15px;
}
</style>