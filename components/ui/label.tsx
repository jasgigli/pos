import * as React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none mb-2 block",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
