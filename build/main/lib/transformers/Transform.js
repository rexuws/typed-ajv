"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transform = void 0;
const MetaStorage_1 = require("../common/MetaStorage");
function Transform(transform) {
    return (target, key) => {
        MetaStorage_1.MetaStorage.apply(target, key, {
            transform: transform,
        });
    };
}
exports.Transform = Transform;
