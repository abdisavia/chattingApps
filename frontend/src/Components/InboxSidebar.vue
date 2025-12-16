<script setup>
import ChatList from './ChatList.vue'
import data from '@/stores/data.json'
import Filterlist from './Filterlist.vue'
import { selectedChat } from '@/stores/selectedChat.js'
console.log(data)
</script>

<template>
  <aside class="chatlist_container">
    <h1>Inbox</h1>
    <Filterlist />
    <ul class="chatData_container">
      <li v-for="(dat, idx) in data">
        <ChatList
          v-bind:chat-data="dat"
          v-bind:is-active="idx == 0 ? true : false"
          v-bind:key="dat.conversation_id"
          v-on:click="
            () => {
              selectedChat.changeData(dat)
              console.log(Object.keys(selectedChat.data))
            }
          "
        />
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.chatlist_container {
  width: 462px;
  padding: 20px 25px;
  background-color: var(--secondary-color);
}

h1 {
  font-family: 'DMSans';
  font-size: 32px;
  color: var(--primary-color);
}

.chatData_container {
  list-style: none;
}

.chatData_container li {
  margin-bottom: 15px;
}
</style>
