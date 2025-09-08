import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface AlexAvatarProps {
  size?: "sm" | "md" | "lg"
  showStatus?: boolean
  className?: string
}

export function AlexAvatar({ size = "md", showStatus = false, className = "" }: AlexAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className={`relative ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src="/alex-fenerbahce-avatar.png" />
        <AvatarFallback className="bg-primary text-primary-foreground font-bold">AX</AvatarFallback>
      </Avatar>
      {showStatus && (
        <div className="absolute -bottom-1 -right-1">
          <Badge variant="secondary" className="text-xs px-1 py-0">
            Online
          </Badge>
        </div>
      )}
    </div>
  )
}
