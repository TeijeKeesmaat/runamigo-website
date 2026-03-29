import Link from "next/link";
import { Sparkles, Grid3X3, Image, FolderOpen, Settings, LogOut } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-secondary/10 bg-white md:block">
        <div className="flex h-16 items-center gap-2 border-b border-secondary/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <Sparkles size={16} />
          </div>
          <span className="font-heading text-lg font-semibold text-secondary">
            PixelCraft <span className="text-primary">AI</span>
          </span>
        </div>

        <nav className="p-4 space-y-1">
          <SidebarLink href="/app" icon={<Grid3X3 size={18} />} label="Dashboard" />
          <SidebarLink
            href="/app/create"
            icon={<Sparkles size={18} />}
            label="Create Pattern"
            primary
          />
          <SidebarLink
            href="/app/gallery"
            icon={<Image size={18} />}
            label="Gallery"
          />
          <SidebarLink
            href="/app/my-patterns"
            icon={<FolderOpen size={18} />}
            label="My Patterns"
          />
          <SidebarLink
            href="/app/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-secondary/10 bg-white px-4 md:hidden">
          <Link href="/app" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Sparkles size={16} />
            </div>
            <span className="font-heading font-semibold text-secondary">
              PixelCraft
            </span>
          </Link>
          <div className="flex gap-2">
            <Link
              href="/app/create"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-white"
            >
              <Sparkles size={14} />
              Create
            </Link>
          </div>
        </header>

        {/* Mobile bottom nav */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>

        <nav className="flex border-t border-secondary/10 bg-white md:hidden">
          <MobileNavLink href="/app" icon={<Grid3X3 size={20} />} label="Home" />
          <MobileNavLink href="/app/create" icon={<Sparkles size={20} />} label="Create" />
          <MobileNavLink href="/app/gallery" icon={<Image size={20} />} label="Gallery" />
          <MobileNavLink href="/app/my-patterns" icon={<FolderOpen size={20} />} label="Patterns" />
          <MobileNavLink href="/app/settings" icon={<Settings size={20} />} label="Settings" />
        </nav>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        primary
          ? "bg-primary/10 text-primary hover:bg-primary/15"
          : "text-secondary-500 hover:bg-secondary/5 hover:text-secondary"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center gap-0.5 py-2 text-xs text-secondary-400"
    >
      {icon}
      {label}
    </Link>
  );
}
