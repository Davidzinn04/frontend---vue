<template>
  <div class="resource-filters">
    <input
      type="text"
      v-model="search"
      placeholder="Pesquisar..."
      aria-label="Pesquisar"
    />
    <select v-model="status" aria-label="Filtrar por status">
      <option value="all">Todos</option>
      <option value="ativo">Ativos</option>
      <option value="pendente">Pendentes</option>
      <option value="inativo">Inativos</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filter'])

const search = ref('')
const status = ref('all')

function debounce(fn, wait = 300) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

const applyFilters = () => {
  emit('filter', { search: search.value.trim(), status: status.value })
}

const debouncedApply = debounce(applyFilters, 350)

// mudanças no input usam debounce; select aplica imediatamente
watch(search, () => debouncedApply())
watch(status, () => applyFilters())
</script>

<style scoped>
.resource-filters {
  display:flex;
  gap:0.5rem;
  margin-bottom:1rem;
}
.resource-filters input {
  flex:1;
  padding:0.5rem;
  border:1px solid #d1d5db;
  border-radius:6px;
}
.resource-filters select {
  padding:0.5rem;
  border:1px solid #d1d5db;
  border-radius:6px;
}
</style>