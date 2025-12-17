import { reactive } from 'vue'
import message from './message.json'

const findMessage = (messageId) => {
  return messageData.data.find((curr, idx) => curr.message_id === messageId)
}

export const messageData = reactive({
  data: message,
  findMessage: findMessage,
})
