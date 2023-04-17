const chatMessages = document.querySelector("#chat-messages");
const chatInput = document.querySelector("#chat-input");
const imageInput = document.querySelector("#image-input");
const sendButton = document.querySelector("#send-button");

// Connect to WebSocket server
const socket = new WebSocket("https://client.crisp.chat/l.js");

// When connection is open
socket.addEventListener("open", () => {
  console.log("Connected to WebSocket server");
});

// When receiving a message
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  // If the message is an image
  if (message.type === "image") {
    chatMessages.innerHTML += `<img src="${message.content}" alt="image">`;
  } else {
    chatMessages.innerHTML += `<p>${message.content}</p>`;
  }
});

// When send button is clicked
sendButton.addEventListener("click", (event) => {
  const content = chatInput.value.trim();

  // If the content is not empty
  if (content !== "") {
    const message = {
      type: "text",
      content: content,
    };

    socket.send(JSON.stringify(message));
    chatInput.value = "";
  }
});

// When image input is changed
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  // If a file is selected
  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      const message = {
        type: "image",
        content: event.target.result,
      };

      socket.send(JSON.stringify(message));
    });

    reader.readAsDataURL(file);
  }
});