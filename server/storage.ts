import {
  users,
  universities,
  programs,
  scholarships,
  applications,
  inquiries,
  chatMessages,
  type User,
  type UpsertUser,
  type University,
  type InsertUniversity,
  type Program,
  type InsertProgram,
  type Scholarship,
  type InsertScholarship,
  type Application,
  type InsertApplication,
  type Inquiry,
  type InsertInquiry,
  type ChatMessage,
  type InsertChatMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, like, ilike, count, or } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // University operations
  getUniversities(searchQuery?: string, country?: string, limit?: number): Promise<University[]>;
  getUniversity(id: number): Promise<University | undefined>;
  createUniversity(university: InsertUniversity): Promise<University>;
  updateUniversity(id: number, university: Partial<InsertUniversity>): Promise<University>;
  deleteUniversity(id: number): Promise<void>;
  
  // Program operations
  getPrograms(universityId?: number, level?: string, field?: string, limit?: number): Promise<Program[]>;
  getProgram(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: number, program: Partial<InsertProgram>): Promise<Program>;
  deleteProgram(id: number): Promise<void>;
  
  // Scholarship operations
  getScholarships(limit?: number): Promise<Scholarship[]>;
  getScholarship(id: number): Promise<Scholarship | undefined>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  updateScholarship(id: number, scholarship: Partial<InsertScholarship>): Promise<Scholarship>;
  deleteScholarship(id: number): Promise<void>;
  
  // Application operations
  getApplications(userId?: string, status?: string, limit?: number): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application>;
  getUserApplications(userId: string): Promise<Application[]>;
  
  // Inquiry operations
  getInquiries(status?: string, limit?: number): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  updateInquiry(id: number, inquiry: Partial<InsertInquiry>): Promise<Inquiry>;
  
  // Chat operations
  getChatMessages(sessionId: string, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    totalApplications: number;
    activeStudents: number;
    partnerUniversities: number;
    totalInquiries: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // University operations
  async getUniversities(searchQuery?: string, country?: string, limit = 50): Promise<University[]> {
    let conditions = [eq(universities.isActive, true)];
    
    if (searchQuery) {
      conditions.push(
        or(
          ilike(universities.name, `%${searchQuery}%`),
          ilike(universities.location, `%${searchQuery}%`)
        )!
      );
    }
    
    if (country) {
      conditions.push(eq(universities.country, country));
    }
    
    return await db
      .select()
      .from(universities)
      .where(and(...conditions))
      .orderBy(universities.ranking)
      .limit(limit);
  }

  async getUniversity(id: number): Promise<University | undefined> {
    const [university] = await db.select().from(universities).where(eq(universities.id, id));
    return university;
  }

  async createUniversity(university: InsertUniversity): Promise<University> {
    const [created] = await db.insert(universities).values(university).returning();
    return created;
  }

  async updateUniversity(id: number, university: Partial<InsertUniversity>): Promise<University> {
    const [updated] = await db
      .update(universities)
      .set({ ...university, updatedAt: new Date() })
      .where(eq(universities.id, id))
      .returning();
    return updated;
  }

  async deleteUniversity(id: number): Promise<void> {
    await db.update(universities).set({ isActive: false }).where(eq(universities.id, id));
  }

  // Program operations
  async getPrograms(universityId?: number, level?: string, field?: string, limit = 50): Promise<Program[]> {
    let conditions = [eq(programs.isActive, true)];
    
    if (universityId) {
      conditions.push(eq(programs.universityId, universityId));
    }
    
    if (level) {
      conditions.push(eq(programs.level, level));
    }
    
    if (field) {
      conditions.push(eq(programs.field, field));
    }
    
    return await db
      .select()
      .from(programs)
      .where(and(...conditions))
      .orderBy(programs.name)
      .limit(limit);
  }

  async getProgram(id: number): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const [created] = await db.insert(programs).values(program).returning();
    return created;
  }

  async updateProgram(id: number, program: Partial<InsertProgram>): Promise<Program> {
    const [updated] = await db
      .update(programs)
      .set({ ...program, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();
    return updated;
  }

  async deleteProgram(id: number): Promise<void> {
    await db.update(programs).set({ isActive: false }).where(eq(programs.id, id));
  }

  // Scholarship operations
  async getScholarships(limit = 50): Promise<Scholarship[]> {
    return await db
      .select()
      .from(scholarships)
      .where(eq(scholarships.isActive, true))
      .orderBy(desc(scholarships.createdAt))
      .limit(limit);
  }

  async getScholarship(id: number): Promise<Scholarship | undefined> {
    const [scholarship] = await db.select().from(scholarships).where(eq(scholarships.id, id));
    return scholarship;
  }

  async createScholarship(scholarship: InsertScholarship): Promise<Scholarship> {
    const [created] = await db.insert(scholarships).values(scholarship).returning();
    return created;
  }

  async updateScholarship(id: number, scholarship: Partial<InsertScholarship>): Promise<Scholarship> {
    const [updated] = await db
      .update(scholarships)
      .set({ ...scholarship, updatedAt: new Date() })
      .where(eq(scholarships.id, id))
      .returning();
    return updated;
  }

  async deleteScholarship(id: number): Promise<void> {
    await db.update(scholarships).set({ isActive: false }).where(eq(scholarships.id, id));
  }

  // Application operations
  async getApplications(userId?: string, status?: string, limit = 50): Promise<Application[]> {
    let conditions = [];
    
    if (userId) {
      conditions.push(eq(applications.userId, userId));
    }
    
    if (status) {
      conditions.push(eq(applications.status, status));
    }
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    return await db
      .select()
      .from(applications)
      .where(whereClause)
      .orderBy(desc(applications.submittedAt))
      .limit(limit);
  }

  async getApplication(id: number): Promise<Application | undefined> {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application;
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const [created] = await db.insert(applications).values(application).returning();
    return created;
  }

  async updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application> {
    const [updated] = await db
      .update(applications)
      .set({ ...application, updatedAt: new Date() })
      .where(eq(applications.id, id))
      .returning();
    return updated;
  }

  async getUserApplications(userId: string): Promise<Application[]> {
    return await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId))
      .orderBy(desc(applications.submittedAt));
  }

  // Inquiry operations
  async getInquiries(status?: string, limit = 50): Promise<Inquiry[]> {
    const whereClause = status ? eq(inquiries.status, status) : undefined;
    
    return await db
      .select()
      .from(inquiries)
      .where(whereClause)
      .orderBy(desc(inquiries.createdAt))
      .limit(limit);
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [created] = await db.insert(inquiries).values(inquiry).returning();
    return created;
  }

  async updateInquiry(id: number, inquiry: Partial<InsertInquiry>): Promise<Inquiry> {
    const [updated] = await db
      .update(inquiries)
      .set({ ...inquiry, updatedAt: new Date() })
      .where(eq(inquiries.id, id))
      .returning();
    return updated;
  }

  // Chat operations
  async getChatMessages(sessionId: string, limit = 50): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt)
      .limit(limit);
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [created] = await db.insert(chatMessages).values(message).returning();
    return created;
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{
    totalApplications: number;
    activeStudents: number;
    partnerUniversities: number;
    totalInquiries: number;
  }> {
    const [totalApplicationsResult] = await db.select({ count: count() }).from(applications);
    const [activeStudentsResult] = await db.select({ count: count() }).from(users).where(eq(users.role, 'user'));
    const [partnerUniversitiesResult] = await db.select({ count: count() }).from(universities).where(eq(universities.isActive, true));
    const [totalInquiriesResult] = await db.select({ count: count() }).from(inquiries);

    return {
      totalApplications: totalApplicationsResult.count,
      activeStudents: activeStudentsResult.count,
      partnerUniversities: partnerUniversitiesResult.count,
      totalInquiries: totalInquiriesResult.count,
    };
  }
}

export const storage = new DatabaseStorage();
