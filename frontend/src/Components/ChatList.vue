<script setup>
const props = defineProps(['chatData', 'isActive'])
import { Icon } from '@iconify/vue'
</script>

<template>
  <button v-bind:class="'container'.concat(props.isActive ? ' container--active' : '')">
    <img
      v-if="props.chatData.type === 'group'"
      v-bind:src="props.chatData.group.group_image"
      width="25px"
    />
    <div v-else class="icon_container">
      <Icon icon="mdi:user" width="100%" class="sidebar_profilePic_icon" />
    </div>

    <div class="detail_container">
      <h3 v-if="props.chatData.type === 'personal'">{{ props.chatData.participants[0].name }}</h3>
      <h3 v-else>{{ props.chatData.group.group_name }}</h3>
      <p v-if="props.chatData.type === 'group'">
        {{ props.chatData.participants.length }} participant
      </p>
      <p v-else>me:{{ props.chatData.messages[props.chatData.messages.length - 1].content }}</p>
    </div>
  </button>
</template>

<style scoped>
.container {
  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 5px;
  /* background-color: white; */
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.container:hover {
  background-color: white;
}

.container--active {
  background-color: white;
}

.container img {
  width: 52px;
  height: 52px;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
}

.icon_container {
  width: 52px;
  height: 52px;
  padding: 5px;
  border-radius: 100%;
  color: var(--primary-color);
  background-color: white;
}

.detail_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h3 {
  font-size: 18px;
}
</style>
