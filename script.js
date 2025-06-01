// Theme Switch
document.getElementById('themeSwitch').addEventListener('change', function () {
  document.body.classList.toggle('dark-theme', this.checked);
});

// Show/hide reset form
function showResetForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('resetForm').style.display = 'block';
}

function hideResetForm() {
  document.getElementById('resetForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

// Send OTP (connected to your backend via /send-otp)
async function sendResetOTP() {
  const email = document.getElementById('resetEmail').value;
  const res = await fetch("https://your-backend-url/send-otp", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  alert(data.message || "OTP Sent");
}

// Reset password (via /reset-password endpoint)
async function resetPassword() {
  const email = document.getElementById('resetEmail').value;
  const otp = document.getElementById('enteredOtp').value;
  const newPassword = document.getElementById('newPassword').value;

  const res = await fetch("https://your-backend-url/reset-password", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, otp, newPassword })
  });

  const data = await res.json();
  alert(data.message || "Password reset!");
}