import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/auth';
import DashboardClient from '@/components/dashboard/DashboardClient';

const DashboardPage = async (): Promise<ReactNode> => {
  const user = await getUserSession();
  if (!user) redirect('/');

  return <DashboardClient />;
};

export default DashboardPage;
