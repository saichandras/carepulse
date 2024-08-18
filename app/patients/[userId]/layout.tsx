import Sidebar from '@/components/Sidebar'; // Import the Sidebar component

export default function PatientLayout({
  children,
  params, // Capture params here, which includes userId
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  return (
    <div className="flex">
      <Sidebar params={params} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
