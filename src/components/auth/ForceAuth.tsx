import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import loadingImg from "../../../public/images/loading.gif";
import useAuth from "../../data/hook/useAuth";

export default function ForceAuth(props: any) {
  const { loading, user } = useAuth();

  function contentRender() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
        if(!document.cookie?.includes("system-template-project-mpasquini-auth")){
            window.location.href = "/authentication"
        }
        `,
            }}
          />
        </Head>
        {props.children}
      </>
    );
  }

  function loadingRender() {
    return (
      <div
        className={`
                flex justify-center items-center h-screen`}
      >
        <Image src={loadingImg} />
      </div>
    );
  }

  if (!loading && user?.email) {
    return contentRender();
  } else if (loading) {
    return loadingRender();
  } else {
    router.push("/authentication");
    return null;
  }
}
