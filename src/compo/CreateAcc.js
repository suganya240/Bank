
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function CreateAccount({ accounts, setAccounts }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    first: "",
    last: "",
    gender: "",
    dob: "",
    email: "",
    idType: "",
    aadhaar: "",
    accType: "",
    password: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [newId, setNewId] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) return;

    const age = calculateAge(form.dob);
    if (age < 18) {
      alert("❌ Only 18+ users can create an account");
      return;
    }

    const id = Math.floor(
      100000000000 + Math.random() * 900000000000
    );

    const newAccount = {
      id: Date.now(),
      name: form.first + " " + form.last,
      gender: form.gender,
      dob: form.dob,
      age: age,
      email: form.email,
      aadhaar: form.aadhaar,
      type: form.accType,
      password: form.password,
      balance: 0,
      transactions: [],
      isLoggedIn: true   
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    setNewId(id);
    setShowPopup(true);

    setForm({
      first: "",
      last: "",
      gender: "",
      dob: "",
      email: "",
      idType: "",
      aadhaar: "",
      accType: "",
      password: ""
    });
  }

  return (
    <div className="create-page">
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
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <div className="create-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            name="first"
            value={form.first}
            onChange={handleChange}
            type="text"
            required
            pattern="^[A-Za-z ]+$"
          />

          <label>Last Name</label>
          <input
            name="last"
            value={form.last}
            onChange={handleChange}
            type="text"
            required
            pattern="^[A-Za-z ]+$"
          />

          <label>Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Date of Birth</label>
          <input
            name="dob"
            value={form.dob}
            onChange={handleChange}
            type="date"
            required
          />

          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />

          <label>Identification</label>
          <select
            name="idType"
            value={form.idType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Aadhaar">Aadhaar Card</option>
          </select>

          {form.idType === "Aadhaar" && (
            <>
              <label>Aadhaar Number</label>
              <input
                name="aadhaar"
                value={form.aadhaar}
                onChange={handleChange}
                type="text"
                placeholder="12-digit Aadhaar"
                pattern="^[0-9]{12}$"
                required
              />
            </>
          )}

          <label>Account Type</label>
          <select
            name="accType"
            value={form.accType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option>Savings</option>
            <option>Current</option>
          </select>

          <label>Create Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            minLength={4}
            required
          />

          <button type="submit">Create Account</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>🎉 Account Created Successfully</h3>
            <p>Your Account ID</p>
            <h2>{newId}</h2>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}