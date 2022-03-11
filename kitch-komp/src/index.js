import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Footer,
  GroceryList,
  KitchenStock,
  Recipies,
  MyKitchens,
} from "./components";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<GroceryList />} />
      <Route path="/kitchenStock" element={<KitchenStock />} />
      <Route path="/recipies" element={<Recipies />} />
      <Route path="/myKitchens" element={<MyKitchens />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();