// JavaScript for handling tab switching and speech recognition
function openTab(tabName, button) {
  var i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Reset tab link styles
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Display the selected tab content and style the button
  document.getElementById(tabName).style.display = "block";
  button.style.backgroundColor = "#007bff"; // Highlight the active tab
}

function startListening() {
  var micButton = document.getElementById("micButton");
  var listeningIndicator = document.getElementById("listeningIndicator");
  var transcriptOutput = document.getElementById("transcriptOutput");

  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop after first recognition
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Final results only

    recognition.onstart = function() {
      micButton.textContent = "🔴 Listening..."; // Change mic button text
      listeningIndicator.style.display = 'inline'; // Show listening indication
    };

    recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      transcriptOutput.textContent = transcript; // Display transcribed text
    };

    recognition.onend = function() {
      micButton.textContent = "🎙️ Click to Speak"; // Reset mic button text
      listeningIndicator.style.display = 'none'; // Hide listening indication
    };

    recognition.start(); // Start speech recognition
  } else {
    alert("Your browser does not support speech recognition.");
  }
}
