import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateRoom from "./create-room";
import JoinRoom from "./join-room";
import MyRooms from "./my-rooms";

function PlayPage() {
  return (
    <div className="">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Join Room</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Room</DialogTitle>
            </DialogHeader>
            <JoinRoom />
          </DialogContent>
        </Dialog>
        <CreateRoom />
      </div>
      <MyRooms />
    </div>
  );
}

export default PlayPage;
