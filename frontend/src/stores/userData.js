import { reactive } from 'vue'
import user from './user.json'

const findUser = (user_id) => {
  console.log(user)
  return user.find((curr, idx) => curr.user_id === user_id)
}

export const userData = reactive({
  data: user,
  findUser: findUser,
})
