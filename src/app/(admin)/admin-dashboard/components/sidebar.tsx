"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  ChevronDown,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronsUpDown,
} from "lucide-react";

import { sidebarItems, workspaces } from "@/src/lib/sidebar-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Separator } from "@/src/components/ui/separator";
import { Button } from "@/src/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = React.useState(false);
  const [activeWorkspace, setActiveWorkspace] = React.useState(workspaces[0]);

  // persist collapse state
  React.useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  React.useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "h-screen border-r bg-background flex flex-col transition-all duration-300",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {/* TOP SECTION */}
        <div className="p-3 flex items-center justify-between">
          {!collapsed && (
            <h1 className="font-bold text-lg tracking-tight">Admin</h1>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
        </div>

        {/* WORKSPACE SWITCHER */}
        <div className="px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between",
                  collapsed ? "justify-center px-0" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {activeWorkspace.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  {!collapsed && (
                    <span className="text-sm truncate">
                      {activeWorkspace.name}
                    </span>
                  )}
                </div>

                {!collapsed && <ChevronsUpDown size={16} />}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              {workspaces.map((ws) => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws)}
                >
                  {ws.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator className="my-3" />

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-2 space-y-6">
          {sidebarItems.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="text-xs text-muted-foreground px-2 mb-2">
                  {group.label}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item: any) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  // simple item
                  if (item.href) {
                    const link = (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm relative transition",
                          isActive
                            ? "text-primary font-medium"
                            : "hover:bg-muted"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-muted rounded-md"
                          />
                        )}

                        <span className="relative z-10 flex items-center gap-3">
                          <Icon size={18} />
                          {!collapsed && item.title}
                        </span>
                      </Link>
                    );

                    return collapsed ? (
                      <Tooltip key={item.title}>
                        <TooltipTrigger asChild>{link}</TooltipTrigger>
                        <TooltipContent side="right">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div key={item.title}>{link}</div>
                    );
                  }

                  // nested item
                  return (
                    <div key={item.title}>
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
                        )}
                      >
                        <Icon size={18} />
                        {!collapsed && (
                          <span className="flex-1 text-sm">
                            {item.title}
                          </span>
                        )}
                        {!collapsed && <ChevronDown size={14} />}
                      </div>

                      {/* children */}
                      {!collapsed && (
                        <div className="ml-6 mt-1 space-y-1">
                          {item.children?.map((child: any) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={cn(
                                "block text-sm px-2 py-1 rounded-md hover:bg-muted",
                                pathname === child.href ?
                                  "text-primary font-medium" : ""
                              )}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-2 border-t">
          <Link
            href="/logout"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-red-500 hover:bg-red-50",
              collapsed ? "justify-center" : ""
            )}
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </Link>
        </div>
      </aside>
    </TooltipProvider>
  );
}