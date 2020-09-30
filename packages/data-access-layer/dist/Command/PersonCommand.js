"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCommand = void 0;
const Command_1 = require("./Command");
const PersonSql_1 = require("../Sql/PersonSql");
class PersonCommand extends Command_1.Command {
    constructor(connectionString) {
        super(connectionString);
    }
    all(params = {}) {
        return this.exec(({ db, resolve, reject }) => {
            db.all(PersonSql_1.personSql.all, { $first: params.first || 10, $offset: params.offset || 0 }, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
            db.close();
        });
    }
    find(email) {
        return this.exec(({ db, resolve, reject }) => {
            db.get(PersonSql_1.personSql.find, { $email: email }, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
            db.close();
        });
    }
    get(id) {
        return this.exec(({ db, resolve, reject }) => {
            this.cmdFlowGet({ db, resolve, reject }, id);
            db.close();
        });
    }
    set(input) {
        const that = this;
        const cmd = this.setCmd(input);
        return this.exec(({ db, resolve, reject }) => {
            db.run(PersonSql_1.personSql[cmd], {
                $authName: input.authName,
                $authId: input.authId,
                $email: "bidule",
                $famillyName: input.famillyName,
                $nickName: input.nickName,
                $roleFlag: 0 //input.roleFlag,
            }, function (err) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(err);
                    }
                    else {
                        that.cmdFlowGet({ db, resolve, reject }, cmd === "insert" ? this.lastID : input.id);
                    }
                });
            });
            db.close();
        });
    }
    del(id) {
        return this.exec(({ db, resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            let entity = yield this.get(id);
            db.run(PersonSql_1.personSql.del, { $id: id }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(entity);
                }
            });
            db.close();
        }));
    }
    cmdFlowGet({ db, resolve, reject }, id) {
        db.get(PersonSql_1.personSql.get, { $id: id }, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    }
}
exports.PersonCommand = PersonCommand;
PersonCommand.TableName = "person";
//# sourceMappingURL=PersonCommand.js.map