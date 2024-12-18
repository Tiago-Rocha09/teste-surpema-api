"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        console.log({ err });
        if (err instanceof zod_1.ZodError) {
            const formattedErrors = err.errors.map((issue) => {
                const path = issue.path.join(".");
                return `${path}: ${issue.message}`;
            });
            res.status(400).json({ errors: formattedErrors });
        }
        else {
            next(err);
        }
    }
};
exports.validate = validate;
