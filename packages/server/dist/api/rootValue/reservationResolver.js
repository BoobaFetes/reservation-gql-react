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
exports.reservationResolver = void 0;
exports.reservationResolver = (reservationService) => ({
    allReservation: ({ offset, first }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield reservationService.all({ offset, first });
    }),
    findReservation: (filter) => __awaiter(void 0, void 0, void 0, function* () {
        return yield reservationService.find(filter);
    }),
    getReservation: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!id)
            return null;
        return yield reservationService.get(id);
    }),
    delReservation: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!id)
            return null;
        return yield reservationService.del(id);
    }),
    setReservation: ({ entry }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield reservationService.set(entry);
    }),
});
//# sourceMappingURL=reservationResolver.js.map