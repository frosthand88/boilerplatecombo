<!-- src/App.vue -->
<template>
  <div class="page-wrapper">
    <template v-if="user">
      <h1>Welcome, {{ user.profile.preferred_username }}</h1>
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <div class="login-container">
        <div class="login-card">
          <div class="logo-wrapper">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
                alt="Vue Logo"
                class="vue-logo"
            />
          </div>

          <h1 class="login-title">Sign in to Frosthand</h1>

          <button class="btn email-btn" @click="loginWithEmail">
            <img
                src="https://fonts.gstatic.com/s/i/materialiconsoutlined/mail/v13/24px.svg"
                alt="Email"
                class="icon"
            />
            Sign in with Email
          </button>

          <div class="divider">or continue with</div>

          <button class="btn social-btn" @click="loginWithGoogle">
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                class="icon"
            />
            Sign in with Google
          </button>

          <button class="btn social-btn" @click="loginWithMicrosoft">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt="Microsoft"
                class="icon"
            />
            Sign in with Microsoft
          </button>

          <button class="btn social-btn" @click="loginWithGithub">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                alt="GitHub"
                class="icon"
            />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import auth from './service/auth'
import type {User} from "oidc-client-ts";

const user = ref<User | null>(null);

onMounted(async () => {
  const result = await auth.getUser()
  user.value = result && !result.expired ? result : null
})

const loginWithEmail = () => auth.loginWithEmail()
const loginWithGoogle = () => auth.loginWithGoogle()
const loginWithMicrosoft = () => auth.loginWithMicrosoft()
const loginWithGithub = () => auth.loginWithGithub()
const logout = () => auth.logout()
</script>

<style scoped>
.page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 40px 20px;
}

/* Container styles */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #f5f6fa;
}

/* Card */
.login-card {
  background: white;
  border-radius: 12px;
  padding: 30px 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

/* Title */
.login-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

/* Buttons */
.btn {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.email-btn {
  background-color: #2b6cb0;
  color: white;
}

.email-btn:hover {
  background-color: #1a4e8a;
}

.social-btn {
  background-color: #f1f1f1;
  color: #333;
  border: 1px solid #ccc;
}

.social-btn:hover {
  background-color: #e4e4e4;
}

/* Icon */
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

/* Divider */
.divider {
  text-align: center;
  color: #888;
  font-size: 0.9rem;
  margin: 20px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  height: 1px;
  width: 40%;
  background: #ccc;
  top: 50%;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.vue-logo {
  width: 60px;
  height: 60px;
}

</style>
