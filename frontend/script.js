const backendUrl = "https://ai-virtual-teacher3.onrender.com";

// Theme Switch (if theme switcher exists)
const themeSwitch = document.getElementById('themeSwitch');
if (themeSwitch) {
  themeSwitch.addEventListener('change', function () {
    document.body.classList.toggle('dark-theme', this.checked);
  });
}

// Show/hide reset form
function showResetForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('resetForm').style.display = 'block';
}

function hideResetForm() {
  document.getElementById('resetForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

// Send OTP via Gmail (calls backend)
async function sendResetOTP() {
  const email = document.getElementById('resetEmail').value;
  const res = await fetch(`${backendUrl}/send-otp`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  alert(data.message || "OTP Sent");
}

// Reset password (calls backend)
async function resetPassword() {
  const email = document.getElementById('resetEmail').value;
  const otp = document.getElementById('enteredOtp').value;
  const newPassword = document.getElementById('newPassword').value;

  const res = await fetch(`${backendUrl}/reset-password`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, otp, newPassword })
  });

  const data = await res.json();
  alert(data.message || "Password reset!");
}

// Example: Send user message to AI (you can attach to a form)
async function askAI(message) {
  const response = await fetch(`${backendUrl}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage: message })
  });
  const data = await response.json();
  return data.reply;
}
