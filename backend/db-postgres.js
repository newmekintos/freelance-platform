import pg from 'pg';
const { Pool } = pg;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database tables
export async function initDatabase() {
  const client = await pool.connect();
  try {
    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        bio TEXT,
        skills TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        budget TEXT,
        deadline TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        price TEXT,
        delivery_time TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Applications table
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        job_id TEXT REFERENCES jobs(id) ON DELETE CASCADE,
        applicant_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Conversations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        user1_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        user2_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        last_message TEXT,
        last_message_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user1_id, user2_id)
      )
    `);

    // Messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT REFERENCES conversations(id) ON DELETE CASCADE,
        sender_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        receiver_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Database class for each table
class PostgresDatabase {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async create(item) {
    const keys = Object.keys(item);
    const values = Object.values(item);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const columns = keys.map(k => k.replace(/([A-Z])/g, '_$1').toLowerCase()).join(', ');
    
    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);
    return this.snakeToCamel(result.rows[0]);
  }

  async findById(id) {
    const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rows[0] ? this.snakeToCamel(result.rows[0]) : null;
  }

  async findOne(query) {
    const keys = Object.keys(query);
    const values = Object.values(query);
    const conditions = keys.map((k, i) => `${k.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${i + 1}`).join(' AND ');
    
    const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE ${conditions} LIMIT 1`, values);
    return result.rows[0] ? this.snakeToCamel(result.rows[0]) : null;
  }

  async find(query = {}) {
    if (Object.keys(query).length === 0) {
      const result = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY created_at DESC`);
      return result.rows.map(row => this.snakeToCamel(row));
    }

    const keys = Object.keys(query);
    const values = Object.values(query);
    const conditions = keys.map((k, i) => `${k.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${i + 1}`).join(' AND ');
    
    const result = await pool.query(`SELECT * FROM ${this.tableName} WHERE ${conditions} ORDER BY created_at DESC`, values);
    return result.rows.map(row => this.snakeToCamel(row));
  }

  async update(id, updates) {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const sets = keys.map((k, i) => `${k.replace(/([A-Z])/g, '_$1').toLowerCase()} = $${i + 1}`).join(', ');
    
    const result = await pool.query(
      `UPDATE ${this.tableName} SET ${sets} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0] ? this.snakeToCamel(result.rows[0]) : null;
  }

  async delete(id) {
    const result = await pool.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rowCount > 0;
  }

  // Helper: Convert snake_case to camelCase
  snakeToCamel(obj) {
    const camelObj = {};
    for (const key in obj) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      camelObj[camelKey] = obj[key];
    }
    return camelObj;
  }
}

export const usersDB = new PostgresDatabase('users');
export const jobsDB = new PostgresDatabase('jobs');
export const servicesDB = new PostgresDatabase('services');
export const applicationsDB = new PostgresDatabase('applications');
export const messagesDB = new PostgresDatabase('messages');
export const conversationsDB = new PostgresDatabase('conversations');
