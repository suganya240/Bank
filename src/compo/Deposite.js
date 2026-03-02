

import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Deposit({ accounts, setAccounts }) {
  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [pwd, setPwd] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!accountId || !amount || !pwd) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    const amt = Number(amount);

    const updatedAccounts = accounts.map(acc => {
      if (acc.id === Number(accountId)) {

        if (acc.password !== pwd) {
          alert("🔐 Wrong password!");
          throw new Error("Wrong password");
        }

        const newBalance = acc.balance + amt;

        return {
          ...acc,
          balance: newBalance,
          transactions: [
            ...acc.transactions,
            {
              type: "Deposit",
              amount: amt,
              date: new Date().toLocaleDateString(),
              balanceAfter: newBalance,
              note: description
            }
          ]
        };
      }
      return acc;
    });

    setAccounts(updatedAccounts);

    alert("✅ Deposit successful!");

    setAccountId("");
    setAmount("");
    setPwd("");
    setDescription("");
  }

  return (
    <div className="deposit-page">
      <header className="navbar">
        <div className="logo">🏦 GreenVault</div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </div>

        <nav className={open ? "nav-buttons active" : "nav-buttons"}>
          <Link to="/">Home</Link>
          <Link to="/create">Create Account</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/withdraw">Withdraw</Link>
          <Link to="/alldata">All Data</Link>
        </nav>
      </header>

      <div className="deposit-box">
        <h2>Deposit Money</h2>

        <form onSubmit={handleSubmit}>
          <label>Account ID *</label>
          <input
            type="number"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="Enter account ID"
          />

          <label>Password *</label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter account password"
          />

          <label>Amount *</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          <label>Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional note"
          />

          <button type="submit" className="primary-btn">
            Deposit
          </button>
        </form>

        <Link to="/" className="back-btn">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
