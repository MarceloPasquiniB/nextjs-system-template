import useAuth from "../../data/hook/useAuth";
import { BellIcon, ConfigIcon, ExitIcon, HomeIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideMenu() {
  const { logout } = useAuth()
  return (
    <aside className={`flex flex-col
    bg-gray-200 text-gray-700
    dark:bg-gray-900`}>
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-red-900 h-20 w-20`}
      >
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Home" icon={HomeIcon} />
        <MenuItem url="/config" text="Config" icon={ConfigIcon} />
        <MenuItem url="/notifications" text="Notifications" icon={BellIcon} />
      </ul>
      <ul className="">
        <MenuItem
          className={`text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white dark:hover:text-white`}
          onClick={logout}
          text="Exit"
          icon={ExitIcon}
        />
      </ul>
    </aside>
  );
}
