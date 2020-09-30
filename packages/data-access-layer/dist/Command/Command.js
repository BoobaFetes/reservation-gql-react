"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const sqlite3_1 = require("sqlite3");
class Command {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    exec(action, closeDb = true) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3_1.Database(this.connectionString, sqlite3_1.OPEN_READWRITE, (err) => {
                if (err) {
                    reject(err);
                }
            });
            try {
                action({ db, resolve, reject });
            }
            catch (err) {
                db.close((err) => {
                    if (err) {
                        reject(err);
                    }
                });
                reject(err);
            }
        });
    }
    setCmd(input) {
        return input.id ? "update" : "insert";
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map