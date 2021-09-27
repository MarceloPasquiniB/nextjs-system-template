import Title from "./Title";
import ButtonChangeTheme from '../template/ButtonChangeTheme'
import useAppData from "../../data/hook/useAppdata";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
  title: string;
  subTitle: string;
}

export default function Header(props: HeaderProps) {
  const {theme, changeTheme} = useAppData()
  return (
    <div className={`flex`}>
      <Title title={props.title} subTitle={props.subTitle} />
      <div className={`flex flex-grow justify-end items-center`}>
        <ButtonChangeTheme theme={theme} changeTheme={changeTheme}/>
        <UserAvatar/>
      </div>
    </div>
  );
}
