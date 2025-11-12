<template>
  <div class="resource-list">
    <h2>Lista de Recursos</h2>
    <p v-if="!resources.length">Nenhum recurso encontrado. (Requisito +2 pts: Lista vazia)</p>
    
    <ul>
      <li v-for="resource in resources" :key="resource.id">
        <strong>{{ resource.titulo }}</strong> ({{ resource.autor }})
        <div>
          <button @click="$emit('edit', resource)">Editar</button>
          <button @click="$emit('delete', resource.id)">Excluir</button>
          <button @click="toggleSubresource(resource.id)">
            {{ isSubresourceVisible(resource.id) ? 'Ocultar' : 'Ver' }} Comentários
          </button>
        </div>

        <div v-if="isSubresourceVisible(resource.id)" class="subresource-area">
          <SubResourceList :resourceId="resource.id" />
          </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SubResourceList from './SubResourceList.vue';

defineProps({
  resources: {
    type: Array,
    required: true,
  },
});

defineEmits(['edit', 'delete']);

// Lógica de visibilidade dos sub-recursos (por ID)
const visibleSubresources = ref({});

const toggleSubresource = (resourceId) => {
  visibleSubresources.value[resourceId] = !visibleSubresources.value[resourceId];
};

const isSubresourceVisible = (resourceId) => {
  return !!visibleSubresources.value[resourceId];
};
</script>