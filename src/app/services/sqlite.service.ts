import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { CapacitorSQLite } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  sqlite: SQLiteConnection | null = null;
  db: SQLiteDBConnection | null = null;

  constructor() {
    this.init();
  }

  async init() {
    try {
      if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
        this.sqlite = new SQLiteConnection(CapacitorSQLite);
      }
    } catch (e) {
      console.error('Error al inicializar SQLite:', e);
    }
  }

  // Crear la base de datos y la tabla
  async createDatabase() {
    if (this.sqlite) {
      this.db = await this.sqlite.createConnection('my-database', false, 'no-encryption', 1, false);
      await this.db.open();

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL
        );
      `;
      await this.db.execute(createTableQuery);
    }
  }

  // Insertar usuario en la base de datos
  async addUser(username: string, password: string, role: string) {
    if (this.db) {
      const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?);`;
      const values = [username, password, role];
      await this.db.run(query, values);
    }
  }

  // Obtener todos los usuarios
  async getUsers() {
    if (this.db) {
      const query = `SELECT * FROM users;`;
      const result = await this.db.query(query);
      return result.values;
    }
    return [];
  }

  // Cerrar la conexión con la base de datos
  async closeConnection() {
    if (this.db && this.sqlite) {
      try {
        await this.sqlite.closeConnection('my-database', false);
        this.db = null;  // Resetear la conexión de base de datos
      } catch (e) {
        console.error('Error cerrando la conexión con SQLite:', e);
      }
    } else {
      console.warn('No hay una conexión activa para cerrar.');
    }
  }

  // Obtener un usuario por nombre de usuario
  async getUserByUsername(username: string) {
    if (this.db) {
      const query = `SELECT * FROM users WHERE username = ?;`;
      const result = await this.db.query(query, [username]);

      // Verificamos si el resultado y el campo values están definidos
      if (result && result.values && result.values.length > 0) {
        return result.values[0];
      }
      return null;  // Si no hay resultados, devolvemos null
    }
    return null;  // Si no hay conexión a la base de datos
  }

}
