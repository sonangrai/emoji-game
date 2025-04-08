"use client";
import { getMyRooms, joinRoom } from "@/api/room";
import { getCookie } from "@/lib/cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Room } from "../../../../packages/shared/src";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function MyRooms() {
  const router = useRouter();
  const player = getCookie("player");
  const joinRoomMutation = useMutation({
    mutationKey: ["joinRoom"],
    mutationFn: joinRoom,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["my-rooms"],
    queryFn: () => getMyRooms(JSON.parse(player)._id),
    enabled: !!player,
  });

  const handleJoinRoom = (id: string) => {
    joinRoomMutation.mutate(
      {
        rid: id,
        userid: JSON.parse(player)._id,
      },
      {
        onSuccess: () => {
          router.push(`/room/${id}`);
        },
        onError: () => {
          toast.error("Error joining room");
        },
      }
    );
  };

  if (isLoading) return <>Loading</>;

  return (
    <Card className="py-4 w-[700px] gap-2">
      <CardHeader className="font-bold">My Rooms</CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {data?.data?.map((room: Room) => (
            <div
              key={room._id}
              className="flex items-center justify-between px-4 py-2 border rounded-md"
            >
              <div className="flex items-center gap-1">
                <h3 className="text-md">{room.name}</h3>
                <p className="text-xs">({room.players.length}) p</p>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => handleJoinRoom(room._id)}
                  disabled={joinRoomMutation.isPending}
                >
                  {joinRoomMutation.isPending ? "Joining" : "Join"}
                </Button>
              </div>
            </div>
          ))}

          {data.data.length === 0 && (
            <div className="flex items-center justify-center w-full h-full">
              <h3 className="text-md">You don't have any rooms</h3>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default MyRooms;
