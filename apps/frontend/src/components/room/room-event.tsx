import useRoom from "@/hooks/useRoom";
import { Alert, AlertTitle } from "../ui/alert";
import { DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";

function RoomEvent() {
  const { roomEve } = useRoom();

  return (
    <div className="fixed bottom-10 left-12">
      {roomEve.length > 0
        ? roomEve.map((event, index) => (
            <Alert
              key={event.playerId + index}
              className={cn(
                "mb-2",
                event.type === "JOIN" ? "border-green-500" : "border-red-500"
              )}
            >
              <DoorOpen
                className={
                  event.type === "JOIN" ? "stroke-green-500" : "stroke-red-500"
                }
              />
              <AlertTitle
                className={cn(
                  event.type === "JOIN" ? "text-green-500" : "text-red-500"
                )}
              >
                {event.type === "JOIN"
                  ? `${event.nickname} joined the room`
                  : `${event.nickname} left the room`}
              </AlertTitle>
            </Alert>
          ))
        : null}
    </div>
  );
}

export default RoomEvent;
