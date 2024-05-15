import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

function Dashboard() {
  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="flex flex-col grow ">
        <h1 className="text-4xl font-bold text-center">Dashboard</h1>
        <article className="flex flex-row items-center justify-center gap-4 ">
          <nav className="bg-secondary min-h-1/2">
            a
          </nav>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default Dashboard;
