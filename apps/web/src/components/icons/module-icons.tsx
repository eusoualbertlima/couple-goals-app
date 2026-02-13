import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M7 9h4M7 14h10M13 9h4" />
    </svg>
  );
}

export function HabitsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M7 7h10v10H7z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

export function GoalsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3v3M21 12h-3M3 12h3" />
    </svg>
  );
}

export function TreeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 20v-5" />
      <path d="M8 15c0-2.2 1.2-3.6 4-3.6s4 1.4 4 3.6" />
      <path d="M8.5 12.4c-2 0-3.5-1.6-3.5-3.6S6.5 5 8.5 5c1.6 0 2.9.9 3.5 2.4.6-1.5 1.9-2.4 3.5-2.4 2 0 3.5 1.8 3.5 3.8s-1.5 3.6-3.5 3.6" />
    </svg>
  );
}

export function AnalyticsIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 20V8M10 20V4M16 20v-7M22 20V11" />
      <path d="M3 20h20" />
    </svg>
  );
}

export function StoreIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 10h16l-1 10H5L4 10Z" />
      <path d="m7 10 2-5h6l2 5" />
      <path d="M9 14h6" />
    </svg>
  );
}

export function ProfileIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c1.4-3 3.8-4.5 7-4.5s5.6 1.5 7 4.5" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </svg>
  );
}

export function CheckinIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="4" y="5" width="16" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M7.5 12.5 10.2 15 16 9.5" />
    </svg>
  );
}

export function ContractIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 4h9l3 3v13H6z" />
      <path d="M15 4v4h3M9 11h6M9 15h6" />
    </svg>
  );
}

export function FocusIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 5v2.2M12 16.8V19M5 12h2.2M16.8 12H19" />
    </svg>
  );
}

export function RetentionIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3c3.8 0 7 3.1 7 6.9 0 4.4-3.6 7.8-7 10.1-3.4-2.3-7-5.7-7-10.1C5 6.1 8.2 3 12 3Z" />
      <path d="M12 7v4l2 1.5" />
    </svg>
  );
}
