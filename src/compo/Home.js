import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loggedOutAccounts, setLoggedOutAccounts] = useState([]);

  // 🔁 Load logged out accounts
  const loadLoggedOutAccounts = () => {
    const stored = JSON.parse(localStorage.getItem("accounts")) || [];

    const filtered = stored.filter(
      (acc) => acc.isLoggedIn === false
    );

    setLoggedOutAccounts(filtered);
  };

  useEffect(() => {
    loadLoggedOutAccounts();
  }, []);

  // ✅ LOGIN AGAIN FUNCTION (With Password)
  const handleLoginAgain = (id) => {
    const stored = JSON.parse(localStorage.getItem("accounts")) || [];

    const account = stored.find((acc) => acc.id === id);

    if (!account) {
      alert("Account not found ❌");
      return;
    }

    const enteredPassword = prompt("Enter your password to login");

    if (enteredPassword === null) return;

    if (enteredPassword !== account.password) {
      alert("Wrong password ❌");
      return;
    }

    const updatedAccounts = stored.map((acc) =>
      acc.id === id ? { ...acc, isLoggedIn: true } : acc
    );

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    alert("Login successful ✅");

    navigate("/alldata");
  };

  // ✅ DELETE ACCOUNT FUNCTION
  const handleDeleteAccount = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this account permanently?"
    );

    if (!confirmDelete) return;

    const stored = JSON.parse(localStorage.getItem("accounts")) || [];

    const updatedAccounts = stored.filter(
      (acc) => acc.id !== id
    );

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    // Update UI instantly
    setLoggedOutAccounts((prev) =>
      prev.filter((acc) => acc.id !== id)
    );

    alert("Account deleted successfully 🗑️");
  };

  return (
    <div className="home">
      <header className="navbar">
        <div className="logo">🏦 GreenVault</div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-buttons ${open ? "active" : ""}`}>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/create")}>Create</button>
          <button onClick={() => navigate("/deposit")}>Deposit</button>
          <button onClick={() => navigate("/withdraw")}>Withdraw</button>
          <button onClick={() => navigate("/alldata")}>All Data</button>
        </nav>
      </header>

      <section className="hero hero-flex">
        <div className="hero-text">
          <h1>
            Be part of <br />
            something bigger
          </h1>
          <p>Your trusted customer-owned bank.</p>
          <button onClick={() => navigate("/create")}>
            Get Started
          </button>
        </div>

        <div className="home-cards">
          {loggedOutAccounts.length > 0 ? (
            <>
              <h3>Login Again</h3>

              {loggedOutAccounts.map((acc) => (
                <div className="home-account-card" key={acc.id}>
                  <h4>{acc.name}</h4>
                  <p>ID: {acc.id}</p>

                  {/* ✅ LOGIN BUTTON */}
                  <button
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoginAgain(acc.id);
                    }}
                  >
                    Login
                  </button>

                  {/* ✅ DELETE BUTTON */}
                  <button
                    type="button"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginTop: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteAccount(acc.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p style={{ color: "white" }}>
              No logged out accounts
            </p>
          )}
        </div>
      </section>
    </div>
  );
}