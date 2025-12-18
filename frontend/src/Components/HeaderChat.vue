<script setup>
import { conversationData } from '@/stores/conversationData'
import { groupData } from '@/stores/groupData'
import { userData } from '@/stores/userData'
import { Icon } from '@iconify/vue'
const props = defineProps(['currentUser', 'selectedChat'])
const emits = defineEmits(['clearSelectedChat'])
</script>

<template>
  <header class="header_chat_container">
    <button class="backIcon_container">
      <Icon
        icon="weui:arrow-filled"
        class="backIcon"
        v-on:click="
          (e) => {
            e.preventDefault()
            emits('clearSelectedChat', true)
          }
        "
      />
    </button>
    <img
      v-bind:src="groupData.findGroup(props.selectedChat.group).group_image"
      alt=""
      v-if="props.selectedChat.type === 'group'"
    />
    <Icon icon="mdi:user" width="100%" class="profilePic_icon" v-else />
    <div>
      <h2 v-if="props.selectedChat.type === 'group'">
        {{ groupData.findGroup(props.selectedChat.group).group_name }}
      </h2>
      <h2 v-else>
        {{
          userData.findUser(
            props.selectedChat.participants.find((curr, idx) => curr !== props.currentUser.user_id),
          ).name
        }}
      </h2>
      <p>
        {{ props.selectedChat.participants.length }}
        participant
      </p>
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
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100%;
}

.profilePic_icon {
  width: 50px;
  height: 50px;
  color: var(--primary-color);
}

.backIcon_container {
  display: none;
}
@media screen and (max-width: 600px) {
  .backIcon_container {
    display: flex;
    border: none;
    background-color: white;
  }
  .backIcon {
    transform: rotate(180deg);
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 100%;
  }
}

@media (min-width: 600px) and (max-width: 1280px) {
  .backIcon_container {
    display: flex;
    border: none;
    background-color: white;
  }
  .backIcon {
    transform: rotate(180deg);
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 100%;
  }
}
</style>
