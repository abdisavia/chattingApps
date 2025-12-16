import { reactive } from 'vue'

const changeSelectedData = (selectedDat) => {
  selectedChat.data = selectedDat
}

export const selectedChat = reactive({
  data: {},
  changeData: changeSelectedData,
})
