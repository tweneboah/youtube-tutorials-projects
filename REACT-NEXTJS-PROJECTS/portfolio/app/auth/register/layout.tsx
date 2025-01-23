import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Developer Portfolio",
  description: "Developer registration page",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
