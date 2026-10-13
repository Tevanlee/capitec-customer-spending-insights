export interface NavigationLink {
  label: string;
  to: string;
  icon: Component;
}

export interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}
