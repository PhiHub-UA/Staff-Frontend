import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import SideMenu from "../layout/SideMenu";

function Dashboard() {
  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="flex flex-col grow ">
        <h1 className="text-4xl font-bold text-center">Dashboard</h1>
        <article className="grid grid-cols-6 gap-4 mx-[5%]">
          <SideMenu className="col-span-1"/>
          <section className="flex flex-col col-span-5 gap-4 p-4 bg-white rounded-lg backdrop-blur-sm ">
            <h1 className="text-xl font-bold ">Content</h1>
            <p>Content goes here</p>
          </section>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default Dashboard;
