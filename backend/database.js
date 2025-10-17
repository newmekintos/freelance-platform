import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, 'data');

class Database {
  constructor(filename) {
    this.filepath = path.join(dataDir, filename);
  }

  async read() {
    try {
      const data = await fs.readFile(this.filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async write(data) {
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
  }

  async create(item) {
    const items = await this.read();
    items.push(item);
    await this.write(items);
    return item;
  }

  async findById(id) {
    const items = await this.read();
    return items.find(item => item.id === id);
  }

  async findOne(query) {
    const items = await this.read();
    return items.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async find(query = {}) {
    const items = await this.read();
    if (Object.keys(query).length === 0) return items;
    
    return items.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async update(id, updates) {
    const items = await this.read();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = { ...items[index], ...updates };
    await this.write(items);
    return items[index];
  }

  async delete(id) {
    const items = await this.read();
    const filtered = items.filter(item => item.id !== id);
    await this.write(filtered);
    return filtered.length < items.length;
  }
}

export const usersDB = new Database('users.json');
export const jobsDB = new Database('jobs.json');
export const servicesDB = new Database('services.json');
export const applicationsDB = new Database('applications.json');
export const messagesDB = new Database('messages.json');
export const conversationsDB = new Database('conversations.json');
