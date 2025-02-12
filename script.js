document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Evita que el formulario recargue la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://54.210.221.206:3004/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }

        const data = await response.json();
        console.log(data);

        if (data.role) {
            localStorage.setItem("user", JSON.stringify(data)); // Guardar sesión

            if (data.role === "administrator") {
                window.location.href = "admin-dashboard.html";
            } else if (data.role === "user") {
                window.location.href = "user-dashboard.html";
            }
        } else {
            document.getElementById("error-msg").textContent = "No se encontró el rol";
        }

    } catch (error) {
        document.getElementById("error-msg").textContent = error.message;
    }
});
