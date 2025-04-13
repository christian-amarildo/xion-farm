"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  BarChart3,
  Settings,
  Package,
  Users,
  FileText,
  Cpu,
  Trophy,
  LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import { useMobile } from "@/hooks/use-mobile"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const isMobile = useMobile()

  if (isMobile) return null

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: t("nav.dashboard"),
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: t("nav.marketplace"),
      href: "/dashboard/marketplace",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: t("nav.investments"),
      href: "/dashboard/investments",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      title: "AI Insights",
      href: "/dashboard/ai-insights",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Blockchain",
      href: "/dashboard/blockchain",
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      title: "Gamification",
      href: "/dashboard/gamification",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      title: t("dashboard.products"),
      href: "/dashboard/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: t("dashboard.transactions"),
      href: "/dashboard/transactions",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: t("dashboard.analytics"),
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Network",
      href: "/dashboard/network",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: t("dashboard.settings"),
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-64 border-r bg-background h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">XionFarm</h2>
        </div>
        <nav className="mt-4 space-y-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                isActive(item.href)
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-primary",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

