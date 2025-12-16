<script setup>
import NavigationSidebar from './Components/navigationSidebar.vue'
import InboxSidebar from './Components/InboxSidebar.vue'
import Chat from './Components/Chat.vue'
import { selectedChat } from './stores/selectedChat.js'
console.log(selectedChat)
</script>

<template>
  <div class="container">
    <NavigationSidebar />
    <InboxSidebar />
    <Chat />
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
