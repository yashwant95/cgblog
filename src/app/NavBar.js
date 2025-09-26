"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Primary navigation categories
  const primaryNavItems = [
    { 
      name: "Home", 
      href: "/", 
      description: "Discover Chhattisgarh" 
    },
  ];

  // Main content categories
  const contentNavItems = [
    { 
      name: "Places", 
      href: "/places", 
      description: "Tourist destinations" 
    },
    { 
      name: "Food", 
      href: "/food", 
      description: "Local cuisine" 
    },
    { 
      name: "Events", 
      href: "/events", 
      description: "Festivals & celebrations" 
    },
    { 
      name: "Reviews", 
      href: "/reviews", 
      description: "Travel experiences" 
    },
  ];

  // Media and resources
  const resourceNavItems = [
    { 
      name: "Gallery", 
      href: "/gallery", 
      description: "Photo collection" 
    },
    { name: "Travel Tips", href: "/travel-tips", description: "Helpful guides" },
    { name: "Maps", href: "/maps", description: "Navigation help" },
  ];

  // Information pages
  const infoNavItems = [
    { name: "About", href: "/about", description: "Learn about us" },
    { name: "Contact", href: "/contact", description: "Get in touch" },
    { name: "FAQ", href: "/faq", description: "Common questions" },
  ];

  // Mock search data - replace with actual search implementation
  const searchData = [
    { title: "Chitrakote Falls", type: "place", url: "/places/chitrakote-falls" },
    { title: "Bastar Dussehra", type: "event", url: "/events/bastar-dussehra" },
    { title: "Chila Recipe", type: "food", url: "/food/chila" },
    { title: "Sirpur Archaeological Site", type: "place", url: "/places/sirpur" },
    { title: "Faraa Recipe", type: "food", url: "/food/faraa" },
  ];

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Handle search
  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = searchData.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current page info
  const getCurrentPageInfo = () => {
    const allNavItems = [...primaryNavItems, ...contentNavItems, ...resourceNavItems, ...infoNavItems];
    const currentItem = allNavItems.find(item => item.href === pathname);
    return currentItem || { name: "Page" };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'place': return 'bg-blue-100 text-blue-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <nav className={`w-full shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' 
        : 'bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100'
    }`}>
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group select-none" 
            aria-label="CG Blog home"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <span className="text-white font-bold text-sm">CG</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-700 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-green-800 transition-colors duration-300">
                cgblogs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-center space-x-6">
              
              {/* Primary Navigation */}
              <div className="flex items-center space-x-1">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-green-100 hover:text-green-800 group ${
                      pathname === item.href 
                        ? 'bg-green-100 text-green-800 shadow-sm' 
                        : 'text-gray-700 hover:shadow-sm'
                    }`}
                    prefetch={false}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Content Categories */}
              <div className="flex items-center space-x-1">
                {contentNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-100 hover:text-blue-800 group ${
                      pathname === item.href 
                        ? 'bg-blue-100 text-blue-800 shadow-sm' 
                        : 'text-gray-700 hover:shadow-sm'
                    }`}
                    prefetch={false}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-800 transition-all duration-200">
                  <span className="group-hover:scale-105 transition-transform duration-200">More</span>
                  <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-48">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">Resources</div>
                    {resourceNavItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                        prefetch={false}
                      >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </Link>
                    ))}
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">Information</div>
                      {infoNavItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                          prefetch={false}
                        >
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search (Right Side) */}
          <div className="hidden md:flex items-center">
            
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Search Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                  <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search places, food, events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        autoFocus
                      />
                      <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </form>

                  {/* Search Results */}
                  <div className="max-h-64 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full mx-auto"></div>
                        <span className="text-sm mt-2 block">Searching...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <Link
                          key={index}
                          href={result.url}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                          onClick={() => setSearchOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{result.title}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {result.type}
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : searchQuery.length > 2 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No results found for "{searchQuery}"
                      </div>
                    ) : (
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                        <div className="space-y-2">
                          {searchData.slice(0, 3).map((item, index) => (
                            <Link
                              key={index}
                              href={item.url}
                              className="block text-sm text-gray-700 hover:text-green-600 transition-colors duration-150"
                              onClick={() => setSearchOpen(false)}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Breadcrumb Bar (Desktop) */}
      {pathname !== "/" && (
        <div className="hidden lg:block border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600 transition-colors duration-150">
                Home
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium flex items-center space-x-1">
                <span>{getCurrentPageInfo().icon}</span>
                <span>{getCurrentPageInfo().name}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Mobile Navigation Items */}
            
            {/* Primary Navigation */}
            {primaryNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${
                  pathname === item.href 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                prefetch={false}
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            ))}

            {/* Content Categories */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1 mb-2">Explore</div>
              {contentNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${
                    pathname === item.href 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  prefetch={false}
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Resources */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1 mb-2">Resources</div>
              {resourceNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${
                    pathname === item.href 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  prefetch={false}
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Information */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1 mb-2">Information</div>
              {infoNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ${
                    pathname === item.href 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  prefetch={false}
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
