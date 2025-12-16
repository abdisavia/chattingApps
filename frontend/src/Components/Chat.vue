<script setup>
import HeaderChat from './HeaderChat.vue'
import BubbleText from './BubbleText.vue'
import MessageForm from './MessageForm.vue'
import { selectedChat } from '@/stores/selectedChat'
const currentUser = {
  user_id: 'admin@mail.com',
  name: 'Admin',
}
console.log(selectedChat.data)
</script>

<template>
  <div v-if="Object.keys(selectedChat.data) == 0">
    <h1>Select Chat first</h1>
  </div>
  <div v-else class="Chat_container">
    <HeaderChat v-bind:current-user="currentUser" />
    <div class="conversation_container">
      <div class="bubbleText_container">
        <BubbleText
          v-for="message in selectedChat.data.messages"
          v-bind:message="message"
          v-bind:current-user="currentUser"
        />
      </div>
    </div>
    <MessageForm />
  </div>
</template>

<style scoped>
.Chat_container {
  padding: 25px;
  width: 100%;
  height: 100vh;
  border: 2px solid black;
}

.bubbleText_container {
  width: 100%;
  height: auto;
}

.conversation_container {
  display: flex;
  align-items: end;
  height: 400px;
  border: 2px solid black;
}
</style>
