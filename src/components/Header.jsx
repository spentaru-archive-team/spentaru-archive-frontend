import React from "react";

export default function Header({ title, desc, className, children }) {
  return (
    <header
      className={`bg-background rounded-sm border border-border/80 bg-white p-7! sm:px-6 ${className}`}
    >
      <div className="flex flex-col gap-5 w-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {desc && (
            <p className="text-sm leading-6 text-muted-foreground sm:text-base">
              {desc}
            </p>
          )}
        </div>

        {children}
      </div>
    </header>
  );
}
