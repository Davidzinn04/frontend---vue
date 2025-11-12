<template>
  <div v-if="message" :class="['notification', type]">
    {{ message }}
    <button @click="clearNotification">X</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Substituir por lógica de Composable ou Pinia Store
const message = ref(null); 
const type = ref('info'); 

// Exemplo de função mock, você usará a função do seu Composable/Store
const clearNotification = () => {
  message.value = null;
};

// Exemplo de como um Composable (useNotification) poderia ser:
/*
import { useNotification } from '@/composables/useNotification';
const { notificationMessage, notificationType, clearNotification } = useNotification();
*/
</script>

<style scoped>
.notification {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notification.success {
  background-color: #4CAF50;
}
.notification.error {
  background-color: #f44336; /* Requisito: Mensagens de erro/aviso (+2 pts) */
}
</style>