import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"

function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <Navbar isLoggedIn />

      <section className="flex flex-col justify-center grow ">
        
      </section>

      <Footer />
    </main>
  )
}

export default Dashboard
