<script setup>
import { userData } from '@/stores/userData'
const props = defineProps(['message', 'currentUser'])

const date = new Date()
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
      <small>{{ date.getUTCHours(props.message.created_at) }}:{{ date.getUTCMinutes() }}</small>
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
      <p v-if="props.message.message_type === 'text'">{{ props.message.content }}</p>
      <img v-if="type === 'image'" v-bind:src="props.imageUrl" />
    </div>
  </div>
</template>

<style scoped>
.bubbleText_container {
  display: grid;
  grid-template-rows: 0.3fr 1fr;
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

.bubbleText_timeName_container small {
  font-size: 12px;
  font-weight: 300;
  direction: ltr;
}

.messageContainer {
  padding: 13px 23px;
  font-weight: 400;
  font-size: 14px;
  border-radius: 12px;
  max-width: 350px;
}
</style>
