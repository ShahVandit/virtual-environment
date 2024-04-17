"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  const joinRoom = useCallback(() => {
    if (roomName === "") {
      toast.error("Please enter a room name");
      return;
    }
    router.push(`/room/${roomName}`);
  }, [roomName, router]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-r from-red-500 via-yellow-500 to-indigo-500 text-pink-900">

    <Toaster position="top-center" />

      <section className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 w-96 h-64 flex items-center justify-center rounded-lg absolute">
        <span className="text-white text-xl">Central Blue Box</span>
      </section>

      <section className="bg-red shadow-lg rounded-lg p-12 m-8 text-center z-10">
        <h1 className="text-3xl font-bold mb-6">Join The Audio Room</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            joinRoom();
          }}
          className="space-y-6"
        >
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            type="text"
            placeholder="Room Name"
            className="input input-bordered input-accent w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary">
            Enter Room
          </button>
        </form>
      </section>

      <footer className="absolute bottom-4 right-4">
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flivekit-examples%2Fspatial-audio&env=LIVEKIT_API_KEY,LIVEKIT_API_SECRET,LIVEKIT_WS_URL&envDescription=Get%20these%20from%20your%20cloud%20livekit%20project.&envLink=https%3A%2F%2Fcloud.livekit.io&project-name=my-spatial-audio-app">
          <img alt="Deploy with Vercel" src="https://vercel.com/button" />
        </a>
      </footer>
    </main>
  );
}
