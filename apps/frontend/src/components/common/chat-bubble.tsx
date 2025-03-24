import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ChatBubbleProps = {
  message: string;
  time: string;
  isSender: boolean;
  user: {
    name: string;
    image: string;
  };
};

function ChatBubble(props: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        props.isSender ? "justify-end" : "justify-start"
      )}
    >
      {!props.isSender && (
        <Avatar>
          <AvatarImage src={props.user.image} />
          <AvatarFallback>{props.user.name[0]}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "inline-block py-2 px-4 rounded-lg",
          props.isSender ? "bg-black text-white" : "bg-gray-200 text-black"
        )}
      >
        {props.message}
      </div>
    </div>
  );
}

export default ChatBubble;
