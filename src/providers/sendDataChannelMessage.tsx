// utils.ts
import { DataPacket_Kind, LocalParticipant } from "livekit-client";

export async function sendDataChannelMessage(
  localParticipant: LocalParticipant,
  message: { payload: any; channelId: string },
  textEncoder: TextEncoder
) {
  const payload: Uint8Array = textEncoder.encode(JSON.stringify(message));
  await localParticipant.publishData(payload, DataPacket_Kind.LOSSY);
}
