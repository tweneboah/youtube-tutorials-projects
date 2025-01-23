import AdminNavbar from "@/components/dashboard/AdminNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
  description: "Manage your portfolio content",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <main className="pt-20">{children}</main>
    </>
  );
}
