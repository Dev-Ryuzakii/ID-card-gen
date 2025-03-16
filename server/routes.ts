import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIdCardSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/id-cards", async (req, res) => {
    try {
      const cardData = insertIdCardSchema.parse(req.body);
      const card = await storage.createIdCard(cardData);
      res.json(card);
    } catch (error) {
      res.status(400).json({ error: String(error) });
    }
  });

  app.get("/api/id-cards/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const card = await storage.getIdCard(id);
    if (!card) {
      res.status(404).json({ error: "ID card not found" });
      return;
    }
    res.json(card);
  });

  app.get("/api/id-cards", async (_req, res) => {
    const cards = await storage.getAllIdCards();
    res.json(cards);
  });

  const httpServer = createServer(app);
  return httpServer;
}
