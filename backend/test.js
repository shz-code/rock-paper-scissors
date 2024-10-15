const socketIO = require("./io");

const io = socketIO.getIO();

io.emit("room", "gotcha");
