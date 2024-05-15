import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function AddMedic() {
  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="grid grid-cols-6 grow "></section>
      <Footer />
    </main>
  );
}

export default AddMedic;
