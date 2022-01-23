import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/nav";
import { DrugCategories } from "./pages/categories";
import { Login } from "./pages/login";
import { RecordDrugs } from "./pages/records/record-drugs";
import { RecordList } from "./pages/records/records-list";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="drugs/create" element={<RecordDrugs />} />
          <Route path="drugs/categories" element={<DrugCategories />} />
          <Route path="drugs/list" element={<RecordList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
