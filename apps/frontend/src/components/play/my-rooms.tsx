"use client";
import { getMyRooms } from "@/api/room";
import { getCookie } from "@/lib/cookie";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Room } from "../../../../packages/shared/src";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function MyRooms() {
  const player = getCookie("player");

  const { data, isLoading } = useQuery({
    queryKey: ["my-rooms"],
    queryFn: () => getMyRooms(JSON.parse(player)._id),
    enabled: !!player,
  });

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
                <Link
                  href={`/room/${room._id}`}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    })
                  )}
                >
                  Join
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default MyRooms;
