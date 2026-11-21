
// =================================
// KNOWLEDGE HUB - STUDENT DASHBOARD
// =================================

const LESSON_GOAL = 20;

// LocalStorage Data
function getData(key, fallback) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data ?? fallback;
    } catch {
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Student Name
function loadStudentName() {
    const name = localStorage.getItem("kh_student_name") || "Student";

    document.getElementById("studentName").textContent = name;
    document.getElementById("profileName").textContent = name;
}

document.getElementById("saveName").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value.trim();

    if (!name) {
        alert("Please enter your name!");
        return;
    }

    localStorage.setItem("kh_student_name", name);
    loadStudentName();

    document.getElementById("nameInput").value = "";
    alert("Your name has been saved!");
});

// Mark Lesson Complete
function markLessonComplete(title) {
    const lessons = getData("kh_completed_lessons", []);

    if (lessons.some(item => item.title === title)) {
        return;
    }

    lessons.push({
        title: title,
        date: new Date().toLocaleString()
    });

    saveData("kh_completed_lessons", lessons);

    addActivity("📚", title + " completed");
}

// Save Quiz Result
function saveQuizResult(score, total, quizName) {
    const results = getData("kh_quiz_results", []);

    results.push({
        name: quizName,
        score: Number(score),
        total: Number(total),
        date: new Date().toLocaleString()
    });

    saveData("kh_quiz_results", results);

    addActivity("📝", quizName + " quiz completed");
}

// Save Bookmark
function saveBookmark(title) {
    const bookmarks = getData("kh_bookmarks", []);

    if (bookmarks.includes(title)) {
        return;
    }

    bookmarks.push(title);
    saveData("kh_bookmarks", bookmarks);

    addActivity("🔖", title + " bookmarked");
}

// Recent Activity
function addActivity(icon, text) {
    const activities = getData("kh_activity", []);

    activities.unshift({
        icon: icon,
        text: text,
        date: new Date().toLocaleString()
    });

    saveData("kh_activity", activities.slice(0, 10));
}

// Update Dashboard
function updateDashboard() {

    const lessons = getData("kh_completed_lessons", []);
    const quizzes = getData("kh_quiz_results", []);
    const bookmarks = getData("kh_bookmarks", []);

    // Lesson Count
    document.getElementById("lessonCount").textContent =
        lessons.length;

    // Quiz Count
    document.getElementById("quizCount").textContent =
        quizzes.length;

    // Bookmark Count
    document.getElementById("bookmarkCount").textContent =
        bookmarks.length;

    // Average Quiz Score
    let totalScore = 0;
    let totalMarks = 0;

    quizzes.forEach(quiz => {
        totalScore += quiz.score;
        totalMarks += quiz.total;
    });

    const average = totalMarks > 0
        ? Math.round((totalScore / totalMarks) * 100)
        : 0;

    document.getElementById("averageScore").textContent =
        average + "%";

    // Learning Progress
    const progress = Math.min(
        100,
        Math.round((lessons.length / LESSON_GOAL) * 100)
    );

    document.getElementById("progressText").textContent =
        progress + "%";

    document.getElementById("progressFill").style.width =
        progress + "%";

    document.getElementById("progressMessage").textContent =
        progress === 100
        ? "Great! You have reached your learning goal!"
        : "Complete " + (LESSON_GOAL - lessons.length) +
          " more lessons to reach your goal.";

    // Recent Activity
    const activities = getData("kh_activity", []);
    const activityList = document.getElementById("activityList");

    if (activities.length === 0) {
        activityList.innerHTML = `
            <p class="empty-message">
                No learning activity yet.
                Start learning to see your activity here.
            </p>
        `;
    } else {
        activityList.innerHTML = activities.map(item => `
            <div class="activity-item">
                <strong>${escapeHTML(item.icon)} ${escapeHTML(item.text)}</strong>
                <small>${escapeHTML(item.date)}</small>
            </div>
        `).join("");
    }
}

// Prevent HTML injection in activity text
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Initialize Dashboard
loadStudentName();
updateDashboard();
