<script setup>
import { selectedChat } from '@/stores/selectedChat'
import { Icon } from '@iconify/vue'
const props = defineProps(['currentUser'])
</script>

<template>
  <header class="header_chat_container">
    <img
      v-bind:src="selectedChat.data.group.group_image"
      alt=""
      v-if="selectedChat.data.type === 'group'"
    />
    <Icon icon="mdi:user" width="100%" class="profilePic_icon" v-else />
    <div>
      <h2 v-if="selectedChat.data.type === 'group'">{{ selectedChat.data.group.group_name }}</h2>
      <h2 v-else>
        {{
          selectedChat.data.participants.find(
            (curr, idx) => curr.user_id !== props.currentUser.user_id,
          ).name
        }}
      </h2>
      <p>{{ selectedChat.data.participants.length }} participant</p>
    </div>
  </header>
</template>

<style scoped>
.header_chat_container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header_chat_container img {
  width: 76px;
  height: 76px;
  object-fit: cover;
  border-radius: 100%;
}

.profilePic_icon {
  width: 50px;
  color: var(--primary-color);
}
</style>
