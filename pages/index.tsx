import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Feed from "../components/home/Feed";
import Widgets from "../components/Widgets";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import metamaskLogo from "../assets/metamask.png";
import errorImg from "../assets/error.png";
import Image from "next/image";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
};

const Home: NextPage = () => {
  const { appStatus, connectWallet } = useContext(TwitterContext);

  const app = (status = appStatus): any => {
    switch (status) {
      case "connected":
        return userLoggedIn;
      case "notConnected":
        return noUserFound;
      case "noMetaMask":
        return noMetaMaskFound;
      case "error":
        return error;
      default:
        return loading;
    }
  };

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );

  const noUserFound = (
    <div className={style.loginContainer}>
      <Image alt="MetaMask" src={metamaskLogo} height={200} width={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}>
        <p>Connect to MetaMask</p>
      </div>
    </div>
  );

  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <Image alt="MetaMask" src={metamaskLogo} height={200} width={200} />
      <div>
        <a
          target="_blank"
          href="https://metamask.io/download.html"
          rel="noopener"
          className={style.loginContent}
        >
          You must install MetaMask to use this app.
        </a>
      </div>
    </div>
  );

  const error = (
    <div className={style.loginContainer}>
      <Image alt="Error" src={errorImg} height={200} width={200} />
      <div className={style.loginContent}>
        An error has occurred. Please try again later or use another browser./
      </div>
    </div>
  );

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.loginContent}>Loading...</div>
    </div>
  );

  return <div className={style.wrapper}>{app(appStatus)}</div>;
};

export default Home;
