const API_URL = "https://recruiters-view-backend.onrender.com/api/login";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone }),
  });

  if (response.ok) {
    // Save recruiter info in localStorage for session tracking
    localStorage.setItem("recruiter", JSON.stringify({ name, email, phone }));
    // Redirect to dashboard
    window.location.href = "index.html";
  } else {
    alert("Login failed. Please try again.");
  }
});