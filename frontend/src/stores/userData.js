import { reactive } from 'vue'
import user from './user.json'

const findUser = (user_id) => {
  return user.find((curr, idx) => curr.user_id === user_id)
}

export const userData = reactive({
  data: user,
  currentUser: {},
  findUser: findUser,
})
