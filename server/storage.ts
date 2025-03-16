import { idCards, type IdCard, type InsertIdCard } from "@shared/schema";

export interface IStorage {
  createIdCard(card: InsertIdCard): Promise<IdCard>;
  getIdCard(id: number): Promise<IdCard | undefined>;
  getAllIdCards(): Promise<IdCard[]>;
}

export class MemStorage implements IStorage {
  private idCards: Map<number, IdCard>;
  private currentId: number;

  constructor() {
    this.idCards = new Map();
    this.currentId = 1;
  }

  async createIdCard(card: InsertIdCard): Promise<IdCard> {
    const id = this.currentId++;
    const timestamp = new Date();
    const idCard: IdCard = { ...card, id, createdAt: timestamp };
    this.idCards.set(id, idCard);
    return idCard;
  }

  async getIdCard(id: number): Promise<IdCard | undefined> {
    return this.idCards.get(id);
  }

  async getAllIdCards(): Promise<IdCard[]> {
    return Array.from(this.idCards.values());
  }
}

export const storage = new MemStorage();
