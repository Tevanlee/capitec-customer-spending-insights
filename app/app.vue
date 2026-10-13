<script lang="ts" setup>
const { hasNetworkError, errorMessage } = useDashboard();
</script>
<template>
  <NuxtLayout>
    <BaseErrorAlert
      v-if="hasNetworkError"
      title="Network Connection Error"
      :message="errorMessage || undefined" />
    <NuxtPage v-else />
  </NuxtLayout>
</template>
