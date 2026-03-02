
import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Withdraw() {
  const [open, setOpen] = useState(false);

  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [pwd, setPwd] = useState("");   

  function handleSubmit(e) {
  e.preventDefault();

  if (!accountId || !amount || !pwd) {
    alert("⚠️ Please fill all required fields!");
    return;
  }

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  let index = accounts.findIndex(acc => acc.id === Number(accountId));

  if (index === -1) {
    alert("❌ Account not found!");
    return;
  }

  if (accounts[index].password !== pwd) {
    alert("🔐 Wrong password!");
    return;
  }

  const amt = Number(amount);

  if (accounts[index].balance < amt) {
    alert("❌ Insufficient balance!");
    return;
  }

  const newBalance = accounts[index].balance - amt;

  
  const transaction = {
    type: "Withdraw",
    amount: amt,
    date: new Date().toLocaleDateString(),
    balanceAfter: newBalance
  };

  accounts[index].balance = newBalance;
  accounts[index].transactions.push(transaction);

  localStorage.setItem("accounts", JSON.stringify(accounts));

  alert("✅ Withdrawal successful!");

  setAccountId("");
  setAmount("");
  setPwd("");
}


  return (
    <div className="withdraw-page">

      <header className="navbar">
        <div className="logo">🏦 GreenVault</div>

        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={open ? "nav-buttons active" : "nav-buttons"}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/create" onClick={() => setOpen(false)}>Create Account</Link>
          <Link to="/deposit" onClick={() => setOpen(false)}>Deposit</Link>
          <Link to="/withdraw" onClick={() => setOpen(false)}>Withdraw</Link>
          <Link to="/alldata" onClick={() => setOpen(false)}>All Data</Link>
        </nav>
      </header>

      <div className="withdraw-box">
        <h2>Withdraw Money</h2>

        <form onSubmit={handleSubmit}>
          <label>Account ID *</label>
          <input
            type="number"
            placeholder="Enter account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />

          <label>Password *</label>
          <input
            type="password"
            placeholder="Enter account password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />

          <label>Amount *</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Reason</label>
          <textarea
            rows="3"
            placeholder="Optional note"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <button type="submit" className="primary-btn">
            Withdraw
          </button>
        </form>

        <a href="/" className="back-btn">
          ⬅ Back to Home
        </a>
      </div>
    </div>
  );
}
