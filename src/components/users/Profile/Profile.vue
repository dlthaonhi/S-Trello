<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
const { user } = defineProps({
  user: {
    type: Object,
    required: true
  }
})
const form = ref({
  name: user.name,
  bio: user.bio
})
const labelPosition = ref('top')
const itemLabelPosition = ref('')

const submitForm = (form) => {
  if (!form.name) {
    return ElNotification({
      title: 'Error',
      message: 'Username is required',
      type: 'error',
      position: 'top-right',
      duration: 3000
    })
  }
  if (form.name !== user.name || form.bio !== user.bio) {
    ElNotification({
      title: 'Success',
      message: 'Your information has been updated',
      type: 'success',
      position: 'top-right',
      duration: 3000
    })
  }
}
</script>

<template>
  <div :class="$style.personalContainer">
    <img
      :class="$style.imageHeader"
      src="https://trello.com/assets/eff3d701a9c3a71105ea.svg"
      alt=""
      role="presentation"
    />
    <h1>Manage your personal information</h1>
    <div>
      <h2>About</h2>
      <hr />
    </div>
    <div>
      <el-form
        :label-position="labelPosition"
        label-width="auto"
        :model="form"
        :class="$style.form"
      >
        <el-form-item :label-position="itemLabelPosition" :class="$style.formItemWithIcon">
          <template #label>
            <div :class="$style.labelContainer">
              <span :class="$style.labelItem">Username</span>
              <span :class="$style.iconAlwaysPublic">
                <svg
                  fill="#626F86"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z"
                    ></path>
                  </g>
                </svg>
                &nbsp;Always public
              </span>
            </div>
          </template>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item :label-position="itemLabelPosition" :class="$style.formItemWithIcon">
          <template #label>
            <div :class="$style.labelContainer">
              <span :class="$style.labelItem">Bio</span>
              <span :class="$style.iconAlwaysPublic">
                <svg
                  fill="#626F86"
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM4 12c0-.899.156-1.762.431-2.569L6 11l2 2v2l2 2 1 1v1.931C7.061 19.436 4 16.072 4 12zm14.33 4.873C17.677 16.347 16.687 16 16 16v-1a2 2 0 0 0-2-2h-4v-3a2 2 0 0 0 2-2V7h1a2 2 0 0 0 2-2v-.411C17.928 5.778 20 8.65 20 12a7.947 7.947 0 0 1-1.67 4.873z"
                    ></path>
                  </g>
                </svg>
                &nbsp;Always public
              </span>
            </div>
          </template>
          <el-input v-model="form.bio" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(form)" :class="$style.btnSubmit">
            Save
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style module scoped>
.personalContainer {
  margin: 0 auto;
  width: 35%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
h1 {
  font-size: 1.5rem;
  font-weight: 700;
}
h2 {
  font-size: 1.25rem;
  font-weight: 500;
}
.form {
  width: 70%;
}
.formItemWithIcon {
  display: flex;
  flex-direction: column;
}

.labelContainer {
  display: flex;
  justify-content: space-between;
}
.labelItem {
  font-weight: 500;
  color: #172b4d;
}
.iconAlwaysPublic {
  display: flex;
  align-items: center;
  color: #44546f;
  font-weight: 300;
}
.btnSubmit {
  width: 100%;
  margin-top: 2.5rem;
}

@media (max-width: 1200px) {
  .personalContainer {
    width: 50%;
  }
  .form {
    width: 100%;
  }
}
@media (max-width: 768px) {
  .personalContainer {
    width: 70%;
    padding: 2rem 0;
  }
  .form {
    width: 100%;
  }
}
@media (max-width: 576px) {
  .personalContainer {
    width: 90%;
    padding: 2rem 0;
  }
  .form {
    width: 100%;
  }
}
@media (max-width: 375px) {
  .personalContainer {
    width: 100%;
    padding: 2rem 0;
  }
  .form {
    width: 100%;
  }
}
</style>
