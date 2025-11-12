<template>
  <form @submit.prevent="handleSubmit" class="subresource-form">
    <h5>{{ isEditing ? 'Editar' : 'Adicionar' }} Comentário</h5>
    
    <textarea v-model="form.conteudo" placeholder="Conteúdo do comentário" required></textarea>
    <input type="text" v-model="form.autor" placeholder="Seu nome" required />
    
    <button type="submit">{{ isEditing ? 'Salvar Comentário' : 'Publicar' }}</button>
    <button type="button" @click="$emit('cancel')">Cancelar</button>

    <p v-if="validationError" style="color: red; font-size: small;">{{ validationError }}</p>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import subresourceService from '../services/subresourceService';
// import { useNotification } from '@/composables/useNotification';

const props = defineProps({
  resourceId: {
    type: [Number, String],
    required: true,
  },
  model: {
    type: Object, // Sub-recurso para edição, ou objeto vazio/null para criação
    default: null,
  },
});

const emit = defineEmits(['save', 'cancel']);

const initialForm = {
  conteudo: '',
  autor: '',
  resourceId: props.resourceId,
};

const form = ref({ ...initialForm });
const validationError = ref('');
// const { showNotification } = useNotification();

const isEditing = computed(() => !!props.model && !!props.model.id);

watch(() => props.model, (newModel) => {
  if (newModel && newModel.id) {
    // Modo Edição
    form.value = { ...newModel };
  } else {
    // Modo Criação/Reset
    form.value = { ...initialForm };
    validationError.value = '';
  }
}, { immediate: true, deep: true });

const validateForm = () => {
  validationError.value = '';
  if (!form.value.conteudo.trim() || !form.value.autor.trim()) {
    validationError.value = 'Conteúdo e autor são obrigatórios.';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  try {
    if (isEditing.value) {
      await subresourceService.update(form.value.id, form.value);
      // showNotification('Comentário atualizado.', 'success');
    } else {
      await subresourceService.create({ ...form.value, resourceId: props.resourceId });
      // showNotification('Comentário adicionado.', 'success');
    }
    emit('save', form.value);
  } catch (error) {
    // showNotification('Falha ao salvar comentário.', 'error');
    console.error(error);
  }
};
</script>