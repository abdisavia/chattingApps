<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { VueFilesPreview } from 'vue-files-preview'
const props = defineProps(['isOpened'])
const previewSelected = ref({
  url: '',
  type: '',
})
const attachmentFiles = ref({
  image: [],
  video: [],
  pdf: {},
})

const attachmentEvent = (e) => {
  e.preventDefault()
  const files = e.target.files
  console.log(files[0].type)
  if (files[0].type === 'image/jpeg') {
    saveImage(files)
  } else if (files[0].type === 'video/mp4') {
    saveVideo(files)
  } else if (files[0].type === 'application/pdf') {
    savePDF(files)
  }
}

const saveImage = (files) => {
  for (let i = 0; i < files.length; i++) {
    attachmentFiles.value.image.push({ file: files[i], preview: URL.createObjectURL(files[i]) })
  }
}

const saveVideo = (files) => {
  for (let i = 0; i < files.length; i++) {
    attachmentFiles.value.video.push({ file: files[i], preview: URL.createObjectURL(files[i]) })
  }
}

const savePDF = (files) => {
  attachmentFiles.value.pdf = { file: files[0], preview: URL.createObjectURL(files[0]) }
  console.log(attachmentFiles.value.pdf)
}

// const deleteFile = (e) => {
//   e.preventDefault()
//   let indexFiles
//   console.log(previewSelected.value.type)
//   if (previewSelected.value.type === 'image') {
//     indexFiles = deleteImageFile()
//   } else if (previewSelected.value.type === 'video') {
//     indexFiles = deleteVideoFile()
//   }
//   if (indexFiles === null) return
//   updatePreviewSelected(indexFiles)
// }

// const deleteImageFile = () => {
//   const indexFiles = attachmentFiles.value.image.findIndex(
//     (curr, idx) => curr.preview === previewSelected.value.url,
//   )
//   if (indexFiles == -1) return
//   attachmentFiles.value.image.splice(indexFiles, 1)
//   return indexFiles
// }

// const deleteVideoFile = () => {
//   const indexFiles = attachmentFiles.value.video.findIndex(
//     (curr, idx) => curr.preview === previewSelected.value.url,
//   )
//   if (indexFiles == -1) return
//   attachmentFiles.value.video.splice(indexFiles, 1)
// }

// const updatePreviewSelected = (indexFiles) => {
//   if (indexFiles == 0) {
//     previewSelected.value = {
//       url: '',
//       type: '',
//     }
//     return
//   }
//   if (previewSelected.type === 'image') {
//     previewSelected.value.url = attachmentFiles.value.image[indexFiles - 1].preview
//     previewSelected.value.type = 'image'
//   } else if (previewSelected.type === 'video') {
//     previewSelected.value.url = attachmentFiles.value.video[indexFiles - 1].preview
//     previewSelected.value.type = 'video'
//   }
//   return
// }
</script>

<template>
  <div
    :class="
      'popupAttachment '.concat(
        props.isOpened ? 'popupAttachment--opened' : 'popupAttachment--closed',
      )
    "
  >
    <div
      class="popupAttach_preview_container"
      v-if="
        attachmentFiles.image.length > 0 ||
        attachmentFiles.video.length > 0 ||
        Object.keys(attachmentFiles.pdf).length > 0
      "
    >
      <VueFilesPreview
        :file="attachmentFiles.pdf.file"
        width="100%"
        height="100%"
        overflow="hidden"
      />
      <button
        class="preview_delete_icon"
        v-if="previewSelected.url !== '' && previewSelected.type !== ''"
        @click="deleteFile"
      >
        <Icon icon="material-symbols:delete" />
      </button>
      <div class="preview_list">
        <img
          :src="imgPreview.preview"
          alt=""
          v-for="imgPreview in attachmentFiles.image"
          class="preview_list_img"
        />
        <video
          v-for="video in attachmentFiles.video"
          :src="video.preview"
          class="preview_list_img"
          @click="
            () => {
              previewSelected.type = 'video'
              previewSelected.url = video.preview
            }
          "
        ></video>
      </div>
    </div>
    <div class="popupAttach_fileOptions">
      <button class="attachment_icon_container">
        <input type="file" multiple accept="image/*" name="uploadImage" @change="attachmentEvent" />
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

.preview_list {
  display: flex;
  justify-content: start;
  gap: 5px;
  width: fit-content;
  max-width: 254px;
  /* border: 2px solid blue; */
  overflow-x: auto;
  padding-bottom: 2px;
}

.preview_list_img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  aspect-ratio: 'square';
  border-radius: 2px;
}

.preview_list::-webkit-scrollbar {
  background: none;
  height: 2px;
}
.preview_list::-webkit-scrollbar-thumb {
  height: 0.5px;
  background-color: white;
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
</style>
