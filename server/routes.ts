import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertEventSchema,
  insertTeamMemberSchema,
  insertAnnouncementSchema,
  insertRegistrationSchema,
} from "@shared/schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Seed demo events
const demoEvents = [
  {
    title: "Tech Taakra 2025",
    description: "Annual flagship event featuring workshops, competitions, and tech talks from industry experts.",
    date: "2025-03-15",
    location: "GCU Main Auditorium",
    image: "/attached_assets/generated_images/Hackathon_event_photo_7f37422b.png",
    registrationLink: "#",
  },
  {
    title: "AI Workshop Series",
    description: "Learn the fundamentals of artificial intelligence and machine learning in this hands-on workshop series.",
    date: "2025-02-20",
    location: "Computer Lab 3",
    image: "/attached_assets/generated_images/AI_workshop_upcoming_event_6d681b05.png",
    registrationLink: "#",
  },
  {
    title: "Coding Bootcamp",
    description: "Intensive coding bootcamp covering web development, algorithms, and software engineering principles.",
    date: "2025-04-10",
    location: "CS Department",
    image: "/attached_assets/generated_images/Coding_workshop_event_photo_7009c1be.png",
    registrationLink: "#",
  },
];

async function seedDemoEvents() {
  const existingEvents = await storage.getAllEvents();
  if (existingEvents.length === 0) {
    console.log("No events found. Seeding demo events...");
    for (const event of demoEvents) {
      await storage.createEvent(event);
    }
    console.log("Demo events seeded successfully!");
  }
}

// Middleware to verify admin password
function verifyAdminPassword(req: any, res: any, next: any) {
  const { adminPassword } = req.body;
  if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Invalid admin password" });
  }
  next();
}

// -------------------- Register Routes --------------------
export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());
  await seedDemoEvents();

  // ======== Events, Team Members, Announcements, Registrations ========
  // (Existing routes remain unchanged, as in your current code)

  // =================== Messages ===================
  app.get("/api/messages/:id", async (req, res) => {
    try {
      const message = await storage.getMessage(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  app.get("/api/messages/sender/:senderId", async (req, res) => {
    try {
      const messages = await storage.getMessagesBySender(req.params.senderId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/messages/receiver/:receiverId", async (req, res) => {
    try {
      const messages = await storage.getMessagesByReceiver(req.params.receiverId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const message = await storage.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.put("/api/messages/:id/read", async (req, res) => {
    try {
      const message = await storage.markMessageAsRead(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const success = await storage.deleteMessage(req.params.id);
      if (!success) return res.status(404).json({ error: "Message not found" });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
