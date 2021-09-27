import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();
  return (
    <Link href="/profile">
      <img
        className={`ml-4 h-14 w-14 rounded-full cursor-pointer ${props.className}`}
        src={user?.imageUrl ?? "/images/avatar.svg"}
        alt="User photo"
      />
    </Link>
  );
}
