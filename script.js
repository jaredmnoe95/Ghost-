// Set up Firebase references
const db = getFirestore();
const messagesRef = collection(db, 'messages');

// Save code name
function saveCodeName() {
  const codeName = document.getElementById("codeName").value;
  if (!codeName) return alert("Please set your code name.");
  localStorage.setItem("ghostName", codeName);
  document.getElementById('setup').style.display = 'none';
  document.getElementById('pinScreen').style.display = 'block';
}

// Save PIN
function savePIN() {
  const pin = document.getElementById("setPIN").value;
  if (pin.length !== 4) return alert("Please set a 4-digit PIN.");
  localStorage.setItem("ghostPIN", pin);
  document.getElementById('pinScreen').style.display = 'none';
  document.getElementById('appUI').style.display = 'block';
  document.getElementById('userTag').innerText = `Welcome, ${localStorage.getItem("ghostName")}`;
}

// Show Tab Content
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(tabName).style.display = 'block';
}

// Send Message
function sendMessage() {
  const message = document.getElementById('messageBox').value;
  if (!message) return alert("Message cannot be empty.");
  
  const msgRef = doc(messagesRef);
  setDoc(msgRef, {
    sender: localStorage.getItem("ghostName"),
    message: message,
    timestamp: new Date().toISOString(),
  });
  
  document.getElementById('messageBox').value = '';
}

// Send Encrypted Message
function sendMessageTo() {
  const receiver = document.getElementById('toUser').value;
  const message = document.getElementById('messageInput').value;
  
  if (!receiver || !message) return alert("Fill out all fields");
  
  const msgRef = doc(messagesRef);
  setDoc(msgRef, {
    sender: localStorage.getItem("ghostName"),
    receiver: receiver,
    message: message,
    timestamp: new Date().toISOString(),
  });
  
  document.getElementById('toUser').value = '';
  document.getElementById('messageInput').value = '';
}

// Nuclear Button Function
function nuclearPurge() {
  localStorage.clear();
  alert("All data has been purged.");
  location.reload();
}
