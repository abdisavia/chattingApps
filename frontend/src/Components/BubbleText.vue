<script setup>
import { userData } from '@/stores/userData'
import { computed, onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { messageData } from '@/stores/messageData'
import { VueFilesPreview } from 'vue-files-preview'
const props = defineProps(['message', 'currentUser'])
const BASE_URL = import.meta.env.VITE_API_URL

const formattedTime = computed(() => {
  const date = new Date(props.message.created_at)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
})

const imageUrl = computed(() => {
  console.log(`${BASE_URL}${props.message.attachment[0]}`)
  return `${BASE_URL}${props.message.attachment[0]}`
})
</script>

<template>
  <div
    :class="
      'bubbleText_container '.concat(
        props.message.sender_id !== props.currentUser.user_id ? 'reciever' : 'sender',
      )
    "
  >
    <div
      :class="
        'bubbleText_timeName_container '.concat(
          props.message.sender_id !== props.currentUser.user_id ? 'reciever' : 'sender',
        )
      "
    >
      <small>{{ formattedTime }}</small>
      <p>{{ userData.findUser(props.message.sender_id)?.name }}</p>
    </div>
    <div
      :class="
        'messageContainer '.concat(
          props.message.sender_id !== props.currentUser.user_id
            ? 'reciever_message_color'
            : 'sender_message_color',
        )
      "
    >
      <VueFilesPreview
        v-if="props.message.type === 'image'"
        :url="imageUrl"
        width="100%"
        height="150px"
      />
      <p v-if="props.message.message">{{ props.message.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.bubbleText_container {
  display: grid;
  grid-template-rows: 0.3fr 1fr;
  margin-bottom: 10px;
  gap: 5px;
}

.sender {
  justify-content: end;
  align-items: end;
}

.reciever {
  justify-content: start;
  align-items: end;
}

.reciever small {
  order: 2;
}

.reciever_message_color {
  background-color: var(--secondary-color);
  color: black;
}
.sender_message_color {
  background-color: var(--primary-color);
  color: white;
}

.bubbleText_timeName_container {
  display: flex;
  align-items: end;
  width: 100%;
  gap: 4px;
  font-weight: 500;
}

.bubbleText_timeName_container p {
  font-size: 14px;
}

.bubbleText_timeName_container small {
  font-weight: 300;
  font-size: 14px;
  direction: ltr;
}

.messageContainer {
  padding: 13px 23px;
  font-weight: 400;
  font-size: 18px;
  border-radius: 12px;
  max-width: 400px;
}

@media screen and (max-width: 600px) {
  .messageContainer {
    max-width: 250px;
  }
}

@media (min-width: 600px) and (max-width: 1180px) {
  .messageContainer {
    max-width: 300px;
  }
}
</style>
