var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  applicationRelations: () => applicationRelations,
  applications: () => applications,
  chatMessages: () => chatMessages,
  inquiries: () => inquiries,
  insertApplicationSchema: () => insertApplicationSchema,
  insertChatMessageSchema: () => insertChatMessageSchema,
  insertInquirySchema: () => insertInquirySchema,
  insertProgramSchema: () => insertProgramSchema,
  insertScholarshipSchema: () => insertScholarshipSchema,
  insertUniversitySchema: () => insertUniversitySchema,
  programRelations: () => programRelations,
  programs: () => programs,
  scholarships: () => scholarships,
  sessions: () => sessions,
  universities: () => universities,
  universityRelations: () => universityRelations,
  userRelations: () => userRelations,
  users: () => users
});
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"),
  // user, admin
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  ranking: integer("ranking"),
  website: text("website"),
  established: integer("established"),
  studentCount: integer("student_count"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  universityId: integer("university_id").references(() => universities.id),
  name: text("name").notNull(),
  level: text("level").notNull(),
  // bachelor, master, phd, diploma
  field: text("field").notNull(),
  // engineering, business, medicine, etc.
  duration: text("duration"),
  // "4 years", "2 years", etc.
  tuitionFee: decimal("tuition_fee", { precision: 10, scale: 2 }),
  currency: text("currency").default("USD"),
  requirements: text("requirements"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var scholarships = pgTable("scholarships", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  currency: text("currency").default("USD"),
  type: text("type"),
  // full, partial, merit-based, need-based
  eligibility: text("eligibility"),
  deadline: timestamp("deadline"),
  description: text("description"),
  applicationUrl: text("application_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  universityId: integer("university_id").references(() => universities.id),
  programId: integer("program_id").references(() => programs.id),
  status: text("status").default("pending"),
  // pending, approved, rejected, under_review
  personalInfo: jsonb("personal_info"),
  // Store form data as JSON
  documents: jsonb("documents"),
  // Store document URLs/info as JSON
  submittedAt: timestamp("submitted_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("new"),
  // new, responded, closed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  userId: varchar("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response"),
  isEscalated: boolean("is_escalated").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var universityRelations = relations(universities, ({ many }) => ({
  programs: many(programs),
  applications: many(applications)
}));
var programRelations = relations(programs, ({ one, many }) => ({
  university: one(universities, {
    fields: [programs.universityId],
    references: [universities.id]
  }),
  applications: many(applications)
}));
var applicationRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id]
  }),
  university: one(universities, {
    fields: [applications.universityId],
    references: [universities.id]
  }),
  program: one(programs, {
    fields: [applications.programId],
    references: [programs.id]
  })
}));
var userRelations = relations(users, ({ many }) => ({
  applications: many(applications),
  chatMessages: many(chatMessages)
}));
var insertUniversitySchema = createInsertSchema(universities).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertScholarshipSchema = createInsertSchema(scholarships).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  submittedAt: true,
  updatedAt: true
});
var insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc, ilike, count, or } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  // University operations
  async getUniversities(searchQuery, country, limit = 50) {
    let conditions = [eq(universities.isActive, true)];
    if (searchQuery) {
      conditions.push(
        or(
          ilike(universities.name, `%${searchQuery}%`),
          ilike(universities.location, `%${searchQuery}%`)
        )
      );
    }
    if (country) {
      conditions.push(eq(universities.country, country));
    }
    return await db.select().from(universities).where(and(...conditions)).orderBy(universities.ranking).limit(limit);
  }
  async getUniversity(id) {
    const [university] = await db.select().from(universities).where(eq(universities.id, id));
    return university;
  }
  async createUniversity(university) {
    const [created] = await db.insert(universities).values(university).returning();
    return created;
  }
  async updateUniversity(id, university) {
    const [updated] = await db.update(universities).set({ ...university, updatedAt: /* @__PURE__ */ new Date() }).where(eq(universities.id, id)).returning();
    return updated;
  }
  async deleteUniversity(id) {
    await db.update(universities).set({ isActive: false }).where(eq(universities.id, id));
  }
  // Program operations
  async getPrograms(universityId, level, field, limit = 50) {
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
    return await db.select().from(programs).where(and(...conditions)).orderBy(programs.name).limit(limit);
  }
  async getProgram(id) {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }
  async createProgram(program) {
    const [created] = await db.insert(programs).values(program).returning();
    return created;
  }
  async updateProgram(id, program) {
    const [updated] = await db.update(programs).set({ ...program, updatedAt: /* @__PURE__ */ new Date() }).where(eq(programs.id, id)).returning();
    return updated;
  }
  async deleteProgram(id) {
    await db.update(programs).set({ isActive: false }).where(eq(programs.id, id));
  }
  // Scholarship operations
  async getScholarships(limit = 50) {
    return await db.select().from(scholarships).where(eq(scholarships.isActive, true)).orderBy(desc(scholarships.createdAt)).limit(limit);
  }
  async getScholarship(id) {
    const [scholarship] = await db.select().from(scholarships).where(eq(scholarships.id, id));
    return scholarship;
  }
  async createScholarship(scholarship) {
    const [created] = await db.insert(scholarships).values(scholarship).returning();
    return created;
  }
  async updateScholarship(id, scholarship) {
    const [updated] = await db.update(scholarships).set({ ...scholarship, updatedAt: /* @__PURE__ */ new Date() }).where(eq(scholarships.id, id)).returning();
    return updated;
  }
  async deleteScholarship(id) {
    await db.update(scholarships).set({ isActive: false }).where(eq(scholarships.id, id));
  }
  // Application operations
  async getApplications(userId, status, limit = 50) {
    let conditions = [];
    if (userId) {
      conditions.push(eq(applications.userId, userId));
    }
    if (status) {
      conditions.push(eq(applications.status, status));
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : void 0;
    return await db.select().from(applications).where(whereClause).orderBy(desc(applications.submittedAt)).limit(limit);
  }
  async getApplication(id) {
    const [application] = await db.select().from(applications).where(eq(applications.id, id));
    return application;
  }
  async createApplication(application) {
    const [created] = await db.insert(applications).values(application).returning();
    return created;
  }
  async updateApplication(id, application) {
    const [updated] = await db.update(applications).set({ ...application, updatedAt: /* @__PURE__ */ new Date() }).where(eq(applications.id, id)).returning();
    return updated;
  }
  async getUserApplications(userId) {
    return await db.select().from(applications).where(eq(applications.userId, userId)).orderBy(desc(applications.submittedAt));
  }
  // Inquiry operations
  async getInquiries(status, limit = 50) {
    const whereClause = status ? eq(inquiries.status, status) : void 0;
    return await db.select().from(inquiries).where(whereClause).orderBy(desc(inquiries.createdAt)).limit(limit);
  }
  async createInquiry(inquiry) {
    const [created] = await db.insert(inquiries).values(inquiry).returning();
    return created;
  }
  async updateInquiry(id, inquiry) {
    const [updated] = await db.update(inquiries).set({ ...inquiry, updatedAt: /* @__PURE__ */ new Date() }).where(eq(inquiries.id, id)).returning();
    return updated;
  }
  // Chat operations
  async getChatMessages(sessionId, limit = 50) {
    return await db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(chatMessages.createdAt).limit(limit);
  }
  async createChatMessage(message) {
    const [created] = await db.insert(chatMessages).values(message).returning();
    return created;
  }
  // Dashboard stats
  async getDashboardStats() {
    const [totalApplicationsResult] = await db.select({ count: count() }).from(applications);
    const [activeStudentsResult] = await db.select({ count: count() }).from(users).where(eq(users.role, "user"));
    const [partnerUniversitiesResult] = await db.select({ count: count() }).from(universities).where(eq(universities.isActive, true));
    const [totalInquiriesResult] = await db.select({ count: count() }).from(inquiries);
    return {
      totalApplications: totalApplicationsResult.count,
      activeStudents: activeStudentsResult.count,
      partnerUniversities: partnerUniversitiesResult.count,
      totalInquiries: totalInquiriesResult.count
    };
  }
};
var storage = new DatabaseStorage();

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/services/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});
async function processEducationQuery(userMessage) {
  try {
    const prompt = `You are an AI education consultant assistant for Mtendere Education Consult, helping African students with international education opportunities.

User message: "${userMessage}"

Please provide a helpful response about education consulting, university applications, scholarships, or study abroad opportunities. If the query is complex or requires personal consultation, suggest escalating to WhatsApp for human assistance.

Respond with JSON format:
{
  "message": "Your helpful response",
  "shouldEscalate": boolean (true if complex query needs human help),
  "suggestedActions": ["action1", "action2"] (optional quick action buttons)
}`;
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful education consultant AI assistant specializing in international education for African students. Always be professional, encouraging, and informative."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 500
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      message: result.message || "I'm here to help with your education queries. How can I assist you today?",
      shouldEscalate: result.shouldEscalate || false,
      suggestedActions: result.suggestedActions || []
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      message: "I'm having trouble processing your request right now. Please try again or contact our team directly for assistance.",
      shouldEscalate: true,
      suggestedActions: ["Contact Support", "Try Again"]
    };
  }
}

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/universities", async (req, res) => {
    try {
      const { search, country, limit } = req.query;
      const universities2 = await storage.getUniversities(
        search,
        country,
        limit ? parseInt(limit) : void 0
      );
      res.json(universities2);
    } catch (error) {
      console.error("Error fetching universities:", error);
      res.status(500).json({ message: "Failed to fetch universities" });
    }
  });
  app2.get("/api/universities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const university = await storage.getUniversity(id);
      if (!university) {
        return res.status(404).json({ message: "University not found" });
      }
      res.json(university);
    } catch (error) {
      console.error("Error fetching university:", error);
      res.status(500).json({ message: "Failed to fetch university" });
    }
  });
  app2.get("/api/programs", async (req, res) => {
    try {
      const { universityId, level, field, limit } = req.query;
      const programs2 = await storage.getPrograms(
        universityId ? parseInt(universityId) : void 0,
        level,
        field,
        limit ? parseInt(limit) : void 0
      );
      res.json(programs2);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });
  app2.get("/api/scholarships", async (req, res) => {
    try {
      const { limit } = req.query;
      const scholarships2 = await storage.getScholarships(
        limit ? parseInt(limit) : void 0
      );
      res.json(scholarships2);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      res.status(500).json({ message: "Failed to fetch scholarships" });
    }
  });
  app2.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });
  app2.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      if (!message || !sessionId) {
        return res.status(400).json({ message: "Message and sessionId are required" });
      }
      const aiResponse = await processEducationQuery(message);
      await storage.createChatMessage({
        sessionId,
        message,
        response: aiResponse.message,
        isEscalated: aiResponse.shouldEscalate,
        userId: null
        // For anonymous users
      });
      res.json(aiResponse);
    } catch (error) {
      console.error("Error processing chat:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });
  app2.get("/api/user/applications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const applications2 = await storage.getUserApplications(userId);
      res.json(applications2);
    } catch (error) {
      console.error("Error fetching user applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });
  app2.post("/api/user/applications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertApplicationSchema.parse({
        ...req.body,
        userId
      });
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid application data", errors: error.errors });
      }
      console.error("Error creating application:", error);
      res.status(500).json({ message: "Failed to create application" });
    }
  });
  const requireAdmin = async (req, res, next) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Authorization check failed" });
    }
  };
  app2.get("/api/admin/dashboard/stats", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });
  app2.post("/api/admin/universities", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertUniversitySchema.parse(req.body);
      const university = await storage.createUniversity(validatedData);
      res.status(201).json(university);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid university data", errors: error.errors });
      }
      console.error("Error creating university:", error);
      res.status(500).json({ message: "Failed to create university" });
    }
  });
  app2.put("/api/admin/universities/:id", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertUniversitySchema.partial().parse(req.body);
      const university = await storage.updateUniversity(id, validatedData);
      res.json(university);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid university data", errors: error.errors });
      }
      console.error("Error updating university:", error);
      res.status(500).json({ message: "Failed to update university" });
    }
  });
  app2.delete("/api/admin/universities/:id", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteUniversity(id);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting university:", error);
      res.status(500).json({ message: "Failed to delete university" });
    }
  });
  app2.post("/api/admin/programs", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const program = await storage.createProgram(validatedData);
      res.status(201).json(program);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid program data", errors: error.errors });
      }
      console.error("Error creating program:", error);
      res.status(500).json({ message: "Failed to create program" });
    }
  });
  app2.put("/api/admin/programs/:id", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProgramSchema.partial().parse(req.body);
      const program = await storage.updateProgram(id, validatedData);
      res.json(program);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid program data", errors: error.errors });
      }
      console.error("Error updating program:", error);
      res.status(500).json({ message: "Failed to update program" });
    }
  });
  app2.delete("/api/admin/programs/:id", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProgram(id);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting program:", error);
      res.status(500).json({ message: "Failed to delete program" });
    }
  });
  app2.get("/api/admin/applications", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const { status, limit } = req.query;
      const applications2 = await storage.getApplications(
        void 0,
        status,
        limit ? parseInt(limit) : void 0
      );
      res.json(applications2);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });
  app2.put("/api/admin/applications/:id", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const application = await storage.updateApplication(id, { status });
      res.json(application);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ message: "Failed to update application" });
    }
  });
  app2.get("/api/admin/inquiries", isAuthenticated, requireAdmin, async (req, res) => {
    try {
      const { status, limit } = req.query;
      const inquiries2 = await storage.getInquiries(
        status,
        limit ? parseInt(limit) : void 0
      );
      res.json(inquiries2);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
