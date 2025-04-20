"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { joinRoom } from "@/api/room";
import { getCookie } from "@/lib/cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const roomJoinSchema = z.object({
  roomId: z.string().nonempty("Room ID is required"),
  pin: z.string().nonempty("Pin is required"),
});

function JoinRoom() {
  const router = useRouter();
  const player = getCookie("player");
  const joinRoomMutation = useMutation({
    mutationKey: ["join-room"],
    mutationFn: joinRoom,
  });

  const form = useForm<z.infer<typeof roomJoinSchema>>({
    resolver: zodResolver(roomJoinSchema),
    defaultValues: {
      roomId: "",
      pin: "",
    },
  });

  function onSubmit(values: z.infer<typeof roomJoinSchema>) {
    const payload = {
      rid: values.roomId,
      userid: JSON.parse(player)._id as string,
      pin: values.pin,
    };

    return joinRoomMutation.mutateAsync(payload, {
      onSuccess: (resp) => {
        toast.success("Joined");
        router.push(`/room/${resp.data._id}`);
      },
      onError: (resp: any) => {
        if (resp.msg) {
          toast.error(resp.msg);
        } else {
          toast.error("Failed to join room");
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2 space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Id</FormLabel>
              <FormControl>
                <Input placeholder="Room Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room PIN</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Room PIN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={joinRoomMutation.isPending}>
          Join
        </Button>
      </form>
    </Form>
  );
}

export default JoinRoom;
