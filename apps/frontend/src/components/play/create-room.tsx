"use client";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogContent, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { createRoom } from "@/api/room";
import { toast } from "sonner";
import { getCookie } from "@/lib/cookie";
import { queryClient } from "@/app/providers";
import { useState } from "react";

const roomFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  password: z.string().nonempty("Password is required"),
});

function CreateRoom() {
  const [open, setOpen] = useState<boolean>(false);
  const player = JSON.parse(getCookie("player"));
  const createRoomMutation = useMutation({
    mutationKey: ["create-room"],
    mutationFn: createRoom,
  });

  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof roomFormSchema>) {
    const payload = {
      ...values,
      _id: player._id,
    };
    return createRoomMutation.mutateAsync(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["my-rooms"],
        });
        setOpen(false);
        toast.success("Room created");
      },
      onError: () => {
        toast.error("Failed to make room");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Room</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Create a new room</DialogTitle>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Room Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Room Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={createRoomMutation.isPending}>
                Create
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoom;
