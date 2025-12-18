<script setup>
import NavigationSidebar from './Components/navigationSidebar.vue'
import InboxSidebar from './Components/InboxSidebar.vue'
import Chat from './Components/Chat.vue'
import { userData } from './stores/userData'
import { onBeforeMount, ref, watch } from 'vue'

const selectedChat = ref(null)
const isChatSelected = ref(false)
const selectedUserId = ref(null)
const isModalUserOpened = ref(true)
const changeSelectedChat = (selectedConv) => {
  selectedChat.value = selectedConv
}
watch(selectedChat, () => {
  isChatSelected.value = !isChatSelected.value
})

watch(
  () => userData.currentUser,
  () => {
    isModalUserOpened.value = false
    selectedChat.value = null
  },
)

const clearSelectedChat = (val) => {
  if (val) {
    selectedChat.value = null
    return
  }
  return
}

const changeUser = (e) => {
  e.preventDefault()
  if (!selectedUserId.value) return
  const searchUser = userData.findUser(selectedUserId.value)
  if (!searchUser) return
  userData.currentUser = searchUser
}

const openModalUser = () => {
  isModalUserOpened.value = true
}
</script>

<template>
  <div class="container">
    <NavigationSidebar @open-modal-user="openModalUser" />
    <InboxSidebar
      v-bind:current-user="userData.currentUser"
      @change-selected-chat="changeSelectedChat"
      v-bind:selected-chat="selectedChat"
      v-if="userData.currentUser"
    />
    <div :class="'chat_container '.concat(selectedChat !== null ? 'chat_show' : 'chat_collapse')">
      <Chat
        v-bind:current-user="userData.currentUser"
        v-bind:selected-chat="selectedChat"
        v-on:clear-selected-chat="clearSelectedChat"
      />
    </div>
    <div :class="'modal_changeuser '.concat(isModalUserOpened ? '' : 'modal_changeuser--collapse')">
      <form class="form_changeuser" @submit="changeUser">
        <div class="input_label_container">
          <h3>Change User</h3>
          <p>prototype sederhana untuk mensimulasikan authentikasi</p>
          <label for="user_id">User_list</label>
          <div class="userlist_container">
            <div class="user_container">
              <input
                type="radio"
                name="king customer"
                value="customer@mail.com"
                v-model="selectedUserId"
              />
              <label for="king customer">King customer</label>
            </div>
            <div class="user_container">
              <input
                type="radio"
                name="king customer"
                value="admin@mail.com"
                v-model="selectedUserId"
              />
              <label for="king customer">Admin</label>
            </div>
            <div class="user_container">
              <input
                type="radio"
                name="king customer"
                value="agent@mail.com"
                v-model="selectedUserId"
              />
              <label for="king customer">Agent</label>
            </div>
          </div>
          <button>Change</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: 'DMSans';
  src: url('/font/DMSans-VariableFont_opsz,wght.ttf');
}

* {
  --primary-color: #374957;
  --secondary-color: #c3cdd5;
  font-family: 'DMSans';
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

<style scoped>
.container {
  position: relative;
  display: flex;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

.modal_changeuser {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal_changeuser--collapse {
  display: none;
  width: 0%;
}

.form_changeuser {
  width: 400px;
  height: 200px;
  padding: 25px;
  background-color: white;
  border-radius: 15px;
}

.input_label_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 100%;
}

.input_label_container label {
  font-size: 14px;
  width: 200px;
  text-align: center;
}

.input_label_container input {
  font-size: 14px;
  padding-left: 5px;
  width: 200px;
  text-align: left;
}

.input_label_container p {
  font-size: 12px;
  width: 300px;
  text-align: center;
}
.input_label_container button {
  font-size: 12px;
  padding: 2px 5px;
  text-align: center;
}

.userlist_container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 10px 10px;
}

.user_container {
  width: 100%;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.user_container label {
  width: auto;
  font-size: 12px;
  text-align: left;
}
.user_container input {
  width: auto;
}

.chat_container {
  width: 100%;
  position: relative;
}

@media screen and (max-width: 600px) {
  .container {
    flex-direction: column;
  }
  .chat_container {
    position: absolute;
    transition: all;
    transition-duration: 800ms;
  }
  .chat_show {
    left: 0;
    background-color: white;
    width: 100%;
    height: 100%;
  }
  .chat_collapse {
    left: 100%;
    width: 100%;
  }
  .form_changeuser {
    width: 300px;
  }
}

@media (min-width: 600px) and (max-width: 1180px) {
  .chat_container {
    position: absolute;
    transition: all;
    transition-duration: 800ms;
  }
  .chat_show {
    left: 0;
    background-color: white;
    width: 100%;
    height: 100%;
  }
  .chat_collapse {
    left: 100%;
    width: 100%;
  }
}
</style>
