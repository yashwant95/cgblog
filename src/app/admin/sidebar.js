import Link from 'next/link';

export default function Sidebar({ closeSidebar }) {
  return (
    <aside className="sidebar-content">
      <div className="sidebar-header">
        <div className="sidebar-title">Admin Panel</div>
        <button 
          className="sidebar-close-btn md:hidden" 
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link 
              href="/admin/places" 
              className="sidebar-link"
              onClick={() => closeSidebar && closeSidebar()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Places
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/events" 
              className="sidebar-link"
              onClick={() => closeSidebar && closeSidebar()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Events
            </Link>
          </li>
          {/* Add more links here if needed */}
          <li>
            <Link 
              href="/admin" 
              className="sidebar-link"
              onClick={() => closeSidebar && closeSidebar()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link href="/" className="sidebar-link text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
