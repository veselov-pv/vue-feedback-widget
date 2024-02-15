<template>
  <div class="app-wrapper">
    <Header />
    <Form />
    <Messages />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";
import Messages from "./components/Messages.vue";
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
