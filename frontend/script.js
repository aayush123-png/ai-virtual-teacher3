// Theme toggle
document.getElementById('themeSwitch')?.addEventListener('change', function () {
  document.body.classList.toggle('dark-theme', this.checked);
});

// Login logic
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[email] && users[email] === password) {
    alert("Login successful!");
    window.location.href = "mode.html";
  } else {
    alert("Incorrect credentials.");
  }
});

// Reset password
async function sendResetOTP() {
  const email = document.getElementById("resetEmail").value;
  const response = await fetch("https://ai-virtual-teacher3.onrender.com/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  const data = await response.json();
  alert(data.message || "OTP sent!");
}

async function resetPassword() {
  const email = document.getElementById("resetEmail").value;
  const otp = document.getElementById("enteredOtp").value;
  const newPassword = document.getElementById("newPassword").value;

  const response = await fetch("https://ai-virtual-teacher3.onrender.com/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword })
  });

  const data = await response.json();
  alert(data.message || "Password updated!");
}

// Show/hide reset forms
function showResetForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("resetForm").style.display = "block";
}
function hideResetForm() {
  document.getElementById("resetForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}
