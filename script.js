// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkWIOJ7DaQ7pozupt84f3j6JbCPKdYZnU",
  authDomain: "ghost-8921c.firebaseapp.com",
  projectId: "ghost-8921c",
  storageBucket: "ghost-8921c.firebasestorage.app",
  messagingSenderId: "282650978484",
  appId: "1:282650978484:web:e4c1ccb63719eb04c78fe1",
  measurementId: "G-P1HW9LHPR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Save Code Name to Firebase
function saveCodeName() {
  const codeName = document.getElementById("codeName").value;
  const userId = Date.now(); // Unique ID for each user based on the timestamp
  const codeNameRef = ref(db, 'users/' + userId);

  set(codeNameRef, {
    codeName: codeName,
  }).then(() => {
    // Move to next section
    document.getElementById("setup").style.display = "none";
    document.getElementById("pinScreen").style.display = "block";
  });
}

// Save PIN to Firebase
function savePIN() {
  const pin = document.getElementById("setPIN").value;
  const userId = Date.now();
  const pinRef = ref(db, 'pins/' + userId);

  set(pinRef, {
    pin: pin,
  }).then(() => {
    // Move to main app
    document.getElementById("pinScreen").style.display = "none";
    document.getElementById("appUI").style.display = "block";
    document.getElementById("userTag").textContent = "Ghost Access Granted";
  });
}

// Display the messages from Firebase
function displayMessage(message) {
  const messageBoard = document.getElementById("messageBoard");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageBoard.appendChild(messageElement);
}

// Real-time listener for messages in Firebase
const messagesRef = ref(db, 'messages/');
onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const messageBoard = document.getElementById("messageBoard");
  messageBoard.innerHTML = ""; // Clear previous messages
  for (const messageId in data) {
    const message = data[messageId].message;
    displayMessage(message);
  }
});

// Send a message to Firebase
function sendMessage() {
  const message = document.getElementById("messageBox").value;
  const messageRef = ref(db, 'messages/' + Date.now());

  set(messageRef, {
    message: message,
  }).then(() => {
    document.getElementById("messageBox").value = ""; // Clear message input field
  });
}

// Nuke button functionality to clear all messages from Firebase
function nuclearPurge() {
  const messagesRef = ref(db, 'messages/');
  remove(messagesRef).then(() => {
    document.getElementById("messageBoard").innerHTML = ''; // Clear messages from the UI
  });
}

// Handle sending encrypted message (in real-time)
function sendMessageTo() {
  const recipientName = document.getElementById("toUser").value;
  const messageInput = document.getElementById("messageInput").value;

  if (recipientName && messageInput) {
    const encryptedMessage = encryptMessage(messageInput); // Encrypt message before storing it
    const messageRef = ref(db, 'messages/' + Date.now());

    set(messageRef, {
      recipient: recipientName,
      message: encryptedMessage,
    }).then(() => {
      document.getElementById("messageInput").value = ""; // Clear message input field
    });
  }
}

// Simple function to simulate message encryption (this would be more complex in a real app)
function encryptMessage(message) {
  return btoa(message); // Using Base64 encoding to simulate encryption
}

// Event listeners for buttons
document.getElementById("nukeButton").addEventListener("click", nuclearPurge);
document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("sendEncryptedButton").addEventListener("click", sendMessageTo);
