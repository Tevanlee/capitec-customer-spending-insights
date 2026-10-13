export const useHeader = () => {
  type Theme = 'light' | 'dark';

  const getInitialTheme = (): Theme => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('app-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  const theme = useState<Theme>('app-theme', () => 'light');
  const hasMounted = ref(false);

  if (getCurrentInstance()) {
    onMounted(() => {
      theme.value = getInitialTheme();
      document.documentElement.dataset.theme = theme.value;
      hasMounted.value = true;
    });
  }

  watch(theme, (value) => {
    if (!import.meta.client || !hasMounted.value) return;

    document.documentElement.dataset.theme = value;
    localStorage.setItem('app-theme', value);
  });

  return {
    theme,
    toggleTheme,
  };
};
