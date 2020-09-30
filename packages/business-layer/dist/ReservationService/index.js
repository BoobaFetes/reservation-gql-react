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
exports.ReservationService = void 0;
class ReservationService {
    constructor(reservationCmd) {
        this.command = reservationCmd;
    }
    all(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command.all(params);
        });
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command.find(filter);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command.get(id);
        });
    }
    set(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command.set(entry);
        });
    }
    del(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.command.del(id);
        });
    }
}
exports.ReservationService = ReservationService;
//# sourceMappingURL=index.js.map