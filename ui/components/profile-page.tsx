import type { ReactNode } from "react";

export interface ProfilePageProps {
  readonly children: ReactNode;
  readonly className?: string;
}
export function ProfilePage({
  children,
  className = "",
}: Readonly<ProfilePageProps>) {
  return <div className={`profile-page ${className}`}>{children}</div>;
}
