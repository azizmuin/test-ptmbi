<template>
    <td ref="tableCol" :class="{ selected: isSelected && selectedCol.status == 'select', editmode:isEditMode }">
        <input :id="colId" v-if="isEditMode" type="text" v-model="data" ref="input" @keyup="inputHandler($event)" />
        <template v-else>
            {{ props.modelValue }}
        </template>
    </td>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue';

const input = ref(null);
const tableCol = ref(null);
const isEditMode = ref(false);
const data = ref(props.modelValue);

const props = defineProps(['modelValue', 'row', 'col', 'totalColumns', 'selectedCol', 'totalDataModel']);
const emits = defineEmits(['update:modelValue']);
const selectedCol = props.selectedCol;
const colId = 'col' + props.row + props.col;
const isSelected = computed(() => selectedCol.row == props.row && selectedCol.col == props.col)

const isMoved = (newSelectedCol) => {
    return newSelectedCol.row != props.row || newSelectedCol.col != props.col;
}

watch(() => ({ ...props.selectedCol }), async (newSelectedCol, oldSelectedCol) => {
    // if move to another col the inputed value will update to data model
    if (isMoved(newSelectedCol) && oldSelectedCol.row == props.row && oldSelectedCol.col == props.col && oldSelectedCol.status == 'edit') {
        if (data.value != props.modelValue) {
            tableCol.value.parentNode.classList.add('updated')
            emits('update:modelValue', data.value);
        }
    } else {
        data.value = props.modelValue;
    }

    // if this col is selected and on edit mode, it will be autofocus and auto select all text
    if (newSelectedCol.row == props.row && newSelectedCol.col == props.col && newSelectedCol.status == "edit") {
        isEditMode.value = true;
        await nextTick();
        input.value.select()
    } else {
        isEditMode.value = false;
    }
});

const inputHandler = e => {
    let elemInput = document.getElementById(colId);
    if (e.key == 'ArrowLeft' && elemInput.selectionStart == 0) {
        if (selectedCol.col > 0) {
            selectedCol.col--
        }
    } else if ((e.key == 'ArrowRight' || e.key == 'Tab') && elemInput.selectionStart == elemInput.value.length) {
        if ((selectedCol.col + 1) < props.totalColumns) {
            selectedCol.col++
        }
    } else if (e.key == 'Enter') {
        if ((selectedCol.row + 1) < props.totalDataModel) {
            selectedCol.row++
            selectedCol.status = 'select'
        }
    }
}

</script>

<style scoped>
input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

.selected {
    background-color: blue;
    color: aliceblue;
}

.editmode {
    padding: 0px;
}
</style>