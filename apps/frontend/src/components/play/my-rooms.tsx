"use client";
import { getMyRooms } from "@/api/room";
import { getCookie } from "@/lib/cookie";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Room } from "../../../../packages/shared/src";
import { Button } from "../ui/button";

function MyRooms() {
  const player = getCookie("player");

  const { data, isLoading } = useQuery({
    queryKey: ["my-rooms"],
    queryFn: () => getMyRooms(JSON.parse(player)._id),
    enabled: !!player,
  });

  console.log(data);

  if (isLoading) return <>Loading</>;

  return (
    <Card className="py-4 w-[700px] gap-2">
      <CardHeader>My Rooms</CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {data?.data?.map((room: Room) => (
            <div
              key={room._id}
              className="flex items-center justify-between p-2 border rounded-md"
            >
              <div className="flex items-center gap-1">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p className="text-xs">({room.players.length}) Players</p>
              </div>
              <div>
                <Button variant="outline">Join</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default MyRooms;
