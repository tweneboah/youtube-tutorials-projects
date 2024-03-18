const mongoose = require("mongoose");

const profanityFilterSchema = new mongoose.Schema({
  bannedWords: [String],
});

module.exports = mongoose.model("ProfanityFilter", profanityFilterSchema);
