<script setup lang="ts">
interface BaseErrorAlertProps {
  title?: string;
  message?: string;
  buttonLabel?: string;
}

withDefaults(defineProps<BaseErrorAlertProps>(), {
  title: 'System Error',
  message:
    'We are currently unable to complete your request safely. Please check your connection and try again.',
  buttonLabel: 'Try Again',
});
</script>

<template>
  <BaseCard variant="error" padding="lg" class="global-error" role="alert">
    <div class="global-error-content">
      <div>
        <h3 class="global-error-title">{{ title }}</h3>
        <p class="global-error-message">{{ message }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.global-error {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: auto;
  border-radius: var(--radius-xl);

  &-content {
    display: flex;
    gap: var(--space-4);
    align-items: flex-start;
  }

  &-title {
    font-size: var(--font-xl);
    font-weight: 600;
    margin-bottom: var(--space-2);
  }

  &-message {
    color: var(--color-text-secondary);
    font-size: var(--font-md);
  }
}
</style>
