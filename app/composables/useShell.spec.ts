import { describe, it, expect, beforeEach, vi } from 'vitest';
import { effectScope } from 'vue';
import { useShell } from './useShell';

vi.stubGlobal('import.meta', { client: true });

describe('useShell.ts Composable', () => {
  beforeEach(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  });

  it('should toggle mobile navigation state correctly', () => {
    const scope = effectScope();
    const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = scope.run(() =>
      useShell(),
    )!;

    expect(isMobileNavOpen.value).toBe(false);
    toggleMobileNav();
    expect(isMobileNavOpen.value).toBe(true);
    closeMobileNav();
    expect(isMobileNavOpen.value).toBe(false);

    scope.stop();
  });

  it('should toggle desktop sidebar collapse state correctly', () => {
    const scope = effectScope();
    const { isDesktopSidebarCollapsed, toggleDesktopSidebar } = scope.run(() =>
      useShell(),
    )!;

    expect(isDesktopSidebarCollapsed.value).toBe(false);
    toggleDesktopSidebar();
    expect(isDesktopSidebarCollapsed.value).toBe(true);

    scope.stop();
  });
});
