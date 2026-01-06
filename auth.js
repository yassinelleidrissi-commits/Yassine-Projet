const ADMIN = {
  email: "yassinelleidrissi@gmail.com",
  password: "12345"
};

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === ADMIN.email && password === ADMIN.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Identifiants incorrects";
  }
});
