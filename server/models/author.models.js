const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
        // validate: {
        //     validator: (val) =>
        //         val.length >= 3 || val.length === 0,
        //     message: () => "Name must be at least 3 characters"
        //     },
        }
    },
    { timestamps: true }
);



const Author = mongoose.model("Author", AuthorSchema)

module.exports = Author;