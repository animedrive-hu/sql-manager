const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(config) {
        this.config = config;
        this.db = null;
    }

    async connect() {
        if (this.config.type === 'mysql') {
            this.db = await mysql.createPool({
                host: this.config.host,
                user: this.config.user,
                password: this.config.password,
                database: this.config.database,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
        } else if (this.config.type === 'sqlite') {
            this.db = new sqlite3.Database(this.config.database, (err) => {
                if (err) console.error('SQLite connection error:', err.message);
            });
        } else {
            throw new Error('Unsupported database type');
        }
    }

    async query(sql, params = []) {
        if (this.config.type === 'mysql') {
            const [rows] = await this.db.execute(sql, params);
            return rows;
        } else if (this.config.type === 'sqlite') {
            return new Promise((resolve, reject) => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
        }
    }

    async close() {
        if (this.config.type === 'mysql') {
            await this.db.end();
        } else if (this.config.type === 'sqlite') {
            this.db.close((err) => {
                if (err) console.error('Error closing SQLite database:', err.message);
            });
        }
    }
}

module.exports = Database;
