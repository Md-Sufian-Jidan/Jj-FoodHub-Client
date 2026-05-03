import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";
import { ProviderRoutes } from "@/routes/ProviderRoutes";
import { Route } from "@/types";
import { Separator } from "../ui/separator";
import ActiveNavItem from "./ActiveNavItem";
import { ROLES } from "@/constants/role";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import Logout from "./Logout";

export function AppSidebar({
  userRole,
  userName,
  ...props
}: {
  userRole?: string;
  userName?: string;
} & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];
  switch (userRole) {
    case ROLES.ADMIN:
      routes = AdminRoutes;
      break;
    case ROLES.CUSTOMER:
      routes = CustomerRoutes;
      break;

    case ROLES.PROVIDER:
      routes = ProviderRoutes;
      break;

    default:
      routes = [];
      break;
  }

  const commonRoutes = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
  ];

  const displayName = userName?.trim() || "User";
  const userInitial = displayName.charAt(0).toUpperCase();
  const readableRole = (userRole || "Guest").toLowerCase();
  return (
    <Sidebar className="border-r border-[#D97757]/20 bg-[#FAF9F7] dark:bg-[#FAF9F7]" {...props}>
      <SidebarHeader className="p-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group py-1.5">
          <div className="w-10 h-10 rounded-xl bg-[#D97757] flex items-center justify-center shadow-md">
            <UtensilsCrossed size={18} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#1F2933] dark:text-white group-data-[collapsible=icon]:hidden">
            MealMate
          </span>
        </Link>

        <Separator className="bg-[#D97757]/15" />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#6B7280] dark:text-[#6B7280] font-semibold">
          Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ActiveNavItem items={commonRoutes} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-[#6B7280] dark:text-[#6B7280] font-semibold">
              {item.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                <ActiveNavItem items={item.items} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 mt-auto">
        <div className="rounded-xl border border-[#D97757]/20 bg-white dark:bg-white px-3 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D97757] text-white font-semibold">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#1F2933]">
                {displayName}
              </p>
              <p className="text-xs uppercase tracking-wide text-[#6B7280]">
                {readableRole}
              </p>
            </div>
          </div>
        </div>
        <Logout />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}