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
const cutUserSensitiveData_1 = __importDefault(require("../functions/cutUserSensitiveData"));
exports.default = (login) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(resolve => {
        const Model = require('../models/user');
        Model.findOne({ login })
            .then((response) => __awaiter(void 0, void 0, void 0, function* () {
            let user = {};
            if (response) {
                user = yield (0, cutUserSensitiveData_1.default)([response]);
                user = user[0];
            }
            resolve(user);
        }));
    });
});
