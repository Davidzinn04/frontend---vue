<template>
  <div id="app">
    <h1>Gerenciamento de Recursos</h1>
    <Notification />

    <ResourceFilters @apply-filters="fetchResources" />

    <ResourceForm 
      :model="editingResource" 
      @save="handleResourceSave" 
      @cancel="editingResource = null" 
    />

    <hr>

    <ResourceList 
      :resources="resources" 
      @edit="startResourceEdit" 
      @delete="deleteResource"
      @toggle-subresources="toggleSubresources"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import resourceService from './services/resourceService'; // <- usar import default (removido { })
import subresourceService from './services/subresourceService';
import ResourceList from './components/ResourceList.vue';
import ResourceForm from './components/ResourceForm.vue';
import ResourceFilters from './components/ResourceFilters.vue';
import Notification from './components/Notification.vue';
// import { useNotification } from '@/composables/useNotification'; // Se estiver usando um Composable

const resources = ref([]);
const editingResource = ref(null); // Objeto a ser editado. Se for null, é modo 'criar'.
const currentFilters = ref({});

// const { showNotification } = useNotification(); // Exemplo de uso de Composable

onMounted(() => {
  fetchResources();
});

// --- Lógica de Carregamento ---
const fetchResources = async (filters = {}) => {
  currentFilters.value = filters;
  try {
    const response = await resourceService.getAll(filters);
    resources.value = response.data;
  } catch (error) {
    // showNotification('Erro ao carregar recursos.', 'error');
    console.error(error);
  }
};

// --- Lógica de CRUD (Recurso Principal) ---
const handleResourceSave = async (resourceData) => {
  try {
    if (resourceData.id) {
      // Edição
      await resourceService.update(resourceData.id, resourceData);
      // showNotification('Recurso atualizado com sucesso!', 'success');
    } else {
      // Criação
      await resourceService.create(resourceData);
      // showNotification('Recurso criado com sucesso!', 'success');
    }
    editingResource.value = null; // Fecha o formulário
    fetchResources(currentFilters.value); // Recarrega a lista
  } catch (error) {
    // showNotification('Falha ao salvar recurso.', 'error');
    console.error(error);
  }
};

const startResourceEdit = (resource) => {
  editingResource.value = { ...resource }; // Usa cópia para evitar edição reativa direta
};

const deleteResource = async (resourceId) => {
  if (confirm('Tem certeza que deseja deletar este recurso?')) {
    try {
      await resourceService.remove(resourceId);
      // showNotification('Recurso deletado com sucesso!', 'success');
      fetchResources(currentFilters.value);
    } catch (error) {
      // showNotification('Falha ao deletar recurso.', 'error');
      console.error(error);
    }
  }
};

// --- Lógica de Sub-recurso (Para visualização em linha na lista) ---
const toggleSubresources = (resource) => {
  // Esta função deve controlar a exibição do SubResourceList para o item específico.
  // Exemplo: resource.showSubresources = !resource.showSubresources;
  console.log('Toggle subresources para:', resource.id);
};
</script>