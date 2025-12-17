<script setup>
import HeaderChat from './HeaderChat.vue'
import BubbleText from './BubbleText.vue'
import MessageForm from './MessageForm.vue'
import { conversationData } from '@/stores/conversationData'
import { messageData } from '@/stores/messageData'
import { ref, onMounted, nextTick, watch, onBeforeMount, onUpdated } from 'vue'

const props = defineProps(['currentUser', 'selectedChat'])

const chatContainer = ref(null)
const isAttachmentOpened = ref()
const scrollToBottom = async () => {}

onMounted(scrollToBottom)
watch(
  () => props.selectedChat?.messages,
  async (messages) => {
    if (!messages || !messages.length) return
    await nextTick()
    if (!chatContainer.value) return
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  },
  { deep: true },
)

watch(
  () => props.selectedChat,
  () => {
    isAttachmentOpened.value = false
  },
)

const changeAttachmentState = (newState) => {
  isAttachmentOpened.value = newState
}
</script>

<template>
  <div v-if="props.selectedChat === undefined">
    <h1>Select Chat first</h1>
  </div>
  <div v-else class="Chat_container">
    <HeaderChat v-bind:current-user="props.currentUser" v-bind:selected-chat="props.selectedChat" />
    <div class="conversation_container" ref="chatContainer">
      <div class="message_container">
        <BubbleText
          v-for="message in props.selectedChat?.messages"
          v-bind:message="messageData.findMessage(message)"
          v-bind:current-user="props.currentUser"
        />
      </div>
    </div>
    <MessageForm
      @change-attachment-state="changeAttachmentState"
      :is-attachment-opened="isAttachmentOpened"
    />
  </div>
</template>

<style scoped>
.Chat_container {
  padding: 25px;
  width: 100%;
  height: 100vh;
}

.message_container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 20px;
  height: auto;
}

.conversation_container {
  display: grid;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 480px;
  overflow-y: hidden;
}

.conversation_container:hover {
  overflow-y: auto;

  scroll-behavior: smooth;
}

.conversation_container::-webkit-scrollbar {
  display: block;
  background: none;
  width: 2px;
}

.conversation_container::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
}
</style>
