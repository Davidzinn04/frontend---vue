<template>
  <div class="subresource-list">
    <h4>Sub-Recursos (Comentários)</h4>
    <p v-if="loading">Carregando comentários...</p>
    <p v-else-if="!subresources.length">Nenhum comentário encontrado.</p>

    <ul>
      <li v-for="item in subresources" :key="item.id">
        "{{ item.conteudo }}" - por <strong>{{ item.autor }}</strong>
        <button @click="startSubresourceEdit(item)">Editar</button>
        <button @click="deleteSubresource(item.id)">Excluir</button>
      </li>
    </ul>

    <button @click="editingSubresource = {}" v-if="!editingSubresource">Adicionar Comentário</button>
    <SubResourceForm 
      v-if="editingSubresource || creatingNew"
      :resourceId="resourceId" 
      :model="editingSubresource" 
      @save="handleSubresourceSave" 
      @cancel="editingSubresource = null" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import subresourceService from '../services/subresourceService'; // <- use import default

const props = defineProps({
  resourceId: {
    type: [Number, String],
    required: true,
  },
});

const subresources = ref([]);
const editingSubresource = ref(null);
const loading = ref(false);

const fetchSubresources = async (id) => {
  if (!id) return;
  loading.value = true;
  try {
    const response = await subresourceService.getByResourceId(id);
    subresources.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchSubresources(props.resourceId));

const handleSubresourceSave = async (data) => {
  editingSubresource.value = null; // Fecha o formulário
  fetchSubresources(props.resourceId); // Recarrega a lista
};

const startSubresourceEdit = (item) => {
  editingSubresource.value = { ...item };
};

const deleteSubresource = async (id) => {
  if (confirm('Deseja excluir este sub-recurso?')) {
    try {
      await subresourceService.remove(id);
      fetchSubresources(props.resourceId);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>