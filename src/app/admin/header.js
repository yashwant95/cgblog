export default function Header({ toggleSidebar, isMobileView }) {
  return (
    <header className="admin-header">
      {isMobileView && (
        <button 
          onClick={toggleSidebar}
          className="menu-toggle-btn"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      
      <h2 className="header-title">Admin Dashboard</h2>
      
      <div className="header-actions">
        <span className="text-sm text-gray-600 mr-2 hidden md:inline-block">
          Welcome, Admin
        </span>
      </div>
    </header>
  );
}
