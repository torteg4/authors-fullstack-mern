const Author = require("../models/author.models")

module.exports = {

    findAll: (req,res) => {
        Author.find()
            .then((allAuthors) => res.json(allAuthors))
            .catch((err) =>
                res.json({message:"Something went wrong with findAll", error:err})
            );
        },
        
        
    findOne: (req,res) => {
        Author.findById(req.params.id)
            .then((author) => res.json(author))
            .catch((err)=>
                    res.json({message:"Something went wrong with findAll", error:err})
        );
    },

    create: (req,res) => {
        Author.create(req.body)
            .then((newAuthor) => res.json(newAuthor))
            .catch((err) =>
                res.json({message:"Something went wrong with create", error:err})
        );
    },

    update: (req,res) => {
        Author.findByIdAndUpdate(req.params.id, req.body)
            .then((updatedAuthor) => res.json(updatedAuthor))
            .catch(err =>
                res.json({message:"Something went wrong with updating author", error:err})
            );
    },

    destroy: (req,res) => {
        Author.findByIdAndDelete(req.params.id)
            .then((deletedAuthor) => res.json(deletedAuthor))
            .catch((err) =>
            res.json({message:"Something went wrong with deleting author", error:err})
        );
    }
};