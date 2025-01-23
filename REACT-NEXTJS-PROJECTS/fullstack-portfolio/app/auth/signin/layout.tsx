import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Developer Portfolio",
  description: "Developer sign in page",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
