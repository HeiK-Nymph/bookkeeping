import mongoose from "mongoose";

const bookkeepingSchema = new mongoose.Schema({
  mono:String,
  date:String,
  kind:String,
  money:Number
})

export default mongoose.model('bookkeeping', bookkeepingSchema)
