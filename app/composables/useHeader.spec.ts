import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, effectScope } from 'vue';
import { useHeader } from './useHeader';

vi.stubGlobal('useState', (key: string, init: () => any) => ref(init()));
vi.stubGlobal('useRuntimeConfig', () => ({ public: {} }));

describe('useHeader.ts Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should toggle theme state cleanly between light and dark', () => {
    const scope = effectScope();
    const { theme, toggleTheme } = scope.run(() => useHeader())!;

    expect(theme.value).toBe('light');
    toggleTheme();
    expect(theme.value).toBe('dark');
    toggleTheme();
    expect(theme.value).toBe('light');

    scope.stop();
  });
});
