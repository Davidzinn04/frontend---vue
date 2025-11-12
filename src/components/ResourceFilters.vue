<template>
  <div class="resource-filters">
    <h3>Filtros da Listagem (+2 pts por filtro)</h3>
    
    <input 
      type="text" 
      v-model="filters.text" 
      placeholder="Pesquisar por título ou autor..." 
      @input="applyFilters"
    />

    <select v-model="filters.status" @change="applyFilters">
      <option value="">Todos os Status</option>
      <option value="ativo">Ativo</option>
      <option value="pendente">Pendente</option>
    </select>
    
    <button @click="resetFilters">Limpar Filtros</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash'; // Recomendado usar debounce para input de texto

const emit = defineEmits(['apply-filters']);

const filters = ref({
  text: '', // Mapeia para `titulo_like` ou `q` no json-server
  status: '', // Mapeia para `status` no json-server
  // startDate: '', 
});

const mapFilters = () => {
  const mapped = {};
  
  if (filters.value.text) {
    // json-server usa _like para pesquisa parcial (ex: titulo_like=termo) ou q (pesquisa em todos os campos)
    mapped.q = filters.value.text; 
  }
  if (filters.value.status) {
    mapped.status = filters.value.status;
  }
  // if (filters.value.startDate) {
  //   mapped.data_gte = filters.value.startDate; // Filtro por data maior ou igual
  // }
  
  return mapped;
};

// Função com debounce para evitar muitas requisições
const applyFilters = debounce(() => {
  emit('apply-filters', mapFilters());
}, 300);

const resetFilters = () => {
  filters.value = {
    text: '',
    status: '',
    // startDate: '',
  };
  emit('apply-filters', {});
};
</script>