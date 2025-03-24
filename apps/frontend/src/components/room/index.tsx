import ChatBox from "./chat-box";

function RoomPage() {
  return (
    <div className="border rounded-lg p-2">
      <div className="flex gap-2">
        <div className="w-lg">Emoji Here</div>
        <div>
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
