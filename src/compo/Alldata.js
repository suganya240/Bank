
import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllData() {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("accounts")) || [];

  const activeAccounts = stored.filter(
    (acc) => acc.isLoggedIn === true
  );

  setAccounts(activeAccounts);
}, []);
  
const handleLogout = (id) => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout this account?"
  );

  if (!confirmLogout) return;

  const stored = JSON.parse(localStorage.getItem("accounts")) || [];

  const updatedAccounts = stored.map((acc) =>
    acc.id === id ? { ...acc, isLoggedIn: false } : acc
  );

  localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

  setAccounts((prev) => prev.filter((acc) => acc.id !== id));

  alert("Logged out successfully ✅");
};

  return (
    <div className="page-bg dark-bg all-data-page">
      <header className="navbar">
        <div className="logo">🏦 GreenVault</div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={open ? "nav-buttons active" : "nav-buttons"}>
          <Link to="/">Home</Link>
          <Link to="/create">Create Account</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/withdraw">Withdraw</Link>
          <Link to="/alldata">All Data</Link>
          
        </nav>
      </header>

      <div className="form-box">
        <h2>All Accounts</h2>

        {accounts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No accounts created yet.</p>
        ) : (
          <div className="account-cards">
            {accounts.map((acc) => (
              <div className="account-card" key={acc.id}>
                <h3>{acc.name}</h3>

                <p className="acc-id">
                  <span className="acc-label">Account ID:</span>
                  <span className="acc-value">{acc.id}</span>
                </p>

                <p className="balance">₹{acc.balance}</p>

                <Link
                  to={`/transactions/${acc.id}`}
                  className="view-btn"
                  onClick={(e) => {
                    const pwd = prompt(
                      "Enter account password to view transactions"
                    );

                    if (pwd === null) {
                      e.preventDefault();
                      return;
                    }

                    if (pwd !== acc.password) {
                      e.preventDefault();
                      alert("Wrong password ❌");
                    }
                  }}
                >
                  View Transactions
                </Link>

                <button
                  className="logout-btn"
                  onClick={() => handleLogout(acc.id)}
                >
                  Logout
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}