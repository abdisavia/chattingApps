<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <aside class="sidebar_container">
    <a class="sidebar_profilePic">
      <Icon icon="mdi:user" width="100%" class="sidebar_profilePic_icon" />
    </a>
    <div class="height_full">
      <a class="sidebar_icon_container sidebar_icon_container--active">
        <Icon icon="ph:chats-fill" class="sidebar_icon icon_active"></Icon>
      </a>
    </div>
    <div>
      <a class="sidebar_icon_container">
        <Icon icon="lets-icons:setting-fill" class="sidebar_icon icon_deactive"></Icon>
      </a>
      <a class="sidebar_icon_container">
        <Icon icon="humbleicons:logout" class="sidebar_icon icon_deactive"></Icon>
      </a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100px;
  height: 100vh;
  padding: 20px 25px;
  background-color: var(--primary-color);
}

.sidebar_profilePic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: fit-content;
  padding: 12px;
  border-radius: 100%;
  background-color: white;
}

.sidebar_profilePic_icon {
  width: 100%;
  color: var(--primary-color);
  height: fit-content;
}

.sidebar_icon_container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: fit-content;
  padding: 10px;
  border-radius: 100%;
  /* border: 1px solid white; */
}

.sidebar_icon_container--active {
  background-color: white;
}

.sidebar_icon_container:hover {
  background-color: white;
}

.height_full {
  height: 100%;
}

.sidebar_icon {
  width: 100%;
  height: auto;
}

.icon_active {
  color: var(--primary-color);
}

.icon_deactive {
  color: white;
}

.sidebar_icon_container:hover .sidebar_icon {
  color: var(--primary-color);
}
</style>
