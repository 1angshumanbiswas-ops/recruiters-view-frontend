const backendURL = "https://recruiters-view-backend.onrender.com";
const token = localStorage.getItem("token");

// Upload CV (limit enforced by backend)
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("cvFile");
  const formData = new FormData();
  formData.append("cv", fileInput.files[0]);

  try {
    const res = await fetch(`${backendURL}/candidate/upload-cv`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (res.ok) {
      alert("CV uploaded successfully");
      loadCVs();
    } else {
      const data = await res.json();
      alert(data.message || "Upload failed (limit may be reached)");
    }
  } catch (err) {
    console.error(err);
    alert("Error uploading CV");
  }
});

// Load candidate CVs
async function loadCVs() {
  try {
    const res = await fetch(`${backendURL}/candidate/my-cvs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cvs = await res.json();

    const list = document.getElementById("cvList");
    if (!cvs.length) {
      list.innerHTML = "<p>No CVs uploaded yet.</p>";
      return;
    }

    list.innerHTML = "<h3>Your CVs</h3><ul>" +
      cvs.map(cv => `
        <li>${cv.filename}
          <button onclick="deleteCV('${cv._id}')">Delete</button>
        </li>
      `).join("") +
      "</ul>";
  } catch (err) {
    console.error(err);
    alert("Error loading CVs");
  }
}

// Delete CV
async function deleteCV(cvId) {
  try {
    const res = await fetch(`${backendURL}/candidate/delete-cv/${cvId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      alert("CV deleted");
      loadCVs();
    } else {
      alert("Delete failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting CV");
  }
}

// Init
loadCVs();