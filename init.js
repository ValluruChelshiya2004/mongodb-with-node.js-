const mongoose = require("mongoose");
const   Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};
let allchats = [
    {
        from: "neha",
        to: "priya",
        message: "send me your ds notes",
        created_at: new Date()
    },
    {
    from: "ravi",
    to: "priya",
    message: "I love you",
    created_at: new Date()
    },
    {
        from: "renu",
        to: "priya",
        message: "Where are you",
        created_at: new Date()
        },
        {
            from: "rakesh",
            to: "priya",
            message: "hi akka!",
            created_at: new Date()
            },
]

 Chat.insertMany(allchats);
    
