import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getCookie } from "@/lib/cookie";

type ChatBubbleProps = {
  text: string;
  createdAt: string;
  user: {
    nickname: string;
  };
};

function ChatBubble(props: ChatBubbleProps) {
  const nickName = JSON.parse(getCookie("player")).nickname;
  const isSender = props.user.nickname === nickName;

  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      {!isSender && (
        <Avatar title={props.user.nickname}>
          <AvatarFallback>{props.user.nickname[0]}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "inline-block py-2 px-4 rounded-lg",
          isSender ? "bg-black text-white" : "bg-gray-200 text-black"
        )}
      >
        {props.text}
      </div>
    </div>
  );
}

export default ChatBubble;
