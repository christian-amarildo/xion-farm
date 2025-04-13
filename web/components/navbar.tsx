"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const isAuthPage = pathname === "/login" || pathname === "/signup"
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : pathname === "/"
            ? "bg-transparent"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            {pathname === "/" && !scrolled ? (
              <Image
                src="/Logo-complete-xionFarm.svg"
                alt="XionFarm Logo"
                width={140}
                height={40}
                className="h-10 w-auto rounded-lg"
              />
            ) : (
              <Image
                src="/Logo-complete-xionFarm.svg"
                alt="XionFarm Logo"
                width={140}
                height={40}
                className="h-10 w-auto rounded-xl"
              />
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {!isDashboard && (
            <>
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/")
                    ? "text-primary"
                    : pathname === "/" && !scrolled
                      ? "text-white dark:text-white"
                      : "text-muted-foreground",
                )}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/about")
                    ? "text-primary"
                    : pathname === "/" && !scrolled
                      ? "text-white dark:text-white"
                      : "text-muted-foreground",
                )}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/features"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/features")
                    ? "text-primary"
                    : pathname === "/" && !scrolled
                      ? "text-white dark:text-white"
                      : "text-muted-foreground",
                )}
              >
                {t("nav.features")}
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/contact")
                    ? "text-primary"
                    : pathname === "/" && !scrolled
                      ? "text-white dark:text-white"
                      : "text-muted-foreground",
                )}
              >
                {t("nav.contact")}
              </Link>
            </>
          )}

          {isDashboard && (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/dashboard") ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t("nav.dashboard")}
              </Link>
              <Link
                href="/dashboard/marketplace"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/dashboard/marketplace") ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t("nav.marketplace")}
              </Link>
              <Link
                href="/dashboard/investments"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/dashboard/investments") ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t("nav.investments")}
              </Link>
              <Link
                href="/dashboard/profile"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/dashboard/profile") ? "text-primary" : "text-muted-foreground",
                )}
              >
                {t("nav.profile")}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(pathname === "/" && !scrolled ? "text-white hover:text-white hover:bg-white/20" : "")}
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English {language === "en" && "✓"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("pt")}>
                Português {language === "pt" && "✓"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isDashboard && !isAuthPage && (
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link href="/login">
                <Button
                  variant={pathname === "/" && !scrolled ? "outline" : "ghost"}
                  className={cn(
                    pathname === "/" && !scrolled ? "text-white border-white hover:bg-white/20 hover:text-white" : "",
                  )}
                >
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className={cn(pathname === "/" && !scrolled ? "bg-white text-green-600 hover:bg-white/90" : "")}
                >
                  {t("nav.signup")}
                </Button>
              </Link>
            </div>
          )}

          {isDashboard && (
            <div className="hidden md:flex md:items-center md:gap-2">
              <Link href="/">
                <Button variant="ghost">{t("nav.logout")}</Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden",
              pathname === "/" && !scrolled ? "text-white hover:text-white hover:bg-white/20" : "",
            )}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="container md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {!isDashboard && (
              <>
                <Link
                  href="/"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/about") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="/features"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/features") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.features")}
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/contact") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.contact")}
                </Link>
              </>
            )}

            {isDashboard && (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/dashboard") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  href="/dashboard/marketplace"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/dashboard/marketplace") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.marketplace")}
                </Link>
                <Link
                  href="/dashboard/investments"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/dashboard/investments") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.investments")}
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive("/dashboard/profile") ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {t("nav.profile")}
                </Link>
              </>
            )}

            {!isDashboard && !isAuthPage && (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/login" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={closeMenu}>
                  <Button className="w-full">{t("nav.signup")}</Button>
                </Link>
              </div>
            )}

            {isDashboard && (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href="/" onClick={closeMenu}>
                  <Button variant="ghost" className="w-full justify-start">
                    {t("nav.logout")}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  )
}

