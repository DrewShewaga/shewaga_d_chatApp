import chatMessage from './modules/chatMessage.js';

const socket = io();

function logConnect({sID, message}) {
    console.log(sID, message);
    vm.socketID = sID;
    socket.emit('chat message', { content: 'A new user has connected!', name: 'Chat Bot'});
}

function logDisconnect(){
    socket.emit('chat message', { content: 'A user has left the chat!', name: 'Chat Bot'});
}

function appendMessage(message) {
    vm.messages.push(message);
}

//create Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: []
    },

    methods: {
        dispatchMessage() {
            // emit message event from the client side
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});

            // reset the message field
            this.message = "";

        }
    },

    components: {
        newmessage: chatMessage
    }
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);
socket.addEventListener('disconnect', logDisconnect);
