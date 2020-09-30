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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationCommand = void 0;
const Command_1 = require("./Command");
const moment_1 = __importDefault(require("moment"));
const ReservationSql_1 = require("../Sql/ReservationSql");
const relReservationPersonSql_1 = require("../Sql/relReservationPersonSql");
const PersonSql_1 = require("../Sql/PersonSql");
class ReservationCommand extends Command_1.Command {
    constructor(connectionString) {
        super(connectionString);
    }
    all(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exec(({ db, resolve, reject }) => {
                db.all(ReservationSql_1.reservationSql.all, {
                    $first: params.first || ReservationCommand.MaxCount,
                    $offset: params.offset || 0,
                }, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows.map((r) => (Object.assign(Object.assign({}, r), { persons: undefined }))));
                    }
                    db.close();
                });
            });
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            return this.exec(({ db, resolve, reject }) => {
                db.all(ReservationSql_1.reservationSql.find(filter.end), {
                    $start: filter.start,
                    $first: filter.first || ReservationCommand.MaxCount,
                    $offset: filter.offset || 0,
                }, function (err, reservations) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (!reservations || reservations.length === 0) {
                            resolve([]);
                            return;
                        }
                        const reservationIdSet = new Set(reservations.map((r) => r.id));
                        db.all(relReservationPersonSql_1.relReservationPersonSql.findPersonIds(Array.from(reservationIdSet)), function (err, rel = []) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            const personByReservation = rel.reduce((mem, _rel) => {
                                if (!mem[_rel.reservationId]) {
                                    mem[_rel.reservationId] = [];
                                }
                                if (!mem[_rel.reservationId].includes(_rel.personId)) {
                                    mem[_rel.reservationId].push(_rel.personId);
                                }
                                return mem;
                            }, {});
                            db.all(PersonSql_1.personSql.findByIds(rel.map((p) => p.personId)), function (err, persons) {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                const personByItsId = persons.reduce((mem, person) => {
                                    mem[person.id] = person;
                                    return mem;
                                }, {});
                                const result = reservations.reduce((mem, resa) => {
                                    mem.push(Object.assign(Object.assign({}, resa), { persons: (personByReservation[resa.id] || []).map((pId) => personByItsId[pId]) }));
                                    return mem;
                                }, []);
                                resolve(result);
                            });
                        });
                    }
                });
                db.close();
            });
        });
    }
    get(id, closeDb = true) {
        return this.exec((params) => {
            this.cmdFlowGet(params, id);
            if (closeDb) {
                params.db.close();
            }
        });
    }
    set(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            return this.exec(({ db, resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                const cmd = this.setCmd(input);
                const params = {
                    $start: moment_1.default(input.start).format(),
                    $end: moment_1.default(input.end).format(),
                    $type: input.type,
                };
                if (cmd === "insert") {
                    params["$id"] = input.id;
                }
                db.serialize(function () {
                    db.run(ReservationSql_1.reservationSql[cmd], params, function (err) {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject(err);
                                db.close();
                                return;
                            }
                            const id = cmd === "insert" ? this.lastID : input.id;
                            db.run(relReservationPersonSql_1.relReservationPersonSql.del, { $reservationId: id });
                            db.parallelize(() => {
                                input.persons.forEach((personId) => {
                                    db.run(relReservationPersonSql_1.relReservationPersonSql.insert, {
                                        $reservationId: id,
                                        $personId: personId,
                                    });
                                });
                            });
                            that.cmdFlowGet({ db, resolve, reject }, id);
                            db.close();
                        });
                    });
                });
            }));
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exec(({ db, resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                const entity = yield this.get(id);
                db.run("BEGIN TRANSACTION;");
                try {
                    db.run(relReservationPersonSql_1.relReservationPersonSql.del, { $reservationId: id });
                    db.run(ReservationSql_1.reservationSql.del, { $id: id });
                    resolve(entity);
                    db.run("COMMIT;");
                }
                catch (error) {
                    db.run("ROLLBACK;");
                    reject(error);
                }
                db.close();
            }));
        });
    }
    cmdFlowGet({ db, resolve, reject }, id) {
        db.get(ReservationSql_1.reservationSql.get, { $id: id }, function (err, item) {
            if (err) {
                reject(err);
            }
            else {
                if (!item) {
                    resolve(item);
                    return;
                }
                db.all(relReservationPersonSql_1.relReservationPersonSql.findPersonIds([id]), function (err, rel = []) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    db.all(PersonSql_1.personSql.findByIds(rel.map((p) => p.personId)), function (err, rows) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(Object.assign(Object.assign({}, item), { persons: rows }));
                    });
                });
            }
        });
    }
}
exports.ReservationCommand = ReservationCommand;
ReservationCommand.MaxCount = 10;
//# sourceMappingURL=ReservationCommand.js.map