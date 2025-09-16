// redisSubscriber.js
import Redis from "ioredis";

async function startSubscriber() {
  const subscriber = new Redis({ host: "127.0.0.1", port: 6379 }); // new client
  subscriber.on("error", (err) => console.error("Subscriber failed:", err));

  subscriber.on("connect", () => console.log("Subscriber connected ✅"));

  await subscriber.subscribe("tasks", (err, count) => {
    if (err) {
      console.error("Failed to subscribe: ", err);
    } else {
      console.log(
        `Subscribed successfully! This client is now listening to ${count} channel(s).`
      );
    }
  });

  subscriber.on("message", (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
  });
}

startSubscriber();
