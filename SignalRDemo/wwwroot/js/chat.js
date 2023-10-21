document.addEventListener('DOMContentLoaded', function ()
{
    var userName = prompt("Please Enter Ur Name: ");

    var messageInput = document.getElementById("messageInp");
    var groupNameInput = document.getElementById("groupNameInp");
    var messageToGroupInput = document.getElementById("messageToGroupInp");

    messageInput.focus();

    var proxyConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    proxyConnection.start().then(function () {
        document.getElementById("sendMessageBtn").addEventListener("click", function (e) {

            e.preventDefault();
            proxyConnection.invoke("Send", userName, messageInput.value);
        });

        document.getElementById("joinGroupBtn").addEventListener("click", function (e) {
            e.preventDefault();
            proxyConnection.invoke("JoinGroub", groupNameInput.value, userName);
        });
            document.getElementById("sendMessageToGroupBtn").addEventListener("click", function (e) {
                e.preventDefault();
                proxyConnection.invoke("SendMessageToGroup", groupNameInput.value, userName, messageToGroupInput.value);
            });


    }).catch(function (error) {
        console.log(error)
    });

    proxyConnection.on("ReceiveMessage", function (userName, message) {
        var listElement = document.createElement("li");
        listElement.innerHTML = `<strong>${userName} : </strong> ${message}`;
        document.getElementById("conversation").appendChild(listElement);
    })

    proxyConnection.on("NewMemberJoin", function (userName, groupName) {
        var liElement = document.createElement("li");
        liElement.innerHTML = `<i>${userName} has joined ${groupName}</i>`;
        document.getElementById("groupConversationUL").appendChild(liElement);
    })
    proxyConnection.on("ReceiveMessageFromGroup", function (message, sender) {
        var liElement = document.createElement("li");
        liElement.innerHTML = `<strong>${sender} : </strong> ${message}`;
        document.getElementById("groupConversationUL").appendChild(liElement);
    })
})