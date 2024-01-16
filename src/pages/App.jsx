import { useState } from "react";
import React from "react";
import Layout from "../components/Layout/Layout";
import Homepage from "./homepage/Homepage";
import "../style/app.scss";

function App() {
  return (
    <Layout>
      <Homepage title={"Simuler les dimensions de votre Claustra"} />
    </Layout>
  );
}

export default App;
