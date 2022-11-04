import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

export const TwitterContext = createContext({});

export const TwitterProvider = ({ children }): any => {
  const [appStatus, setAppStatus] = useState("loading");
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  //fetch from DB

  useEffect(() => {
    if (!currentAccount || appStatus !== "connected") return;
    getCurrentUserDetails(currentAccount);
    fetchTweets();
  }, [currentAccount, appStatus]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      router.push("/");
      setAppStatus("error");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      setAppStatus("loading");
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setAppStatus("connected");
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
        router.push("/");
        setAppStatus("notConnected");
      }
    } catch (error) {
      console.log(error);
      setAppStatus("error");
    }
  };

  // creating account in Sanity DB if there is none

  const createUserAccount = async (userWalletAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus("noMetaMask");
    try {
      const userDoc = {
        _type: "users",
        _id: userWalletAddress,
        name: "Unnamed",
        isProfileImageNft: false,
        profileImage:
          "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
        walletAddress: userWalletAddress,
      };

      await client.create(userDoc);

      setAppStatus("connected");
    } catch (error) {
      router.push("/");
    }
  };

  const fetchTweets = async () => {
    const query = `
    *[_type == "tweets"]{
      "author": author->{name, walletAddress, profileImage, isProfileImageNft},
      tweet,
      timestamp
    }|order(timestamp desc)
  `;

    const sanityResponse = await client.fetch(query);

    setTweets([]);

    sanityResponse.forEach(async (item) => {
      const newItem = {
        tweet: item.tweet,
        timestamp: item.timestamp,
        author: {
          name: item.author.name,
          walletAddress: item.author.walletAddress,
          profileImage: item.author.profileImage,
          isProfileImageNft: item.author.isProfileImageNft,
        },
      };

      setTweets((prevState): any => [...prevState, newItem]);
    });
  };

  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== "connected") return;

    const query = `
    *[_type == "users" && _id == "${userAccount}"]{
      "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
      name,
      profileImage,
      isProfileImageNft,
      coverImage,
      walletAddress
    }
  `;

    const sanityResponse = await client.fetch(query);

    setCurrentUser({
      name: sanityResponse[0].name,
      profileImage: sanityResponse[0].profileImage,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,
      tweets: sanityResponse[0].tweets,
    });
  };
  return (
    <TwitterContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        fetchTweets,
        tweets,
        currentUser,
      }}
    >
      {children}
    </TwitterContext.Provider>
  );
};
