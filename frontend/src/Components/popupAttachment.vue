<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { VueFilesPreview } from 'vue-files-preview'
const props = defineProps(['isOpened'])
const previewSelected = ref({
  url: '',
  type: '',
})
const attachmentFiles = ref([])

const attachmentEvent = (e) => {
  e.preventDefault()
  const files = e.target.files
  if (attachmentFiles.length > 0) {
    attachmentFiles.value = []
  }
  attachmentFiles.value.push({
    preview: URL.createObjectURL(files[0]),
    file: files[0],
  })
  console.log(attachmentFiles.value)
}

const deleteFile = (e) => {
  e.preventDefault()
  attachmentFiles.value.splice(0, 1)
}
</script>

<template>
  <div
    :class="
      'popupAttachment '.concat(
        props.isOpened ? 'popupAttachment--opened' : 'popupAttachment--closed',
      )
    "
  >
    <div class="popupAttach_preview_container" v-if="attachmentFiles.length > 0">
      <div class="preview_img">
        <img
          :src="attachmentFiles[0].preview"
          alt=""
          v-if="['image/jpeg', 'image/png', 'image/jpg'].includes(attachmentFiles[0].file.type)"
        />
        <video
          :src="attachmentFiles[0].preview"
          alt=""
          v-else-if="attachmentFiles[0].file.type === 'video/mp4'"
          autoplay
        />
        <VueFilesPreview
          :file="attachmentFiles[0].file"
          v-else-if="attachmentFiles[0].file.type === 'application/pdf'"
        />
      </div>
      <button class="preview_delete_icon" v-if="attachmentFiles.length > 0" @click="deleteFile">
        <Icon icon="material-symbols:delete" />
      </button>
    </div>
    <div class="popupAttach_fileOptions">
      <button class="attachment_icon_container">
        <input type="file" accept="image/*" name="uploadImage" @change="attachmentEvent" />
        <div>
          <Icon icon="material-symbols:imagesmode" class="attachment_Icon image_icon_color" />
        </div>
        <small>Image</small>
      </button>
      <button class="attachment_icon_container">
        <input type="file" accept="video/*" name="uploadVideo" @change="attachmentEvent" />
        <div>
          <Icon icon="mingcute:video-fill" class="attachment_Icon video_icon_color" />
        </div>
        <small>Video</small>
      </button>
      <button class="attachment_icon_container">
        <input type="file" accept=".pdf" name="uploadPDF" @change="attachmentEvent" />
        <div>
          <Icon icon="basil:document-solid" class="attachment_Icon" />
        </div>
        <small>Document</small>
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes popupAttachmentAnimation {
  0% {
    display: none;
    width: 0;
    height: 0;
    padding: 0px;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
  }
  100% {
    border-radius: 10px;
    width: fit-content;
    height: fit-content;
    display: grid;
    grid-template-rows: 1fr;
    gap: 30px;
  }
}
@keyframes popupAttachmentAnimationClosed {
  100% {
    display: none;
    width: 0;
    height: 0;
    padding: 0px;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
  }
  0% {
    border-radius: 10px;
    width: fit-content;
    height: fit-content;
    display: grid;
    grid-template-rows: 1fr;
    gap: 30px;
  }
}

.popupAttachment {
  position: absolute;
  padding: 10px;
  background-color: var(--primary-color);
  bottom: 35px;
  right: 0;
  overflow: hidden;
}

.popupAttachment--opened {
  animation-name: popupAttachmentAnimation;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
}

.popupAttachment--closed {
  animation-name: popupAttachmentAnimationClosed;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
}

.popupAttachment button {
  border: none;
}

.popupAttach_preview_container {
  justify-content: center;
  align-items: center;
}

.preview_img {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-width: 250px;
  max-height: 250px;
  border-radius: 8px;
}
.preview_img img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.preview_delete_icon {
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 25px;
  height: 25px;
  font-size: 15px;
  border-radius: 100%;
  top: 20px;
  right: 20px;
  background-color: white;
  color: red;
}

.popupAttach_fileOptions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.popupAttach_fileOptions button {
  background: none;
}

.popupAttachment button input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  border: 2px solid black;
  cursor: pointer;
}

.attachment_Icon {
  padding: 8px;
  background-color: rgba(37, 37, 39, 0.733);
  border-radius: 10px;
  border: 0.5px solid rgb(37, 37, 39);
  width: 50px;
  height: auto;
}

.image_icon_color {
  color: blueviolet;
}

.video_icon_color {
  color: rgb(240, 19, 129);
}

.attachment_icon_container {
  position: relative;
  color: whitesmoke;
  text-align: center;
  font-size: 15px;
}

.preview_img video {
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
