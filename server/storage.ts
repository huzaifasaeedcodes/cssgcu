import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  type User,
  type InsertUser,
  type Event,
  type InsertEvent,
  type TeamMember,
  type InsertTeamMember,
  type Announcement,
  type InsertAnnouncement,
  users,
  events,
  teamMembers,
  announcements,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  getAllTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  getAllAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: string): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: string): Promise<boolean>;
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
    // If your DB supports returning(), prefer:
    // const [created] = await db.insert(users).values(insertUser).returning();
    await db.insert(users).values(insertUser);
    return insertUser as unknown as User;
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
    await db.insert(events).values(event);
    return event as unknown as Event;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    await db.update(events).set({ ...event, updatedAt: new Date() }).where(eq(events.id, id));
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
    await db.insert(teamMembers).values(member);
    return member as unknown as TeamMember;
  }

  async updateTeamMember(id: string, member: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    await db.update(teamMembers).set({ ...member, updatedAt: new Date() }).where(eq(teamMembers.id, id));
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
    await db.insert(announcements).values(announcement);
    return announcement as unknown as Announcement;
  }

  async updateAnnouncement(id: string, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    await db.update(announcements).set({ ...announcement, updatedAt: new Date() }).where(eq(announcements.id, id));
    return this.getAnnouncement(id);
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    const existing = await this.getAnnouncement(id);
    if (!existing) return false;
    await db.delete(announcements).where(eq(announcements.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
