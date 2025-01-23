import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Dashboard",
  description: "Manage your portfolio projects",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
