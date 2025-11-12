<template>
  <form @submit.prevent="handleSubmit">
    <h3>{{ isEditing ? 'Editar' : 'Criar' }} Recurso</h3>
    
    <input type="text" v-model="form.titulo" placeholder="Título" required />
    <input type="text" v-model="form.autor" placeholder="Autor" required />
    
    <button type="submit">{{ isEditing ? 'Salvar Edição' : 'Criar Recurso' }}</button>
    <button type="button" @click="$emit('cancel')">Cancelar</button>

    <p v-if="validationError" style="color: red;">{{ validationError }}</p>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  model: {
    type: Object, // Objeto do Recurso para edição ou null para criação
    default: null,
  },
});

const emit = defineEmits(['save', 'cancel']);

const initialForm = {
  titulo: '',
  autor: '',
  // ... outros campos
};

const form = ref({ ...initialForm });
const validationError = ref('');

// Determina o modo (Criação ou Edição)
const isEditing = computed(() => !!props.model && !!props.model.id);

// Observa a prop 'model' para carregar os dados no formulário
watch(() => props.model, (newModel) => {
  if (newModel) {
    // Modo Edição: Copia os dados
    form.value = { ...newModel };
  } else {
    // Modo Criação: Reseta o formulário
    form.value = { ...initialForm };
    validationError.value = '';
  }
}, { immediate: true });

// --- Lógica de Validação e Envio ---
const validateForm = () => {
  validationError.value = '';
  if (!form.value.titulo.trim() || !form.value.autor.trim()) {
    validationError.value = 'Todos os campos obrigatórios devem ser preenchidos.';
    return false;
  }
  return true;
};

const handleSubmit = () => {
  if (!validateForm()) {
    // Exibe mensagem de erro de validação (Requisito +2 pts)
    return;
  }
  
  // Emite o evento 'save' com os dados do formulário
  // O componente pai (App.vue) saberá se é criação ou edição pela presença do 'id'
  emit('save', form.value);
  
  // Opcional: Reseta o formulário após salvar no modo 'criação'
  if (!isEditing.value) {
     form.value = { ...initialForm };
  }
};
</script>