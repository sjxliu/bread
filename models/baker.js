const mongoose = require("mongoose");
const { Schema } = mongoose;
const Bread = require("./bread");


//schema
const bakerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Rachel", "Monica", "Joey", "Chandler", "Ross", "Phoebe"],
    },
    startDate: { 
      type: Date, 
      required: true,
  },
    bio: String,

    // by default, virtuals do not show up on JSON data. We must specify on our schema that we want them
  },
  { toJSON: { virtuals: true } }
);


//Virtuals
bakerSchema.virtual("breads", {
  ref: "Bread",
  localField: "_id",
  foreignField: "baker",
});


// Hooks
bakerSchema.post("findOneAndDelete", async () => {
 try{
  await Bread.deleteMany({ baker: this._conditions._id });
 } catch (err) {
   throw err;
 }
});

const Baker = mongoose.model("Baker", bakerSchema);
module.exports = Baker;
