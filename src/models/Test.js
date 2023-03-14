const { Schema, model } = require("mongoose");

const TestSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

TestSchema.set("toObject", { virtuals: true });
TestSchema.set("toJSON", { virtuals: true });

const Test = model("test", TestSchema);
module.exports = { Test };