// require mongoose
const mongoose = require("mongoose");

//creating shorthand for the Schema constructor
const { Schema } = mongoose;

const breadSchema = new Schema({
  // schema here
  name: { type: String, required: true },
  HasGluten: Boolean,
  Image: {
    type: String,
    default:
      "https://th.bing.com/th/id/R.d09bcd9708fe2dbe4ad380d8cf0bc5ff?rik=1mGT8EGvt%2f6WCQ&pid=ImgRaw&r=0",
  },

  baker: {
    type: Schema.Types.ObjectId,
    ref: "Baker",
  },
});

// instance method
breadSchema.methods.getBakedBy = function () {
  if (!this.baker) {
    return "Not available";
  } else if (typeof this.baker === "string") {
    return this.baker;
  }
  return `${this.name} was baked with love by ${
    this.baker.name
  }, who has been with us since ${this.baker.startDate.getFullYear()}`;
};

//model & export
const Bread = mongoose.model("breads", breadSchema);
module.exports = Bread;

// module.exports = [
//     {
//       name: 'Rye',
//       hasGluten: true,
//       image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//     },
//     {
//       name: 'French',
//       hasGluten: true,
//        image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
//     },
//     {
//       name: 'Gluten-Free',
//       hasGluten: false,
//       image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
//     },
//     {
//       name: 'Pumpernickel',
//       hasGluten: true,
//       image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
//     }
//   ];
