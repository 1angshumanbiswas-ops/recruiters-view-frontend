const API_URL = "https://recruiters-view-backend.onrender.com/api/recruiter";

document.getElementById("recruiterForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const recruiter = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    company: document.getElementById("company").value
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recruiter)
  });

  const data = await response.json();
  alert("Recruiter added: " + JSON.stringify(data));
  loadRecruiters();
});

async function loadRecruiters() {
  const response = await fetch(API_URL);
  const recruiters = await response.json();

  const list = document.getElementById("recruiterList");
  list.innerHTML = "";
  recruiters.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.name} (${r.email}) - ${r.company}`;
    list.appendChild(li);
  });
}

loadRecruiters();