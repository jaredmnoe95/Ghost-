// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getDatabase, ref, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase config object
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

// Save the Code Name in LocalStorage
function saveCodeName() {
  const codeName = document.getElementById("codeName").value;
  if (codeName) {
    localStorage.setItem("ghostName", codeName);
    document.getElementById("setup").style.display = "none";
    document.getElementById("pinScreen").style.display = "block";
  }
}

// Save the PIN in LocalStorage
function savePIN() {
  const pin = document.getElementById("setPIN").value;
  if (pin.length === 4) {
    localStorage.setItem("ghostPIN", pin);
    document.getElementById("pinScreen").style.display = "none";
    document.getElementById("appUI").style.display = "block";
    document.getElementById("userTag").innerText = `Welcome, ${localStorage.getItem("ghostName")}`;
    loadMessages();
  } else {
    alert("Please set a 4-digit PIN.");
  }
}

// Switch between tabs
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';
}

// Send an encrypted message
function sendMessage() {
  const sender = localStorage.getItem("ghostName");
  const message = document.getElementById("messageBox").value;
  const timestamp = new Date().toISOString();

  if (message) {
    const msgRef = ref(db, "messages");
    push(msgRef, {
      sender,
      message,
      timestamp
    });
    document.getElementById("messageBox").value = ""; // Clear the message box
    loadMessages(); // Refresh the message list
  } else {
    alert("Message cannot be empty.");
  }
}

// Display all the messages in the thread
function loadMessages() {
  const thread = document.getElementById("messageThread");
  thread.innerHTML = ""; // Clear previous messages
  const ghost = localStorage.getItem("ghostName");

  const msgRef = ref(db, "messages");
  onChildAdded(msgRef, (snapshot) => {
    const data = snapshot.val();
    const msg = document.createElement("div");
    if (data.sender === ghost || data.receiver === ghost) {
      msg.textContent = `${data.sender}: ${data.message}`;
      thread.appendChild(msg);
    }
  });
}

// Nuke all messages
function nuclearPurge() {
  const msgRef = ref(db, "messages");
  remove(msgRef);
  document.getElementById("messageThread").innerHTML = ""; // Clear message thread immediately
}

// Send message to a specific recipient
function sendMessageTo() {
  const sender = localStorage.getItem("ghostName");
  const receiver = document.getElementById("toUser").value;
  const message = document.getElementById("messageInput").value;
  const timestamp = new Date().toISOString();

  if (receiver && message) {
    const msgRef = ref(db, "messages");
    push(msgRef, {
      sender,
      receiver,
      message,
      timestamp
    });
    document.getElementById("messageInput").value = ""; // Clear the input box
    loadMessages(); // Refresh the message list
  } else {
    alert("Both recipient and message fields are required.");
  }
}
