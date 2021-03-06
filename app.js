var express = require('express');
var app = express();
var io = require('socket.io')();

const port = process.env.PORT || 3000;

//Tell express where our static files are (js, images, css, etc)

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

io.on('connection', function(socket){
    console.log('a user has connected');

    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'});
    
    // io.emit('chat message', { id: 'Chat-Bot', message: 'A new user has connected!'});

    socket.on('chat message', function(msg) {
        console.log('message: ', msg, 'socket:', socket.id);

        //send the message to everyone connected to the app
        io.emit('chat message', { id: `${socket.id}`, message: msg });
    });

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
        socket.emit('chat message', { content: 'A user has disconnected!', name: 'Chat Bot'});
    });
});

// let chatArea = document.querySelector('.messages'),
//     bgForest = document.querySelector('#bgForest'),
//     bgArctic = document.querySelector('#bgArctic'),
//     bgOcean = document.querySelector('#bgOcean'),
//     bgDesert = document.querySelector('#bgDesert'),
//     bgCity = document.querySelector('#bgCity');


// function changeForest(){
//     if (chatArea.style.backgroundImage == "url(../images/nature_bg.png)"){
//         console.log("background already selected");
//     }else{
//         chatArea.style.backgroundImage = "url(../images/nature_bg.png)";
//         console.log("background changed");
//     };
// }

// function changeArctic(){
//     if (chatArea.style.backgroundImage == "url(../images/antarctic_bg.png)"){
//         console.log("background already selected");
//     }else{
//         chatArea.style.backgroundImage = "url(../images/antarctic_bg.png)";
//         console.log("background changed");
//     };
// }

