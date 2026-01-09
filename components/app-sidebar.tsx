"use client";

import * as React from "react";
import {
  Building2Icon,
  User,
  LayoutDashboard,
  WalletCards,
  BanknoteArrowUp,
  BookOpenCheck,
  HandCoins,
  Flag,
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const data = {
  user: {
    name: "Josue Aguilar",
    email: "josue@sample.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Josue Aguilar",
      logo: User,
      plan: "Personal",
    },
    {
      name: "Acia Corp",
      logo: Building2Icon,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Platform",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/tablero",
          icon: LayoutDashboard,
        },
        {
          title: "Accounts",
          url: "/accounts",
          icon: WalletCards,
        },
        {
          title: "Transactions",
          url: "/transactions",
          icon: BanknoteArrowUp,
        },
        {
          title: "Categories",
          url: "/categories",
          icon: BookOpenCheck,
        },
        {
          title: "Budgets",
          url: "/budgets",
          icon: HandCoins,
        },
        {
          title: "Goals",
          url: "/goals",
          icon: Flag,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isRouteActive = (pathname: string, url: string) => {
    return pathname === url;
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = isRouteActive(pathname, item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          {item.icon && <item.icon className="size-4" />}
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
