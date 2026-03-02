

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./compo/Home";
import CreateAccount from "./compo/CreateAcc";
import Deposit from "./compo/Deposite";
import Withdraw from "./compo/Withdraw";
import AllData from "./compo/Alldata";
import TransactionHistory from "./compo/transaction";

export default function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  }, [accounts]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/create"
          element={<CreateAccount accounts={accounts} setAccounts={setAccounts} />}
        />

        <Route
          path="/deposit"
          element={<Deposit accounts={accounts} setAccounts={setAccounts} />}
        />

        <Route
          path="/withdraw"
          element={<Withdraw accounts={accounts} setAccounts={setAccounts} />}
        />

        <Route
          path="/alldata"
          element={<AllData />}
        />

        <Route
          path="/transactions/:id"
          element={<TransactionHistory />}
        />


      </Routes>
    </BrowserRouter>
  );
}
