// Recruiter Views - Recruiter Dashboard

const backendURL = "https://recruiters-view-backend.onrender.com";
const token = localStorage.getItem("token");

// Load candidate CVs
async function loadCandidates() {
  try {
    const res = await fetch(`${backendURL}/candidates`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const candidates = await res.json();

    const list = document.getElementById("candidateList");
    list.innerHTML = "<h3>Available CVs</h3><ul>" +
      candidates.map(c => 
        `<li>${c.name} - ${c.email} 
          ${c.cvs.map(cv => `
            <button onclick="downloadCV('${cv._id}')">Download CV</button>
          `).join("")}
        </li>`
      ).join("") +
      "</ul>";
  } catch (err) {
    console.error(err);
    alert("Error loading candidates");
  }
}

// Download CV
function downloadCV(cvId) {
  window.open(`${backendURL}/cv/${cvId}`, "_blank");
}

// Init
loadCandidates();