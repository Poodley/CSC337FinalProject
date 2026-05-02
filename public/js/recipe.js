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
    container.innerHTML = `

        <h1>${recipe.title}</h1>
        <img src="${recipe.image}" style="width:300px;">
        <table style="border-collapse: collapse;  border-style: solid; width: 500px; margin-top: 20px;">
            <tr>
                <th style="border: 1px solid black;"> <strong>Prep Time:</strong> ${recipe.prepTime} minutes </th>
                <th style="border: 1px solid black;"><strong>Cook Time:</strong> ${recipe.cookTime} minutes</th>
            </tr>
            <tr>
                <th style="border: 1px solid black;"><strong>Total Time:</strong> ${recipe.totalTime} minutes</th>
                <th style="border: 1px solid black;"><strong>Servings:</strong> ${recipe.servings}</th>
            </tr>
        </table>
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