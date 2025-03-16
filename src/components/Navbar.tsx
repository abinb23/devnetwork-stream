
import React, { useState } from 'react';
import { Bell, Home, MessageCircle, Menu, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-border/40 z-50 h-16 px-4 md:px-6">
      <div className="flex items-center justify-between h-full max-w-[1920px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-xl font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 shadow-sm flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="hidden md:inline-block">EduConnect</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className={cn("hidden md:flex items-center gap-2 mx-4 w-full max-w-md transition-all duration-300", {
          "max-w-xl": isSearchActive
        })}>
          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search for topics, posts, or users"
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            {searchValue && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                onClick={() => setSearchValue('')}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-1">
          <button className="nav-item text-brand-500">
            <Home size={20} />
          </button>
          <button className="nav-item relative">
            <MessageCircle size={20} />
          </button>
          <button className="nav-item relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full"></span>
          </button>
          <div className="w-px h-8 bg-border mx-2"></div>
          <a href="/profile" className="ml-2">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
              alt="User"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button 
            className="nav-item"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={`md:hidden px-4 pb-2 ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setSearchValue('')}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-16 bg-white border-b border-border/40 shadow-lg transform transition-transform duration-300 ease-in-out z-40",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="py-3 px-4 flex flex-col space-y-1">
          <a href="/" className="sidebar-link">
            <Home size={20} className="text-brand-500" />
            <span>Home</span>
          </a>
          <a href="/messages" className="sidebar-link">
            <MessageCircle size={20} />
            <span>Messages</span>
          </a>
          <a href="/notifications" className="sidebar-link">
            <Bell size={20} />
            <span>Notifications</span>
          </a>
          <div className="h-px w-full bg-border my-2" />
          <a href="/profile" className="sidebar-link">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
              alt="User"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>My Profile</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
