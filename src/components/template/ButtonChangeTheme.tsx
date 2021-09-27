import { SunIcon, MoonIcon } from "../icons";

interface ButtonChangeThemeProps {
  theme: string;
  changeTheme: () => void;
}

export default function ButtonChangeTheme(props: ButtonChangeThemeProps) {
  return props.theme === "dark" ? (
    <div
      onClick={props.changeTheme}
      className={`hidden sm:flex items-center cursor-pointer
    bg-gradient-to-r from-yellow-300 to-yellow-600 
    w-14 lg:w-28 h-8 p-1 rounded-full`}
    >
      <div
        className={`flex items-center justify-center
        bg-white text-yellow-600
        w-6 h-6 rounded-full
        `}
      >
        {SunIcon(5)}
      </div>
      <div
        className={`
        hidden lg:flex items-center ml-2
        text-gray-100
      `}
      >
        <span className="text-sm">LightMode</span>
      </div>
    </div>
  ) : (
    <div
      onClick={props.changeTheme}
      className={`hidden sm:flex items-center justify-end cursor-pointer
    bg-gradient-to-r from-gray-400 to-gray-600 
    w-14 lg:w-28 h-8 p-1 rounded-full`}
    >
      <div
        className={`
        hidden lg:flex items-center mr-2
        text-gray-200
      `}
      >
        <span className="text-sm">DarkMode</span>
      </div>
      <div
        className={`flex items-center justify-center
        bg-black text-yellow-200
        w-6 h-6 rounded-full
        `}
      >
        {MoonIcon(5)}
      </div>
    </div>
  );
}
