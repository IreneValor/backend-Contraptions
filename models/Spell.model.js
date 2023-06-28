const { Schema, model } = require("mongoose");
// const { Character } = require("./Character.model");

const spellSchema = new Schema({
  index: {
    type: String,
    unique: false,
  },
  name: {
    type: String,
    required: true,
  },
  desc: [String],
  higher_level: [String],
  range: String,
  components: [String],
  material: String,
  ritual: Boolean,
  duration: String,
  concentration: Boolean,
  casting_time: String,
  level: {
    type: Number,
    required: true,
  },
  attack_type: String,
  damage: {
    damage_type: {
      index: String,
      name: String,
      url: String,
    },
    damage_at_slot_level: Object,
  },
  school: {
    index: String,
    name: String,
    url: String,
  },
  classes: [
    {
      index: String,
      name: String,
      url: String,
    },
  ],
  subclasses: [
    {
      index: String,
      name: String,
      url: String,
    },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  url: String,
  // characters: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Character", // Accede al modelo Character
  //   },
  // ],
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Spell = model("Spell", spellSchema);

module.exports = Spell;
