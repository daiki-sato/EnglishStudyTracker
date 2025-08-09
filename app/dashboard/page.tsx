import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogForm from '@/components/log-form';
import LogsTable from '@/components/logs-table';
import { getLogs } from '@/lib/queries';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }
  const logs = await getLogs(session.user.id);
  return (
    <div>
      <LogForm />
      <LogsTable initialLogs={logs as any} />
    </div>
  );
}