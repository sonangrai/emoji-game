import RoomPage from "@/components/room";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room - GEmoji",
  description: "Let GEmoji",
};

function page({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-65px)] gap-2">
      <RoomPage id={params.id} />
    </div>
  );
}

export default page;
