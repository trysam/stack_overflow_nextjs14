import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  avatarUrl,
  avatarFallback,
}: {
  avatarUrl: string;
  avatarFallback: string;
}) {
  return (
    <Avatar className="size-4">
      <AvatarImage src={`${avatarUrl}`} alt="@shadcn" />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
}
