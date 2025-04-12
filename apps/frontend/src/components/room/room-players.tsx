import { Room } from "../../../../packages/shared/src";
import { Avatar, AvatarFallback } from "../ui/avatar";

type RoomPlayersType = {
  room: Room;
};

function RoomPlayers({ room }: RoomPlayersType) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-gray-500">Players : </span>
      <div className="flex gap-1 items-center max-w-full overflow-x-auto">
        {room.players
          .filter((p) => p.online)
          .map((player) => (
            <Avatar key={player.user._id} className="w-6 h-6">
              <AvatarFallback className="text-gray-500">
                {player.user.nickname[0]}
              </AvatarFallback>
            </Avatar>
          ))}
      </div>
    </div>
  );
}

export default RoomPlayers;
