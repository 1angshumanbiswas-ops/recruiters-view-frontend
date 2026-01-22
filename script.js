const API_URL = "https://recruiters-view-backend.onrender.com/api/recruiter";

// Load recruiters
async function loadRecruiters() {
  const response = await fetch(API_URL);
  const recruiters = await response.json();

  const list = document.getElementById("recruiterList");
  list.innerHTML = "";

  recruiters.forEach((rec) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${rec.name}</strong> (${rec.email}) - ${rec.company}
      <button onclick="deleteRecruiter('${rec._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Delete recruiter
async function deleteRecruiter(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (response.ok) loadRecruiters();
}

// Initial load
loadRecruiters();