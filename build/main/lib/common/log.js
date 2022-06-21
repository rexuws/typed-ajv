"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const debug_1 = __importDefault(require("debug"));
debug_1.default.enable('TypedAjv');
debug_1.default.selectColor('TypedAjv');
exports.Logger = (0, debug_1.default)('TypedAjv');
