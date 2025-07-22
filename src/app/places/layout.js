import Breadcrumbs from '../components/Breadcrumb';

export default function PlacesLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
} 