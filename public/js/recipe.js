async function loadRecipe() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch(`/api/recipes/${id}`);
    const recipe = await res.json();

    const container = document.getElementById("recipe");

    if (!recipe || recipe.error) {
        container.innerHTML = "Recipe not found";
        return;
    }

    const currentUser = window.currentUser || null;

    const ingredientsList = recipe.ingredients || [];

    const stepsArray = recipe.instructions
        ? recipe.instructions.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
        : [];

    container.innerHTML = `
        <h1>${recipe.title}</h1>

        <img src="${recipe.image}" style="width:300px;">

        <table style="border-collapse: collapse; border: 1px solid black; width: 500px; margin-top: 20px;">
            <tr>
                <th>Prep Time: ${recipe.prepTime} minutes</th>
                <th>Cook Time: ${recipe.cookTime} minutes</th>
            </tr>
            <tr>
                <th>Total Time: ${recipe.totalTime} minutes</th>
                <th>Servings: ${recipe.servings}</th>
            </tr>
        </table>

        <p><strong>Ingredients:</strong></p>
        <ul>
            ${ingredientsList.map(i => `<li>${i}</li>`).join("")}
        </ul>

        <p><strong>Instructions:</strong></p>
        <ol style="list-style-type:none; padding-left:0;">
            ${stepsArray.map((step, i) => `<li>Step ${i + 1}: ${step}</li>`).join("")}
        </ol>

        <p><em>by ${recipe.username}</em></p>
    `;

    // 🔐 fix owner check
    if (currentUser && recipe.username !== currentUser) {
        const editBtn = document.getElementById("edit-btn");
        if (editBtn) editBtn.style.display = "none";
    }

    // buttons
    if (id) {
        document.getElementById("edit-btn").onclick = () => {
            window.location.href = `/edit-recipe.html?id=${id}`;
        };

        document.getElementById("comment-btn").onclick = () => {
            window.location.href = `/comments.html?id=${id}`;
        };
    }
}

if (window.location.pathname.includes("recipe.html")) {
    loadRecipe();
}