
async function loadRecipes() {
    const res = await fetch("/api/recipes");
    const data = await res.json();

    const container = document.getElementById("recipes");
    container.innerHTML = "";

    data.forEach(r => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <img src="${r.image}">
            <div class="title">${r.title}</div>

            <div class="section">
                <span class="label">Ingredients:</span><br>
                ${r.ingredients}
            </div>

            <div class="section">
                <span class="label">Instructions:</span><br>
                ${r.instructions}
            </div>

            <div class="section">
                <small>by ${r.username}</small>
            </div>
        `;
        card.onclick = () => {
        window.location.href = `/recipe.html?id=${r.id}`;};
        container.appendChild(card);
    });
}

loadRecipes();