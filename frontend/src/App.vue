<script setup>
import NavigationSidebar from './Components/navigationSidebar.vue'
import InboxSidebar from './Components/InboxSidebar.vue'
import Chat from './Components/Chat.vue'
import { userData } from './stores/userData'
import { conversationData } from './stores/conversationData'
import { onBeforeMount, ref } from 'vue'

onBeforeMount(() => {
  userData.currentUser = userData.findUser('admin@mail.com')
})

const selectedChat = ref()
const changeSelectedChat = (selectedConv) => {
  selectedChat.value = selectedConv
}
</script>

<template>
  <div class="container">
    <NavigationSidebar />
    <InboxSidebar
      v-bind:current-user="userData.currentUser"
      @change-selected-chat="changeSelectedChat"
      v-bind:selected-chat="selectedChat"
    />
    <Chat v-bind:current-user="userData.currentUser" v-bind:selected-chat="selectedChat" />
  </div>
</template>

<style>
@font-face {
  font-family: 'DMSans';
  src: url('/font/DMSans-VariableFont_opsz,wght.ttf');
}

* {
  --primary-color: #374957;
  --secondary-color: #c3cdd5;
  font-family: 'DMSans';
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

<style scoped>
.container {
  display: flex;
}
</style>
