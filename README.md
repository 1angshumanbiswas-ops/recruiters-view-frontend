# Recruiter Views Platform

Recruiter Views is a full-stack application designed to manage recruiter registrations, candidate CV uploads, visit tracking, and superadmin analytics.  
It consists of two parts:
- **Backend (Node.js/Express + MongoDB Atlas)** — REST API for recruiters, candidates, and analytics
- **Frontend (HTML/CSS/JavaScript)** — User-facing interface with recruiter login, candidate management, and dashboards

---

## 🚀 Features

### Backend
- Recruiter registration with unique email validation
- Candidate CV upload and deletion via Multer
- Superadmin-only recruiter data access
- Recruiter visit tracking and analytics (weekly, monthly, quarterly)
- MongoDB Atlas integration
- RESTful API endpoints

### Frontend
- Recruiter login and registration
- Candidate CV upload/delete interface
- Superadmin dashboard with recruiter analytics
- Visit tracking visualization
- Responsive layout with green-themed styling

---

## 📦 Tech Stack

- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, Multer, dotenv, CORS
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Deployment:** Render (Backend: Node service, Frontend: Static site)

---

## 📁 Folder Structure


### Frontend
frontend/ ├── index.html ├── login.html ├── admin-dashboard.html ├── candidate.html ├── visitors.html ├── login.js ├── admin-dashboard.js ├── candidate.js ├── visitors.js ├── script.js ├── style.css └── curl


---

## 🌐 Deployment

Deployed on [Render](https://render.com):

- **Backend:** Node service (Singapore region)  
- **Frontend:** Static site (Global)  

---

## 📄 License

MIT