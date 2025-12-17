import { reactive } from 'vue'
import group from './group.json'

const findGroup = (groupId) => {
  return groupData.data.find((curr, idx) => curr.group_id == groupId)
}
export const groupData = reactive({
  data: group,
  findGroup: findGroup,
})
