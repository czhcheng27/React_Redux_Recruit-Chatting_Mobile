/* 
include n Models
*/

//connect to database
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/React_Recruit_App", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("database connect successfully");
});

//create user Schema
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  header: { type: String },
  headUrl: { type: String },
  post: { type: String },
  info: { type: String },
  company: { type: String },
  salary: { type: String },
});
const UserModel = mongoose.model("user", userSchema);
exports.UserModel = UserModel;

//create chats Schema
const chatSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  chat_id: { type: String, required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  create_time: { type: Number },
});
const ChatModel = mongoose.model("chat", chatSchema);
exports.ChatModel = ChatModel;
