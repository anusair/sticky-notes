import React from "react";

function AuthLayout({ children }) {
  return (
    <main className="bg-background flex items-center justify-center h-screen">
      <div className="bg-surface p-5 rounded-xl  h-130 w-250 shadow-2xl overflow-hidden">
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
