<template>
  <table style="border:1px solid">
    <thead>
      <tr>
        <th>Kode</th>
        <th>Awalan</th>
        <th>Panjang</th>
        <th>Nomor HP</th>
        <th>Playstore URL</th>
        <th>Token</th>
        <th>Tanggal Update</th>
      </tr>
    </thead>
    <tr v-for="(item, index) in dataModel" :key="index">
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'kode')" :totalColumns="columns.length"
        :totalDataModel="dataModel.length" :selectedCol="selectedCol" v-model="dataModel[index].kode"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'kode'))" />
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'awalan')" :totalColumns="columns.length"
        :totalDataModel="dataModel.length" :selectedCol="selectedCol" v-model="dataModel[index].awalan"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'awalan'))" />
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'panjang')" :totalColumns="columns.length"
        :totalDataModel="dataModel.length" :selectedCol="selectedCol" v-model="dataModel[index].panjang"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'panjang'))" />
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'no_hp')" :totalColumns="columns.length"
        :totalDataModel="dataModel.length" :selectedCol="selectedCol" v-model="dataModel[index].no_hp"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'no_hp'))" />
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'playstore_url')"
        :totalColumns="columns.length" :totalDataModel="dataModel.length" :selectedCol="selectedCol"
        v-model="dataModel[index].playstore_url"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'playstore_url'))" />
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'firebase_token')"
        :totalColumns="columns.length" :totalDataModel="dataModel.length" :selectedCol="selectedCol"
        v-model="dataModel[index].firebase_token"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'firebase_token'))" />
      <Column :row="index" :col="columns.findIndex(col => col.attribute == 'updated_at')" :totalColumns="columns.length"
        :totalDataModel="dataModel.length" :selectedCol="selectedCol" v-model="dataModel[index].updated_at"
        @click="selectColumn(index, columns.findIndex(col => col.attribute == 'updated_at'))" />
    </tr>
  </table>
</template>

<script setup>
import {
  ref,
  reactive,
  watch,
  onBeforeMount,
  onMounted
} from 'vue';
import Column from '../commons/Column.vue';

const selectedCol = reactive({
  row: null,
  col: null,
  status: 'select', // select, edit
});

const columns = [
  {
    attribute: 'kode',
    required: true,
  },
  {
    attribute: 'awalan',
    required: true,
  },
  {
    attribute: 'panjang',
    required: true,
  },
  {
    attribute: 'no_hp',
    required: true,
  },
  {
    attribute: 'playstore_url',
    required: true,
  },
  {
    attribute: 'firebase_token',
    required: false,
  },
  {
    attribute: 'updated_at',
    required: false,
  },
];

const dataModel = ref([
  {
    kode: 'AAA',
    awalan: 'xxx',
    panjang: 10,
    no_hp: '082231000029',
    playstore_url: 'https://play.google.com',
    firebase_token: '23jwhajdhaskjhdkasjhdhasasf',
    updated_at: '19 Januari 2023'
  },
  {
    kode: 'AAA',
    awalan: 'xxx',
    panjang: 10,
    no_hp: '082231000029',
    playstore_url: 'https://play.google.com',
    firebase_token: '23jwhajdhaskjhdkasjhdhasasf',
    updated_at: '19 Januari 2023'
  },
  {
    kode: 'AAA',
    awalan: 'xxx',
    panjang: 10,
    no_hp: '082231000029',
    playstore_url: 'https://play.google.com',
    firebase_token: '23jwhajdhaskjhdkasjhdhasasf',
    updated_at: '19 Januari 2023'
  }
])

const selectColumn = (row, col) => {
  if (selectedCol.row == row && selectedCol.col == col) {
    selectedCol.status = 'edit';
  } else {
    selectedCol.row = row;
    selectedCol.col = col;
    selectedCol.status = 'select';
  }
}

const addNewRow = () => {
  dataModel.value.push({
    kode: null,
    awalan: null,
    panjang: null,
    no_hp: null,
    playstore_url: null,
    firebase_token: null,
    updated_at: null
  })
}

watch(() => ({ ...dataModel.value[dataModel.value.length - 1] }), (newData, oldData) => {
  let dataValid = true;
  // is all required col on last row has been filled
  columns.forEach(column => {
    if (column.required && newData[column.attribute] == null) {
      dataValid = false;
    }
  });

  if (dataValid) addNewRow();
})

onBeforeMount(() => {
  window.addEventListener('keyup', (e) => {
    if (e.key == 'Escape' && selectedCol.status == 'edit') {
      selectedCol.status = 'select'
    } else {
      if (e.key == 'ArrowLeft' && selectedCol.status == 'select') {
        if (selectedCol.col > 0) {
          selectedCol.col--
        }
      } else if (e.key == 'ArrowRight' && selectedCol.status == 'select') {
        if ((selectedCol.col + 1) < columns.length) {
          selectedCol.col++
        }
      } else if (e.key == 'ArrowUp') {
        if (selectedCol.row > 0) {
          selectedCol.row--
        }
      } else if (e.key == 'ArrowDown') {
        if ((selectedCol.row + 1) < dataModel.value.length) {
          selectedCol.row++
        }
      }
    }
  })

  window.addEventListener('keypress', (e) => {
    if (selectedCol.status == 'select') {
      selectedCol.status = 'edit'
    }
  })
})

onMounted(() => {
  addNewRow();
});

</script>

<style scoped>
.updated {
  background-color: yellow;
}
</style>