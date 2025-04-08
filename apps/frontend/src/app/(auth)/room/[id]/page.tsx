import RoomPage from "@/components/room";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room - GEmoji",
  description: "Let GEmoji",
};

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-65px)] gap-2">
      <RoomPage id={id} />
    </div>
  );
}

export default page;
