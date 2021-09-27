import useAppData from "../../data/hook/useAppdata";
import Content from "./Content";
import Header from "./Header";
import SideMenu from "./SideMenu";
import ForceAuth from "../auth/ForceAuth";

interface LayoutProps {
  title: string;
  subTitle: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const { theme } = useAppData();

  return (
    <ForceAuth>
      <div className={`${theme} flex h-screen w-screen`}>
        <SideMenu />
        <div
          className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}
        >
          <Header title={props.title} subTitle={props.subTitle} />
          <Content>{props.children}</Content>
        </div>
      </div>
    </ForceAuth>
  );
}
