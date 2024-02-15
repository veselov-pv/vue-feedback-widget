<template>
  <div class="messages">
    <transition-group name="p-message" tag="div">
      <Message
        v-for="msg of messages"
        :key="msg.id"
        :severity="msg.severity"
        :sticky="false"
        :life="3000"
        :closable="false"
        >{{ msg.content }}</Message
      >
    </transition-group>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Message from "primevue/message";

export default {
  components: {
    Message,
  },

  setup() {
    const store = useStore();

    return {
      messages: computed(() => store.state.messages.messages),
    };
  },
};
</script>

<style scoped>
.messages {
  position: fixed;
  top: 0;
}
</style>