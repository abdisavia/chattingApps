<script setup>
import ChatList from './ChatList.vue'
// import data from '@/stores/data.json'
import Filterlist from './Filterlist.vue'
import { conversationData } from '@/stores/conversationData'
const emit = defineEmits(['changeSelectedChat'])
const props = defineProps(['currentUser', 'selectedChat'])

const handleSelectedChange = (selectedConv) => {
  emit('changeSelectedChat', selectedConv)
}
</script>

<template>
  <aside class="chatlist_container">
    <h1>Inbox</h1>
    <Filterlist />
    <ul class="chatData_container">
      <li v-for="(dat, idx) in conversationData.data">
        <ChatList
          v-bind:chat-data="dat"
          v-bind:is-active="
            dat.conversation_id == props.selectedChat?.conversation_id ? true : false
          "
          v-bind:key="dat.conversation_id"
          v-on:click="handleSelectedChange(dat)"
          v-bind:current-user="props.currentUser"
          v-show="
            dat.participants.find((curr, idx) => curr == props.currentUser.user_id) ? true : false
          "
        />
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.chatlist_container {
  width: 500px;
  padding: 20px 25px;
  background-color: var(--secondary-color);
}

@media screen and (max-width: 600px) {
  .chatlist_container {
    width: 100%;
    padding: 20px 16px;
    background-color: var(--secondary-color);
    min-height: 100vh;
  }
}

@media (min-width: 768px) and (max-width: 1180px) {
  .chatlist_container {
    width: 100%;
    padding: 20px 16px;
    background-color: var(--secondary-color);
    min-height: 100vh;
  }
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
