import * as React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`px-4 py-2 font-semibold text-white transition-all hover:opacity-90 ${
      className || ""
    }`}
    {...props}
  >
    {children}
  </button>
));
Button.displayName = "Button";

export { Button };
