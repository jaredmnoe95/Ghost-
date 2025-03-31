document.addEventListener("DOMContentLoaded", () => {
  // Initializing variables
  const setupSection = document.getElementById("setup");
  const pinSection = document.getElementById("pinScreen");
  const appUISection = document.getElementById("appUI");

  // Elements for user inputs
  const codeNameInput = document.getElementById("codeName");
  const pinInput = document.getElementById("setPIN");

  // Save code name function
  window.saveCodeName = () => {
    const codeName = codeNameInput.value.trim();
    if (codeName) {
      // Save the code name, and move to PIN setup
      localStorage.setItem("codeName", codeName);
      setupSection.style.display = "none";
      pinSection.style.display = "block";
    } else {
      alert("Please enter a valid code name.");
    }
  };

  // Save PIN function
  window.savePIN = () => {
    const pin = pinInput.value.trim();
    if (pin.length === 4 && !isNaN(pin)) {
      // Save the PIN, and show the main app UI
      localStorage.setItem("pin", pin);
      pinSection.style.display = "none";
      appUISection.style.display = "block";
      document.getElementById("userTag").textContent = `Ghost Access Granted, ${localStorage.getItem('codeName')}`;
    } else {
      alert("Please enter a valid 4-digit PIN.");
    }
  };

  // Show tabs (Messages, Alerts, Search)
  window.showTab = (tab) => {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tabContent) => tabContent.style.display = "none");
    document.getElementById(tab).style.display = "block";
  };

  // Send a message function (for simplicity, just log the message here)
  window.sendMessage = () => {
    const messageBox = document.getElementById("messageBox");
    const message = messageBox.value.trim();
    if (message) {
      alert("Message sent: " + message);
      messageBox.value = "";
    } else {
      alert("Please enter a message.");
    }
  };

  // Nuke (clear all messages)
  window.nuclearPurge = () => {
    const messageBox = document.getElementById("messageBox");
    messageBox.value = "";
    alert("All messages cleared.");
  };

  // Send encrypted message to another user
  window.sendMessageTo = () => {
    const toUser = document.getElementById("toUser").value.trim();
    const messageInput = document.getElementById("messageInput").value.trim();
    if (toUser && messageInput) {
      alert(`Encrypted message sent to ${toUser}: ${messageInput}`);
      document.getElementById("toUser").value = "";
      document.getElementById("messageInput").value = "";
    } else {
      alert("Please fill in both recipient and message.");
    }
  };
});
