import { 
  users, applications, blogPosts, siteData, mediaFiles,
  type User, type InsertUser, type Application, type InsertApplication,
  type BlogPost, type InsertBlogPost, type SiteData, type InsertSiteData,
  type MediaFile, type InsertMediaFile
} from "@shared/schema";
import { ScrapedContent } from "./scraper";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  
  // Applications
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, application: Partial<InsertApplication>): Promise<Application | undefined>;
  deleteApplication(id: number): Promise<boolean>;
  getAllApplications(): Promise<Application[]>;
  getApplicationsByUser(userId: number): Promise<Application[]>;
  
  // Blog Posts
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  
  // Site Data
  getSiteData(): Promise<SiteData | undefined>;
  updateSiteData(data: ScrapedContent): Promise<SiteData>;
  
  // Media Files
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<boolean>;
  getAllMediaFiles(): Promise<MediaFile[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private applications: Map<number, Application> = new Map();
  private blogPosts: Map<number, BlogPost> = new Map();
  private siteDataStore: SiteData | undefined;
  private mediaFiles: Map<number, MediaFile> = new Map();
  private currentUserId = 1;
  private currentApplicationId = 1;
  private currentBlogPostId = 1;
  private currentMediaFileId = 1;

  constructor() {
    // Create default admin user
    this.createUser({
      username: "admin",
      email: "admin@mtendere.com",
      password: "$2b$10$rQK.9g8f9qKvZWZH5nQR8eHnM4uMKe7v7bKbQ8r1n2ZPbQHQ9vWzG", // "admin123"
      role: "admin",
      isActive: true
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: insertUser.email,
      role: insertUser.role || 'user',
      isActive: insertUser.isActive !== undefined ? insertUser.isActive : true,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updateData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Applications
  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      id,
      email: insertApplication.email,
      userId: insertApplication.userId || null,
      status: insertApplication.status || 'pending',
      university: insertApplication.university,
      program: insertApplication.program,
      intakeMonth: insertApplication.intakeMonth,
      fullName: insertApplication.fullName,
      passportNumber: insertApplication.passportNumber,
      dateOfBirth: insertApplication.dateOfBirth,
      academicQualification: insertApplication.academicQualification,
      programReason: insertApplication.programReason,
      learningStyle: insertApplication.learningStyle,
      personalityTraits: insertApplication.personalityTraits,
      logicAnswer: insertApplication.logicAnswer,
      hobbies: insertApplication.hobbies,
      cvPath: insertApplication.cvPath || null,
      transcriptPath: insertApplication.transcriptPath || null,
      createdAt: new Date()
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplication(id: number, updateData: Partial<InsertApplication>): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, ...updateData };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  async deleteApplication(id: number): Promise<boolean> {
    return this.applications.delete(id);
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async getApplicationsByUser(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.userId === userId);
  }

  // Blog Posts
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = {
      id,
      title: insertBlogPost.title,
      content: insertBlogPost.content,
      headerColor: insertBlogPost.headerColor || null,
      textColor: insertBlogPost.textColor || null,
      imagePath: insertBlogPost.imagePath || null,
      isPublished: insertBlogPost.isPublished !== undefined ? insertBlogPost.isPublished : false,
      authorId: insertBlogPost.authorId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const blogPost = this.blogPosts.get(id);
    if (!blogPost) return undefined;
    
    const updatedBlogPost = { 
      ...blogPost, 
      ...updateData, 
      updatedAt: new Date() 
    };
    this.blogPosts.set(id, updatedBlogPost);
    return updatedBlogPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.isPublished);
  }

  // Site Data
  async getSiteData(): Promise<SiteData | undefined> {
    return this.siteDataStore;
  }

  async updateSiteData(data: ScrapedContent): Promise<SiteData> {
    const siteData: SiteData = {
      id: 1,
      data: data as any,
      lastUpdated: new Date()
    };
    this.siteDataStore = siteData;
    return siteData;
  }

  // Media Files
  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    return this.mediaFiles.get(id);
  }

  async createMediaFile(insertMediaFile: InsertMediaFile): Promise<MediaFile> {
    const id = this.currentMediaFileId++;
    const mediaFile: MediaFile = {
      id,
      path: insertMediaFile.path,
      filename: insertMediaFile.filename,
      originalName: insertMediaFile.originalName,
      mimetype: insertMediaFile.mimetype,
      size: insertMediaFile.size,
      uploadedBy: insertMediaFile.uploadedBy || null,
      createdAt: new Date()
    };
    this.mediaFiles.set(id, mediaFile);
    return mediaFile;
  }

  async deleteMediaFile(id: number): Promise<boolean> {
    return this.mediaFiles.delete(id);
  }

  async getAllMediaFiles(): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values());
  }
}

export const storage = new MemStorage();
