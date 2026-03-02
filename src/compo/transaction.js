

import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TransactionHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("accounts")) || [];
    const acc = stored.find(a => a.id === Number(id));

    if (!acc) {
      alert("Account not found ❌");
      navigate("/alldata");
      return;
    }

    setAccount(acc);
    setLoading(false);
  }, [id, navigate]);


  if (loading) {
    return (
      <div className="page-bg dark-bg">
        <p style={{ color: "white", textAlign: "center", marginTop: "120px" }}>
          Loading account details...
        </p>
      </div>
    );
  }


  if (!account) return null;

  return (
    <div className="page-bg dark-bg">
      
      <header className="navbar">
        <div className="logo">🏦 GreenVault</div>
        <button className="view-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </header>

    
      <div className="form-box">

        <h2>Transaction History</h2>

        
        <div className="account-details">
          <div><b>Name:</b> {account.name}</div>
          <div><b>Account ID:</b> {account.id}</div>
          <div><b>Gender:</b> {account.gender}</div>
          <div><b>DOB:</b> {account.dob}</div>
          <div><b>Age:</b> {account.age}</div>
          <div><b>Email:</b> {account.email}</div>
<div>
  <b>Aadhaar:</b>{" "}
  {account.aadhaar?.replace(/(\d{4})(?=\d)/g, "$1 ")}
</div>         
 <div><b>Account Type:</b> {account.type}</div>
          <div className="balance"><b>Balance:</b> ₹{account.balance}</div>
        </div>

        
        {account.transactions.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No transactions yet.
          </p>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance After</th>
                </tr>
              </thead>
              <tbody>
                {account.transactions.map((t, index) => (
                  <tr key={index}>
                    <td>{t.date}</td>
                    <td className={t.type === "Deposit" ? "credit" : "debit"}>
                      {t.type}
                    </td>
                    <td>₹{t.amount}</td>
                    <td>₹{t.balanceAfter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
