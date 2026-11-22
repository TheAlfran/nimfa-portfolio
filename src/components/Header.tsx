import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RESUME_PROFILE, TESTIMONIALS } from '@/data/portfolioData';

interface HeaderProps {
  onContactClick: () => void;
}

const NAV_ITEMS = [
  { label: 'What I Do', href: '#what-i-do' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  ...(TESTIMONIALS.length > 0 ? [{ label: 'Endorsements', href: '#endorsements' }] : []),
];

export function Header({ onContactClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-[#E2E8F0] no-print">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="font-editorial text-xl font-semibold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm"
        >
          {RESUME_PROFILE.name}
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#0F172A] transition-colors duration-150 border-b border-transparent hover:border-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Get in Touch
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden -mr-2.5 inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0F172A] active:bg-[#F1F5F9] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleMobileNav(item.href)}
              className="block w-full text-left py-2.5 text-sm font-medium text-[#334155] hover:text-[#0F172A] cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onContactClick();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
