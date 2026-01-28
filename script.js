const loginForm = document.getElementById("loginForm");
const resumeSection = document.getElementById("resumeSection");
const resumeList = document.getElementById("resumeList");

let token = null;

// Recruiter login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const recruiterName = document.getElementById("recruiterName").value;
  const recruiterEmail = document.getElementById("recruiterEmail").value;

  try {
    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recruiterName, recruiterEmail })
    });
    const data = await res.json();

    if (data.token) {
      token = data.token;
      localStorage.setItem("recruiterToken", token);
      alert("Login successful!");
      loadResumes();
    } else {
      alert("Login failed: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    alert("Error logging in");
  }
});

// Load resumes (only after login)
async function loadResumes() {
  try {
    const res = await fetch("http://localhost:4000/api/resume", {
      headers: { Authorization: token }
    });
    const resumes = await res.json();

    resumeList.innerHTML = "";
    resumes.forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${r.title} - 
        <a href="http://localhost:4000/api/resume/${r._id}/view" target="_blank"
           onclick="return attachToken(this.href)">View</a>
      `;
      resumeList.appendChild(li);
    });

    resumeSection.style.display = "block";
  } catch (err) {
    alert("Error loading resumes");
  }
}

// Attach token to resume view requests
function attachToken(url) {
  // Since direct <a> links can't send headers, you’d normally proxy this
  // For simplicity, recruiters can copy token into headers via fetch
  alert("Resume view requires recruiter token. Use fetch with Authorization header.");
  return false;
}