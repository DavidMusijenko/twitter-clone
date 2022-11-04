import Post from "../Post";
import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

const ProfileTweets = () => {
  const { currentAccount, currentUser, tweets } = useContext(TwitterContext);

  return (
    <div className={style.wrapper}>
      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={
            currentUser.name === "Unnamed"
              ? `${currentUser.walletAddress.slice(
                  0,
                  4
                )}...${currentUser.walletAddress.slice(41)}`
              : currentUser.name
          }
          username={`${currentAccount.slice(0, 4)}...${currentAccount.slice(
            -4
          )}`}
          avatar={tweet.author.profileImage}
          text={tweet.tweet}
          isProfileImageNft={tweet.author.isProfileImageNft}
          timestamp={tweet.timestamp}
        />
      ))}
    </div>
  );
};

export default ProfileTweets;
