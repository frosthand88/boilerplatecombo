<!-- src/views/Callback.vue -->
<template>
  <p>Signing in...</p>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import auth from '../service/auth'

const router = useRouter()

onMounted(async () => {
  await auth.completeLogin()
  await router.push('/')
})
</script>
