import { defaultConfig } from "next/dist/server/config-shared";
import { BsStars } from "react-icons/bs";
import TweetBox from "./Tweetbox";
import Post from "../Post";

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

const tweets = [
  {
    displayName: "David",
    username: "0xD23oirjoiadjfoijfoidjalkdfj",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGAVAhnTpfElg/profile-displayphoto-shrink_100_100/0/1659127771446?e=1672876800&v=beta&t=EPYnVf_GfaMELUwveP5mRMmb-zwJ97gRufJ5pknuge4",
    text: "wassup yo",
    timestamp: "2022-11-01T12:00:00.000Z",
  },
  {
    displayName: "David",
    username: "0xD23oirjoiadjfoijfoidjalkdfj",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGAVAhnTpfElg/profile-displayphoto-shrink_100_100/0/1659127771446?e=1672876800&v=beta&t=EPYnVf_GfaMELUwveP5mRMmb-zwJ97gRufJ5pknuge4",
    text: "wassup yo",
    timestamp: "2022-11-01T12:00:00.000Z",
  },
  {
    displayName: "David",
    username: "0xD23oirjoiadjfoijfoidjalkdfj",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGAVAhnTpfElg/profile-displayphoto-shrink_100_100/0/1659127771446?e=1672876800&v=beta&t=EPYnVf_GfaMELUwveP5mRMmb-zwJ97gRufJ5pknuge4",
    text: "wassup yo",
    timestamp: "2022-11-01T12:00:00.000Z",
  },
];

const Feed = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.map((tweet, index) => (
        <Post
          key={index}
          displayName={tweet.displayName}
          username={`${tweet.username.slice(0, 4)}...${tweet.username.slice(
            -4
          )}`}
          avatar={tweet.avatar}
          text={tweet.text}
          isProfileImageNft={tweet.isProfileImageNft}
        />
      ))}
    </div>
  );
};

export default Feed;
