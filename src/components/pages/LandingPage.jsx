import Navbar from "../layout/Navbar";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";

function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <Navbar />

      <section className="flex flex-col justify-center grow ">
        <Hero />
      </section>

      <Footer />
    </main>
  )
}

export default LandingPage
