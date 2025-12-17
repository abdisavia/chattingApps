<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import PopupAttachment from './popupAttachment.vue'
const props = defineProps(['isAttachmentOpened'])
const emit = defineEmits(['changeAttachmentState'])
</script>

<template>
  <form action="" class="messageForm_container">
    <div class="messageForm_textPlus_container">
      <input type="text" placeholder="Type to add your message" />
      <div>
        <button
          class="messageForm_icon_container messageForm_plusIcon_container"
          @click="
            (e) => {
              e.preventDefault()
              emit('changeAttachmentState', !isAttachmentOpened)
            }
          "
        >
          <Icon icon="ic:round-plus" class="plus_icon" />
        </button>
        <PopupAttachment v-bind:is-opened="props.isAttachmentOpened" />
      </div>
    </div>
    <button class="messageForm_icon_container messageForm_sendIcon_container">
      <Icon icon="ri:send-plane-fill" class="send_icon" />
    </button>
  </form>
</template>

<style scoped>
.messageForm_container {
  display: flex;
  padding: 10px 0px;
  height: 64px;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.messageForm_textPlus_container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 660px;
  height: 100%;
  transition-duration: 200ms;
  transition-property: all;
}

.messageForm_textPlus_container input {
  width: 100%;
  height: 100%;
  padding: 0px 15px;
  border: none;
}

.messageForm_container button {
  border: none;
  cursor: pointer;
}

.plus_icon {
  font-size: 30px;
}

.send_icon {
  font-size: 25px;
  color: white;
}

.messageForm_icon_container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.messageForm_sendIcon_container {
  background-color: var(--primary-color);
  padding: 5px;
  width: 48px;
  height: 48px;
  border-radius: 100%;
}

.messageForm_plusIcon_container {
  background-color: white;
  padding: 2px;
  width: auto;
  height: auto;
}
</style>
