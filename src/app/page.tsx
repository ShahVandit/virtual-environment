"use client";

import Image from "next/image";
// import styles from '@/css/HomePage.css';
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AvatarPicker, PlayerType } from "@/components/AvatarPicker";

export default function Home() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<PlayerType>("messi");

  const joinRoom = useCallback(async () => {
    if (roomName === "" || username === "") {
      toast.error("Please enter all fields");
      return;
    }

    const body = {
      room_name: roomName,
      username: username,
      character: selectedCharacter,
    };

    try {
      const response = await fetch("/api/connection_details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const responseBody = await response.json();
        router.push(`/room/${encodeURIComponent(roomName)}?connectionDetails=${encodeURIComponent(JSON.stringify(responseBody))}`);
      }
    } catch (error) {
      toast.error("Failed to connect to the server");
    }
  }, [roomName, username, selectedCharacter, router]);

  return (
    <main style={{
      // style={{
        backgroundImage: 'url(/world/home-page.png)', // Fixed typo here
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Toaster />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2rem', // 2rem for large text
          marginBottom: '1rem',
          padding: '0.5rem',
          color: '#fff', // White color for text
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Text shadow for better readability
        }}>Enter the Virtual Frontier: Experience the Future of Interaction</h1>
        <div className="form-control">
          <label className="input-group" style={{ marginBottom: '1rem' }}>
            <span style={{
              backgroundColor: '#20232a',
              color: 'white',
              padding: '0.375rem 0.75rem'
            }}>Room Name</span>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.currentTarget.value)}
              type="text"
              placeholder="Room Name"
              style={{
                flex: 1,
                padding: '10px',
                border: '2px solid #ccc'
              }}
            />
          </label>
          <label className="input-group" style={{ marginBottom: '1rem' }}>
            <span style={{
              backgroundColor: '#20232a',
              color: 'white',
              padding: '0.375rem 0.75rem'
            }}>Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              type="text"
              placeholder="Username"
              style={{
                flex: 1,
                padding: '10px',
                border: '2px solid #ccc'
              }}
            />
          </label>
          <AvatarPicker
            selectedAvatar={selectedCharacter}
            onAvatarChange={setSelectedCharacter}
          />
          <button
            className="btn mt-4"
            onClick={joinRoom}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none'
            }}
          >Enter Room</button>
        </div>
      </div>
    </main>
    

  );
}