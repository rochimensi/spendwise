import * as React from "react";

import { cn } from "@/app/components/ui/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("rounded-md p-4 md:p-6 bg-white text-card-foreground flex flex-col gap-6 border", className)}
    {...props}>
      {props.children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className)}
    {...props}>
      {props.children}
    </div>
  );
}

function CardTitle({  className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4 className={cn("leading-none", className)}
    {...props}>
      {props.children}
    </h4>
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p className={cn("text-muted-foreground", className)}
    {...props}>
      {props.children}
    </p>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    {...props}>
      {props.children}
    </div>
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-6 [&:last-child]:pb-6", className)}
    {...props}>
      {props.children}
    </div>
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
    {...props}>
      {props.children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
