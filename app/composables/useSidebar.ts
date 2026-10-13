import { LayoutDashboard } from "@lucide/vue";
import type { NavigationGroup } from "~/types";

export const useSidebar = () => {
  const route = useRoute();

  const { profile } = useDashboard();

  const userInitials = computed(() => {
    if (!profile.value?.name) return "??";
    return profile.value.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  });

  const navigationGroups: NavigationGroup[] = [
    {
      title: "Workspace",
      links: [
        {
          label: "Overview",
          to: "/",
          icon: LayoutDashboard,
        },
      ],
    },
  ];

  return {
    route,
    profile,
    userInitials,
    navigationGroups,
  };
};
