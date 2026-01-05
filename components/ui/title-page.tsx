import { cn } from "@/lib/utils"

function TitlePage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="title"
      className={cn("text-3xl font-semibold text-gray-200", className)}
      {...props}
    />
  )
}

export { TitlePage }
