async function loadRecipe() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch("/api/recipes");
    const data = await res.json();

    const recipe = data.find(r => String(r.id) === String(id));

    const container = document.getElementById("recipe");

    if (!recipe) {
        container.innerHTML = "Recipe not found";
        return;
    }
    const ingredientsList = Array.isArray(recipe.ingredients) ? recipe.ingredients: (recipe.ingredients || "").split(/\r?\n/).map(i => i.trim()).filter(i => i.length > 0);
    const stepsArray = recipe.instructions.split(/\n\s*\n/).map(s => s.trim()).filter(s => s.length > 0);
    // TODO: make table with prep time, cook time, total time, servings, etc. and make it look nicer
    container.innerHTML = `
        <h1>${recipe.title}</h1>
        <img src="${recipe.image}" style="width:300px;">

        <p><strong>Ingredients:</strong></p>
        <ul>
            ${ingredientsList.map(i => `<li>${i}</li>`).join("")}
        </ul>
        <p><strong>Instructions:</strong></p>
        <ol style="list-style-type:none; padding-left:0;">
            ${stepsArray.map((step, i) => `<li> Step ${i + 1}: ${step}</li>`).join("")}
        </ol>

        <p><em>by ${recipe.username}</em></p>
    `;
}

// only run on recipe page
if (window.location.pathname.includes("recipe.html")) {
    loadRecipe();
}