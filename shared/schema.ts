import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // admin, user, applicant
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  university: text("university").notNull(),
  program: text("program").notNull(),
  intakeMonth: text("intake_month").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  passportNumber: text("passport_number").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  academicQualification: text("academic_qualification").notNull(),
  cvPath: text("cv_path"),
  transcriptPath: text("transcript_path"),
  programReason: text("program_reason").notNull(),
  learningStyle: text("learning_style").notNull(),
  personalityTraits: text("personality_traits").notNull(),
  logicAnswer: text("logic_answer").notNull(),
  hobbies: text("hobbies").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  headerColor: text("header_color").default("#1e40af"),
  textColor: text("text_color").default("#374151"),
  imagePath: text("image_path"),
  isPublished: boolean("is_published").notNull().default(false),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteData = pgTable("site_data", {
  id: serial("id").primaryKey(),
  data: jsonb("data").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  uploadedBy: integer("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSiteDataSchema = createInsertSchema(siteData).omit({
  id: true,
  lastUpdated: true,
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type SiteData = typeof siteData.$inferSelect;
export type InsertSiteData = z.infer<typeof insertSiteDataSchema>;
export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
