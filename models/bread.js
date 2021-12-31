// require mongoose
const mongoose = require("mongoose");

//creating shorthand for the Schema constructor
const { Schema } = mongoose;



const breadSchema = new Schema({
  // schema here
  name: { type: String, required: true },
  HasGluten: Boolean,
  image: {
    type: String,
    default:
      "https://th.bing.com/th/id/R.d09bcd9708fe2dbe4ad380d8cf0bc5ff?rik=1mGT8EGvt%2f6WCQ&pid=ImgRaw&r=0",
  },

  baker: {
    type: Schema.Types.ObjectId,
    ref: "Baker",
  },
});

// helper method
breadSchema.methods.getBakedBy = function () {
  return `${this.name} was baked with love by ${
    this.baker.name
  }, who has been with us since ${this.baker.startDate.getFullYear()}`;
};

//model & export
const Bread = mongoose.model("Bread", breadSchema);
module.exports = Bread;

