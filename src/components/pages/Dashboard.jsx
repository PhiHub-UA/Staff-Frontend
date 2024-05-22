import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import SideMenu from "../layout/SideMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

function Dashboard() {

  const nextTicket = useQuery({
    queryKey: ["nextAppointment"],
    queryFn: async () => {
      const res = await axios.get("staff/reception/next", {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      return res.data;
    },
  });
  

  const ticketLines = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await axios.get("staff/queueline/tickets", {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      return res.data;
    },
  });

  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="flex flex-col grow ">
        <h1 className="text-4xl font-bold text-center">Dashboard</h1>
        <article className="grid grid-cols-6 gap-4 mx-[5%]">
          <SideMenu className="col-span-1" />
          <section className="flex flex-col col-span-5 gap-4 p-4 bg-white rounded-lg backdrop-blur-sm glass">
            <h1 className="text-2xl font-bold ">Queues</h1>
            <div className="grid grid-cols-4 gap-4">
              {ticketLines.isSuccess &&
                ticketLines.data.map((item) => (
                  <section
                    className="flex flex-col col-span-1 p-4 bg-opacity-50 rounded-lg bg-secondary backdrop-blur-sm"
                    key={item.id}
                  >
                  <h1 className="text-2xl font-bold ">Queue</h1>
                    <h1 className="text-5xl font-bold ">
                       {item.showingLetter} {item.ticketCounter}
                    </h1>
                    <h1 className="text-2xl font-bold ">Counter {item.id}</h1>
                    <button className="p-2 text-white rounded-lg bg-secondary" onClick={() => {nextTicket.refetch()}}>
                      Call
                    </button>
                  </section>
                ))}
            </div>
            <h1 className="text-2xl font-bold ">Next Appointment</h1>
            <section className="flex flex-col p-4 bg-opacity-50 rounded-lg bg-secondary backdrop-blur-sm">
              </section>
          </section>
        </article>
      </section>
      <Footer />
    </main>
  );
}

export default Dashboard;
