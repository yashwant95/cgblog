// This is the root page for /admin, redirect to /admin/places
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/admin/places');
  return null;
}
