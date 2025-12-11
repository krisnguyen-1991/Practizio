import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file paths
const DB_DIR = __dirname;
const PRACTICES_DB = path.join(DB_DIR, 'mini-practices.json');
const PROMPTS_DB = path.join(DB_DIR, 'system-prompts.json');

// Initialize database files if they don't exist
function initFile(filePath, defaultData = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
}

// Initialize database
export function initializeDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  
  initFile(PRACTICES_DB, []);
  initFile(PROMPTS_DB, []);
  
  console.log('✅ Database initialized successfully');
}

// Read from JSON file
function readDB(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Write to JSON file
function writeDB(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    throw error;
  }
}

// Mini Practices Database Operations
export const practicesDB = {
  getAll() {
    return readDB(PRACTICES_DB);
  },
  
  getById(id) {
    const practices = readDB(PRACTICES_DB);
    return practices.find(p => p.id === parseInt(id));
  },
  
  create(practice) {
    const practices = readDB(PRACTICES_DB);
    const newId = practices.length > 0 ? Math.max(...practices.map(p => p.id)) + 1 : 1;
    const newPractice = {
      id: newId,
      ...practice,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    practices.push(newPractice);
    writeDB(PRACTICES_DB, practices);
    return newId;
  },
  
  update(id, updates) {
    const practices = readDB(PRACTICES_DB);
    const index = practices.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Practice not found');
    }
    
    practices[index] = {
      ...practices[index],
      ...updates,
      id: practices[index].id, // Keep original ID
      created_at: practices[index].created_at, // Keep original created date
      updated_at: new Date().toISOString()
    };
    
    writeDB(PRACTICES_DB, practices);
    return practices[index];
  },
  
  delete(id) {
    const practices = readDB(PRACTICES_DB);
    const filtered = practices.filter(p => p.id !== parseInt(id));
    writeDB(PRACTICES_DB, filtered);
    
    // Also delete associated system prompt
    promptsDB.deleteByPracticeId(id);
  },
  
  search(term) {
    const practices = readDB(PRACTICES_DB);
    const lowerTerm = term.toLowerCase();
    return practices.filter(p => 
      p.title.toLowerCase().includes(lowerTerm) ||
      p.description.toLowerCase().includes(lowerTerm)
    );
  },
  
  getByCategory(category) {
    const practices = readDB(PRACTICES_DB);
    return practices.filter(p => p.category === category);
  },
  
  getCategories() {
    const practices = readDB(PRACTICES_DB);
    const categories = [...new Set(practices.map(p => p.category))];
    return categories.sort();
  }
};

// System Prompts Database Operations
export const promptsDB = {
  getAll() {
    return readDB(PROMPTS_DB);
  },
  
  getById(id) {
    const prompts = readDB(PROMPTS_DB);
    return prompts.find(p => p.id === parseInt(id));
  },
  
  getByPracticeId(practiceId) {
    const prompts = readDB(PROMPTS_DB);
    return prompts.find(p => p.practice_id === parseInt(practiceId));
  },
  
  create(prompt) {
    const prompts = readDB(PROMPTS_DB);
    
    // Check if practice already has a prompt (enforce 1-to-1)
    const existing = prompts.find(p => p.practice_id === prompt.practiceId);
    if (existing) {
      throw new Error('This practice already has a system prompt. Use update instead.');
    }
    
    const newId = prompts.length > 0 ? Math.max(...prompts.map(p => p.id)) + 1 : 1;
    const newPrompt = {
      id: newId,
      practice_id: prompt.practiceId,
      content: prompt.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    prompts.push(newPrompt);
    writeDB(PROMPTS_DB, prompts);
    return newId;
  },
  
  update(id, updates) {
    const prompts = readDB(PROMPTS_DB);
    const index = prompts.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('System prompt not found');
    }
    
    prompts[index] = {
      ...prompts[index],
      content: updates.content,
      updated_at: new Date().toISOString()
    };
    
    writeDB(PROMPTS_DB, prompts);
    return prompts[index];
  },
  
  updateByPracticeId(practiceId, updates) {
    const existing = this.getByPracticeId(practiceId);
    
    if (existing) {
      return this.update(existing.id, updates);
    } else {
      const id = this.create({ practiceId, content: updates.content });
      return this.getById(id);
    }
  },
  
  delete(id) {
    const prompts = readDB(PROMPTS_DB);
    const filtered = prompts.filter(p => p.id !== parseInt(id));
    writeDB(PROMPTS_DB, filtered);
  },
  
  deleteByPracticeId(practiceId) {
    const prompts = readDB(PROMPTS_DB);
    const filtered = prompts.filter(p => p.practice_id !== parseInt(practiceId));
    writeDB(PROMPTS_DB, filtered);
  }
};

// Helper functions for compatibility
export function query(tableName) {
  if (tableName === 'mini_practices') {
    return practicesDB.getAll();
  } else if (tableName === 'system_prompts') {
    return promptsDB.getAll();
  }
  return [];
}

export function get(tableName, id) {
  if (tableName === 'mini_practices') {
    return practicesDB.getById(id);
  } else if (tableName === 'system_prompts') {
    return promptsDB.getById(id);
  }
  return null;
}

export function run(operation, data) {
  // This is a simplified version for compatibility
  return { success: true };
}
