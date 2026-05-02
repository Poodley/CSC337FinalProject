const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");
let selectedRating = 0;

// show recipe title up top
async function loadRecipeInfo() {
    if (!recipeId) {
        document.getElementById("recipe-info").innerHTML = "<p>No recipe selected.</p>";
        return;
    }
    const res = await fetch("/api/recipes");
    const data = await res.json();
    const recipe = data.find(r => String(r.id) === String(recipeId));
    if (recipe) {
        document.getElementById("recipe-info").innerHTML =
            `<h2 style="text-align:center;">Recipe: <a href="/recipe.html?id=${recipeId}">${recipe.title}</a></h2>`;
    }
}

// star selector
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", () => {
        selectedRating = parseInt(star.getAttribute("data-val"));
        document.getElementById("rating-val").value = selectedRating;
        updateStars();
    });
    star.addEventListener("mouseover", () => {
        const val = parseInt(star.getAttribute("data-val"));
        highlightStars(val);
    });
    star.addEventListener("mouseout", () => {
        updateStars();
    });
});

function highlightStars(val) {
    document.querySelectorAll(".star").forEach(s => {
        s.classList.toggle("active", parseInt(s.getAttribute("data-val")) <= val);
    });
}

function updateStars() {
    highlightStars(selectedRating);
}

async function loadComments() {
    if (!recipeId) return;
    const res = await fetch(`/api/comments/${recipeId}`);
    const comments = await res.json();

    const list = document.getElementById("comments-list");

    if (comments.length === 0) {
        list.innerHTML = "<p style='text-align:center;color:#888;'>No reviews yet. Be the first!</p>";
        return;
    }

    // average rating
    const avg = (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1);
    list.innerHTML = `<p class="avg-rating">Average Rating: <strong>${avg} / 5</strong> (${comments.length} review${comments.length !== 1 ? "s" : ""})</p>`;

    comments.slice().reverse().forEach(c => {
        const card = document.createElement("div");
        card.className = "comment-card";
        const stars = "★".repeat(c.rating) + "☆".repeat(5 - c.rating);
        const date = new Date(c.timestamp).toLocaleDateString();
        card.innerHTML = `
            <div class="comment-header">
                <span class="comment-user">${c.username}</span>
                <span class="comment-stars">${stars}</span>
                <span class="comment-date">${date}</span>
            </div>
            <div class="comment-body">${c.body}</div>
            <button class="delete-btn" onclick="deleteComment('${c.id}')">Delete</button>
        `;
        list.appendChild(card);
    });
}

async function submitComment() {
    const username = document.getElementById("username-input").value.trim();
    const body = document.getElementById("comment-body").value.trim();
    const rating = selectedRating;
    const msg = document.getElementById("form-msg");

    if (!username || !body || rating === 0) {
        msg.textContent = "Fill in all fields and select a rating.";
        return;
    }

    const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, username, body, rating })
    });

    const data = await res.json();
    if (data.success) {
        msg.textContent = "";
        document.getElementById("username-input").value = "";
        document.getElementById("comment-body").value = "";
        selectedRating = 0;
        updateStars();
        loadComments();
    } else {
        msg.textContent = data.error || "Error submitting comment.";
    }
}

async function deleteComment(id) {
    const username = prompt("Enter your username to delete this comment:");
    if (!username) return;

    const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    });

    const data = await res.json();
    if (data.success) {
        loadComments();
    } else {
        alert(data.error || "Could not delete.");
    }
}

loadRecipeInfo();
loadComments();
