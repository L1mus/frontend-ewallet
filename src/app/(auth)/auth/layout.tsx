import React from "react";

export default function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
        <h1>LOGO</h1>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
