import { Button } from "../ui/button";
import MyRooms from "./my-rooms";

function PlayPage() {
  return (
    <div className="">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button variant="outline">Join Room</Button>
        <Button>Create Room</Button>
      </div>
      <MyRooms />
    </div>
  );
}

export default PlayPage;
