import bookkeeping from "./mongodb_models/bookkeeping.js";
import { db } from "./db.js";


db().then(async () => {
  await bookkeeping.create({
    mono:"测试事件1",
    date:"2025-07-01",
    kind:"1",
    money:16
  })
})
