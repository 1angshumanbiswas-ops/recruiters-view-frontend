// Recruiter Views - Admin Dashboard (Superadmin bypass)
const backendURL = "https://recruiters-view-backend.onrender.com";

// Your superadmin email (bypass, no password/token required)
const superadminEmail = "angshuman@yourdomain.com";

// Load recruiter stats (superadmin view)
async function loadRecruiters() {
  try {
    const res = await fetch(`${backendURL}/api/superadmin/recruiters?email=${superadminEmail}`);
    const data = await res.json();
    const recruiters = data.recruiters || [];

    const tableBody = document.querySelector("#recruiterTable tbody");
    tableBody.innerHTML = "";

    recruiters.forEach(r => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${r.name || ""}</td>
        <td>${r.email || ""}</td>
        <td>${r.phone || ""}</td>
        <td>${r.company || ""}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading recruiters:", err);
    const tableBody = document.querySelector("#recruiterTable tbody");
    tableBody.innerHTML = `<tr><td colspan="4">Error loading recruiter data</td></tr>`;
  }
}

// Load candidate CVs
async function loadCVs() {
  try {
    const res = await fetch(`${backendURL}/candidates`);
    const candidates = await res.json();

    const list = document.getElementById("cvList");
    list.innerHTML = "<h3>Candidate CVs</h3><ul>" +
      candidates.map(c =>
        `<li>${c.name} - ${c.email}
          ${c.cvs.map(cv => `
            <button onclick="deleteCV('${cv._id}')">Delete CV</button>
          `).join("")}
        </li>`
      ).join("") +
      "</ul>";
  } catch (err) {
    console.error("Error loading CVs:", err);
    alert("Error loading CVs");
  }
}

// Delete CV (Superadmin only)
async function deleteCV(cvId) {
  try {
    const res = await fetch(`${backendURL}/admin/delete-cv/${cvId}`, {
      method: "DELETE"
    });
    if (res.ok) {
      alert("CV deleted");
      loadCVs();
    } else {
      alert("Failed to delete CV");
    }
  } catch (err) {
    console.error("Error deleting CV:", err);
    alert("Error deleting CV");
  }
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  loadRecruiters();
  loadCVs();
});