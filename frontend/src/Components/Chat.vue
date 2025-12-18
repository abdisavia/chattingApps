<script setup>
import HeaderChat from './HeaderChat.vue'
import BubbleText from './BubbleText.vue'
import MessageForm from './MessageForm.vue'
import { conversationData } from '@/stores/conversationData'
import { Icon } from '@iconify/vue'
import { messageData } from '@/stores/messageData'
import { ref, onMounted, nextTick, watch, onBeforeMount, onUpdated } from 'vue'

const props = defineProps(['currentUser', 'selectedChat'])
const emits = defineEmits(['clearSelectedChat'])
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
  <div v-if="props.selectedChat === null" class="initialView_container">
    <Icon icon="gridicons:chat" class="initialView_icon" />
    <h3>Please select a chat</h3>
  </div>
  <div v-else class="Chat_container">
    <HeaderChat
      v-bind:current-user="props.currentUser"
      v-bind:selected-chat="props.selectedChat"
      v-on:clear-selected-chat="(val) => emits('clearSelectedChat', val)"
      class="header"
    />
    <div class="conversation_container" ref="chatContainer">
      <div class="message_container">
        <BubbleText
          v-for="message in props.selectedChat?.messages"
          v-bind:message="messageData.findMessage(message)"
          v-bind:current-user="props.currentUser"
        />
      </div>
    </div>
    <div class="footer">
      <MessageForm
        @change-attachment-state="changeAttachmentState"
        :is-attachment-opened="isAttachmentOpened"
      />
    </div>
  </div>
</template>

<style scoped>
.initialView_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: grey;
  width: 100%;
  height: 100vh;
}
.initialView_icon {
  font-size: 100px;
}
.Chat_container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 25px;
  width: 100%;
  height: 100vh;
  overflow: auto;
}

.header {
  position: absolute;
  width: 100%;
  background-color: white;
  padding: 20px 16px;
  top: 0;
  left: 0px;
  /* height: 20vh; */
}

.footer {
  position: absolute;
  /* height: 20vh; */
  bottom: 0px;
  left: 0;
  width: 100%;
  background-color: white;
}

.message_container {
  /* display: flex; */
  width: 100%;
  gap: 20px;
  height: auto;
  margin-bottom: auto;
}

.conversation_container {
  display: flex;
  justify-content: end;
  align-items: start;
  width: 100%;
  height: 70%;
  overflow-y: auto;
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

@media screen and (max-width: 600px) {
  .initialView_container {
    height: 100vh;
  }
  .Chat_container {
    padding: 16px;
    overflow: hidden;
    height: 100%;
  }
  .conversation_container {
    height: 70vh;
    overflow: scroll;
  }
  .message_container {
    height: 500px;
  }
}

@media screen and (max-height: 568px) {
  .conversation_container {
    height: 67vh;
  }
}
</style>
