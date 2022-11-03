import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const TwitterContext = createContext({});

export const TwitterProvider = ({ children }): any => {
  const [appStatus, setAppStatus] = useState("loading");
  const [currentAccount, setCurrentAccount] = useState("");

  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        setAppStatus("connected");
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectToWallet = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      setAppStatus("loading");
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        setAppStatus("connected");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setAppStatus("notConnected");
    }
  };

  return (
    <TwitterContext.Provider
      value={{ appStatus, currentAccount, connectToWallet }}
    >
      {children}
    </TwitterContext.Provider>
  );
};