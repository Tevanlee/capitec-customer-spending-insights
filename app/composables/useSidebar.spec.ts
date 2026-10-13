import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useSidebar } from './useSidebar';

vi.mock('./useDashboard', () => ({
  useDashboard: () => ({
    profile: ref({ name: 'Tevan Wilfred', accountType: 'premium' }),
  }),
}));

vi.stubGlobal('useRoute', () => ({ path: '/' }));

describe('useSidebar.ts Composable', () => {
  it('should correctly compute customer initials from profile name', () => {
    const { userInitials } = useSidebar();

    expect(userInitials.value).toBe('TW');
  });

  it('should provide structured navigation groups for the workspace', () => {
    const { navigationGroups } = useSidebar();

    expect(navigationGroups).toHaveLength(1);
    expect(navigationGroups[0]?.title).toBe('Workspace');
    expect(navigationGroups[0]?.links[0]?.label).toBe('Overview');
  });
});
