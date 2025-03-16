import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const idCards = pgTable("id_cards", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  level: text("level").notNull(),
  matricNumber: text("matric_number").notNull(),
  department: text("department").notNull(),
  registrationNumber: text("registration_number").notNull(),
  photoUrl: text("photo_url").notNull(),
  institutionName: text("institution_name").notNull(),
  institutionLogo: text("institution_logo").notNull(),
  institutionAddress: text("institution_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertIdCardSchema = createInsertSchema(idCards).omit({
  id: true,
  createdAt: true,
}).extend({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  level: z.string().min(1, "Level is required"),
  matricNumber: z.string().min(1, "Matriculation number is required"),
  department: z.string().min(1, "Department is required"),
  registrationNumber: z.string(),
  photoUrl: z.string().url("Invalid photo URL"),
  institutionName: z.string().min(2, "Institution name is required"),
  institutionLogo: z.string().url("Invalid logo URL"),
  institutionAddress: z.string().min(5, "Address is required"),
});

export type InsertIdCard = z.infer<typeof insertIdCardSchema>;
export type IdCard = typeof idCards.$inferSelect;
