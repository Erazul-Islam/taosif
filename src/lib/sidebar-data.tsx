import {
  LayoutDashboard,
  Users,
  Settings,
  Folder,
  FileText,
  BrickWall
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
        title: "Messages",
        icon: FileText,
        href: "/admin-dashboard/messages",
      },
      {
        title: "Surveys",
        icon: BrickWall,
        href: "/admin-dashboard/survey",
      }
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
    ],
  },
];