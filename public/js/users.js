async function login() {
    const email = document.getElementById("email").value; 
    const password = document.getElementById("password").value; 

    const res = await fetch("/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    const data = await res.json(); 

    if (!data.error)
    {
        window.location.href = "/home.html";

    } else {
        document.getElementById("msg").textContent = data.error; 
    }
}

async function register() {
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value; 
    const occupation = document.getElementById("occupation").value; 
    const password = document.getElementById("password").value;

    const res = await fetch("/api/users/register", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, occupation, password})
    });

    const data = await res.json(); 

    if (!data.error) {
        window.location.href = "/home.html";
    } else {
        document.getElementById("msg").textContent = data.error;
    }
}

async function logout() {
    await fetch("/api/users/logout", { method: "POST"});
    window.location.href = "/login.html"
}




