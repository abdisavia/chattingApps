<script setup></script>

<template>
  <div class="chatlist_filterList_container">
    <ul class="filterList_container">
      <li>
        <a href="" class="filterList_item">Unread</a>
      </li>
      <li>
        <a href="" class="filterList_item">Read</a>
      </li>
      <li>
        <a href="" class="filterList_item">Group Chat</a>
      </li>
      <li>
        <a href="" class="filterList_item">Personal Chat</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.filterList_container {
  display: flex;
  gap: 12px;
  list-style: none;
  margin: 10px 0px;
  width: max-content;
}

.filterList_item {
  display: block;
  padding: 10px 15px;
  background-color: white;
  border-radius: 40px;
  overflow: hidden;
}

a {
  text-decoration: none;
  color: black;
}

.chatlist_filterList_container {
  width: 100%;
  height: 73px;
  overflow-x: hidden;
  padding: 5px 0px;
  margin-bottom: 10px;
}

.chatlist_filterList_container:hover {
  overflow-x: scroll;
}

.chatlist_filterList_container::-webkit-scrollbar {
  display: block;
  background: none;
  height: 2px;
}

.chatlist_filterList_container::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 25px;
}
</style>
