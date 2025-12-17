import { reactive } from 'vue'
import conversation from './conversation.json'

const findConversation = (conversationID) => {
  return conversationData.data.find((curr, idx) => curr.conversation_id == conversationID)
}

export const conversationData = reactive({
  data: conversation,
  findConversation: findConversation,
})
