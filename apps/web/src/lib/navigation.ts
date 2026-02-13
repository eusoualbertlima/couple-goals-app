import type { ComponentType, SVGProps } from "react";
import {
  AnalyticsIcon,
  CheckinIcon,
  DashboardIcon,
  GoalsIcon,
  HabitsIcon,
  ProfileIcon,
  StoreIcon,
  TreeIcon
} from "@/components/icons/module-icons";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/habits", label: "Habitos", icon: HabitsIcon },
  { href: "/goals", label: "Metas", icon: GoalsIcon },
  { href: "/tree", label: "Arvore", icon: TreeIcon },
  { href: "/analytics", label: "Analytics", icon: AnalyticsIcon },
  { href: "/store", label: "Loja", icon: StoreIcon },
  { href: "/profile", label: "Perfil", icon: ProfileIcon },
  { href: "/checkin", label: "Check-in", icon: CheckinIcon }
];
