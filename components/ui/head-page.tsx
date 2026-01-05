import { cn } from "@/lib/utils"

function HeadPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="head-page"
      className={cn("flex items-center justify-between mb-5", className)}
      {...props}
    />
  )
}

export { HeadPage }
