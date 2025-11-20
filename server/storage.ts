import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import {
  type User,
  type InsertUser,
  type Event,
  type InsertEvent,
  type TeamMember,
  type InsertTeamMember,
  type Announcement,
  type InsertAnnouncement,
  type Registration,
  type InsertRegistration,
  type Message,
  type InsertMessage,
  type ContactMessage,
  type InsertContactMessage,
  users,
  events,
  teamMembers,
  announcements,
  registrations,
  messages,
  contactMessages, // Add this import
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  // Team Members
  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  // Announcements
  getAllAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: string): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: string): Promise<boolean>;

  // Registrations
  getAllRegistrations(): Promise<Registration[]>;
  getRegistration(id: string): Promise<Registration | undefined>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;

  // Messages
  getMessage(id: string): Promise<Message | undefined>;
  getMessagesBySender(senderId: string): Promise<Message[]>;
  getMessagesByReceiver(receiverId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<Message | undefined>;
  deleteMessage(id: string): Promise<boolean>;

  // Contact Messages
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  deleteContactMessage(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // =================== Users ===================
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0] as User | undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser = { ...insertUser, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
    await db.insert(users).values(newUser);
    return newUser as User;
  }

  // =================== Events ===================
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0] as Event | undefined;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const newEvent = { ...event, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
    await db.insert(events).values(newEvent);
    return newEvent as Event;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const updatedEvent = { ...event, updatedAt: new Date() };
    await db.update(events).set(updatedEvent).where(eq(events.id, id));
    return this.getEvent(id);
  }

  async deleteEvent(id: string): Promise<boolean> {
    const existing = await this.getEvent(id);
    if (!existing) return false;
    await db.delete(events).where(eq(events.id, id));
    return true;
  }

  // =================== Team Members ===================
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    const result = await db.select().from(teamMembers).where(eq(teamMembers.id, id)).limit(1);
    return result[0] as TeamMember | undefined;
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const newMember = { ...member, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
    await db.insert(teamMembers).values(newMember);
    return newMember as TeamMember;
  }

  async updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const updatedMember = { ...member, updatedAt: new Date() };
    await db.update(teamMembers).set(updatedMember).where(eq(teamMembers.id, id));
    return this.getTeamMember(id);
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    const existing = await this.getTeamMember(id);
    if (!existing) return false;
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
    return true;
  }

  // =================== Announcements ===================
  async getAllAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements);
  }

  async getAnnouncement(id: string): Promise<Announcement | undefined> {
    const result = await db.select().from(announcements).where(eq(announcements.id, id)).limit(1);
    return result[0] as Announcement | undefined;
  }

  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const newAnnouncement = { ...announcement, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
    await db.insert(announcements).values(newAnnouncement);
    return newAnnouncement as Announcement;
  }

  async updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const updatedAnnouncement = { ...announcement, updatedAt: new Date() };
    await db.update(announcements).set(updatedAnnouncement).where(eq(announcements.id, id));
    return this.getAnnouncement(id);
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    const existing = await this.getAnnouncement(id);
    if (!existing) return false;
    await db.delete(announcements).where(eq(announcements.id, id));
    return true;
  }

 // =================== Registrations ===================
// =================== Registrations ===================
// Add this in DatabaseStorage
async getAllRegistrations(): Promise<Registration[]> {
  return await db.select().from(registrations);
}

async getRegistration(id: string): Promise<Registration | undefined> {
  const result = await db.select().from(registrations).where(eq(registrations.id, id)).limit(1);
  return result[0] as Registration | undefined;
}

async createRegistration(registration: InsertRegistration): Promise<Registration> {
  // Ensure event_title exists
  if (!registration.event_title || !registration.event_title.trim()) {
    throw new Error("Event title is required");
  }

  const newRegistration = { 
    ...registration, 
    id: uuidv4(), 
    createdAt: new Date(), 
    updatedAt: new Date() 
  };

  await db.insert(registrations).values(newRegistration);
  return newRegistration as Registration;
}

  // =================== Messages ===================
  async getMessage(id: string): Promise<Message | undefined> {
    const result = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
    return result[0] as Message | undefined;
  }

  async getMessagesBySender(senderId: string): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.senderId, senderId));
  }

  async getMessagesByReceiver(receiverId: string): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.receiverId, receiverId));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage = { ...message, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
    await db.insert(messages).values(newMessage);
    return newMessage as Message;
  }

  async markMessageAsRead(id: string): Promise<Message | undefined> {
    await db.update(messages).set({ read: 1, updatedAt: new Date() }).where(eq(messages.id, id));
    return this.getMessage(id);
  }

  async deleteMessage(id: string): Promise<boolean> {
    const existing = await this.getMessage(id);
    if (!existing) return false;
    await db.delete(messages).where(eq(messages.id, id));
    return true;
  }

  // =================== Contact Messages ===================
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    const result = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
    return result[0] as ContactMessage | undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage = { 
      ...message, 
      id: uuidv4(), 
      createdAt: new Date(), 
      updatedAt: new Date() 
    };
    await db.insert(contactMessages).values(newMessage);
    return newMessage as ContactMessage;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    const existing = await this.getContactMessage(id);
    if (!existing) return false;
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();