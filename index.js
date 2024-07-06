const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const   Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main()
.then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};
//Index route
 app.get("/chats", async(req, res) => {
    let chats = await Chat.find();
  console.log(chats);
    res.render("index.ejs", {chats});
 });
//new route
app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
});
//create route
app.post("/chats", (req,res) =>{
    let {from, to ,msg} = req.body;
   let newchat = new Chat({
    from: from,
    to: to,
    message : msg,
    created_at: new Date()
   });
   newchat.save().then(res => {
    console.log("chat was saved");
  }).then(err => {
    console.log(err);
  });
   res.redirect("/chats");
});
//edit route
app.get("/chats/:id/edit", (req,res) =>{
    let {id} = req.params;
    let chat = Chat.findById(id);
    console.log(chat);
res.render("edit.ejs",{chat});
});
app.get("/", (req,res) =>{
    res.send("root is working");
})
app.listen(8080, () => {
  console.log("server is listening on port 8080");  
});