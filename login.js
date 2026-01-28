// Recruiter Views - Login Logic

const backendURL = "https://recruiters-view-backend.onrender.com";

// Email + Password Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Admin bypass
  if (email === "1angshuman.biswas@gmail.com") {
    window.location.href = "admin-dashboard.html";
    return;
  }

  try {
    const res = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "visitors.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
  }
});

// Mobile + OTP Login
document.getElementById("otpForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const mobile = document.getElementById("mobile").value;
  const otp = document.getElementById("otp").value;

  try {
    const res = await fetch(`${backendURL}/otp-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "visitors.html";
    } else {
      alert(data.message || "OTP login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
  }
});