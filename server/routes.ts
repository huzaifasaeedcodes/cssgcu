import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEventSchema, insertTeamMemberSchema, insertAnnouncementSchema,insertRegistrationSchema } from "@shared/schema";
import { insertContactMessageSchema } from "@shared/schema";


const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

function verifyAdminPassword(req: any, res: any, next: any) {
  const { adminPassword } = req.body;
  
  if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
    return res.status(403).json({ 
      error: "Invalid admin password" 
    });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(express.json());


  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  app.post("/api/events", verifyAdminPassword, async (req, res) => {
    try {
      const { adminPassword, ...eventData } = req.body;
      const validated = insertEventSchema.parse(eventData);
      const event = await storage.createEvent(validated);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });

  app.put("/api/events/:id", verifyAdminPassword, async (req, res) => {
    try {
      const { adminPassword, ...eventData } = req.body;
      const validated = insertEventSchema.partial().parse(eventData);
      const event = await storage.updateEvent(req.params.id, validated);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });

  app.delete("/api/events/:id", verifyAdminPassword, async (req, res) => {
    try {
      const success = await storage.deleteEvent(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  });

  app.get("/api/team-members", async (req, res) => {
    try {
      const members = await storage.getAllTeamMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get("/api/team-members/:id", async (req, res) => {
    try {
      const member = await storage.getTeamMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.post("/api/team-members", verifyAdminPassword, async (req, res) => {
    try {
      const { adminPassword, ...memberData } = req.body;
      const validated = insertTeamMemberSchema.parse(memberData);
      const member = await storage.createTeamMember(validated);
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.put("/api/team-members/:id", verifyAdminPassword, async (req, res) => {
    try {
      const { adminPassword, ...memberData } = req.body;
      const validated = insertTeamMemberSchema.partial().parse(memberData);
      const member = await storage.updateTeamMember(req.params.id, validated);
      if (!member) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.delete("/api/team-members/:id", verifyAdminPassword, async (req, res) => {
    try {
      const success = await storage.deleteTeamMember(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  app.get("/api/announcements", async (req, res) => {
    try {
      const announcements = await storage.getAllAnnouncements();
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  app.get("/api/announcements/:id", async (req, res) => {
    try {
      const announcement = await storage.getAnnouncement(req.params.id);
      if (!announcement) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json(announcement);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch announcement" });
    }
  });

  app.post("/api/announcements", verifyAdminPassword, async (req, res) => {
    try {
      const { adminPassword, ...announcementData } = req.body;
      const validated = insertAnnouncementSchema.parse(announcementData);
      const announcement = await storage.createAnnouncement(validated);
      res.status(201).json(announcement);
    } catch (error) {
      res.status(400).json({ error: "Invalid announcement data" });
    }
  });

  app.put("/api/announcements/:id", verifyAdminPassword, async (req, res) => {
    try {
      const { adminPassword, ...announcementData } = req.body;
      const validated = insertAnnouncementSchema.partial().parse(announcementData);
      const announcement = await storage.updateAnnouncement(req.params.id, validated);
      if (!announcement) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json(announcement);
    } catch (error) {
      res.status(400).json({ error: "Invalid announcement data" });
    }
  });

  app.delete("/api/announcements/:id", verifyAdminPassword, async (req, res) => {
    try {
      const success = await storage.deleteAnnouncement(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Announcement not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete announcement" });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch registrations" });
    }
  });

  app.get("/api/registrations/:id", async (req, res) => {
    try {
      const registration = await storage.getRegistration(req.params.id);
      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }
      res.json(registration);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch registration" });
    }
  });

 app.post("/api/registrations", async (req, res) => {
  try {
    const validated = insertRegistrationSchema.parse(req.body);

    const registration = await storage.createRegistration(validated);
    res.status(201).json(registration);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Invalid registration data" });
  }
});

  app.post("/api/contact", async (req, res) => {
  try {
    const validated = insertContactMessageSchema.parse(req.body);
    const contactMessage = await storage.createContactMessage(validated);
    res.status(201).json(contactMessage);
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(400).json({ error: "Invalid contact message data" });
  }
});

app.get("/api/contact", verifyAdminPassword, async (req, res) => {
  try {
    const messages = await storage.getAllContactMessages();
    res.json(messages);
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
});

app.get("/api/contact/:id", verifyAdminPassword, async (req, res) => {
  try {
    const message = await storage.getContactMessage(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Contact message not found" });
    }
    res.json(message);
  } catch (error) {
    console.error("Failed to fetch contact message:", error);
    res.status(500).json({ error: "Failed to fetch contact message" });
  }
});

app.delete("/api/contact/:id", verifyAdminPassword, async (req, res) => {
  try {
    const success = await storage.deleteContactMessage(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Contact message not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    res.status(500).json({ error: "Failed to delete contact message" });
  }
});


  const httpServer = createServer(app);

  return httpServer;
}
