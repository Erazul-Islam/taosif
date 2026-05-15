import {
  LayoutDashboard,
  Users,
  Settings,
  Folder,
  FileText,
} from "lucide-react";

export const workspaces = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Personal" },
];

export const sidebarItems = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Users", href: "/users", icon: Users },
    ],
  },
  {
    label: "Projects",
    items: [
      {
        title: "Projects",
        icon: Folder,
        children: [
          { title: "Active Projects", href: "/projects/active" },
          { title: "Archived", href: "/projects/archived" },
        ],
      },
      {
        title: "Reports",
        icon: FileText,
        href: "/reports",
      },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];