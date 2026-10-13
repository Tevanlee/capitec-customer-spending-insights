export const useShell = () => {
  const isMobileNavOpen = ref(false);
  const isDesktopSidebarCollapsed = ref(false);

  const closeMobileNav = () => {
    isMobileNavOpen.value = false;
  };

  const toggleMobileNav = () => {
    isMobileNavOpen.value = !isMobileNavOpen.value;
  };

  const toggleDesktopSidebar = () => {
    isDesktopSidebarCollapsed.value = !isDesktopSidebarCollapsed.value;
  };

  watch(isMobileNavOpen, (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  });

  if (getCurrentInstance()) {
    onBeforeUnmount(() => {
      if (import.meta.client) {
        document.body.style.overflow = '';
      }
    });
  }

  return {
    isMobileNavOpen,
    isDesktopSidebarCollapsed,

    closeMobileNav,
    toggleMobileNav,
    toggleDesktopSidebar,
  };
};
