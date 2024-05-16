import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {  useQuery } from "@tanstack/react-query";
import SideMenu from "../layout/SideMenu";
import axios from "../../api/axios";
import { useState } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import {Button} from "@nextui-org/react";
import NotesModal from "../layout/NotesModal";
import { useDisclosure } from "@nextui-org/react";


function MyAppointments() {

  const [selectedAppointment, setSelectedAppointment] = useState(null);


  const {data:appointments} = useQuery({
    queryKey: ["medicAppointments"],
    queryFn: async () => {
      const res = await axios.get("/medic/appointments", {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      return res.data;
    },
  });

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="grid grid-cols-5 grow mx-[5%] gap-4 p-4">
        <SideMenu className="col-span-1" />
        <section className="flex flex-col col-span-4 gap-4  rounded-lg ">
          <article className="flex flex-col gap-4 p-4 glass">
            <h1 className="px-2 text-2xl font-bold ">My Appointments</h1>
          </article>

            <section className="flex flex-col gap-4 p-4 bg-white rounded-lg backdrop-blur-sm ">

              <Table>
                <TableHeader>
                  <TableColumn>Date</TableColumn>
                 
                  <TableColumn>Patient</TableColumn>
                  <TableColumn>Speciality</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Notes</TableColumn>
                  
                </TableHeader>
                <TableBody>

                  {appointments?.map((appointment) => (
                    <TableRow key = {appointment.id}>
                      <TableCell>{new Date(appointment.date).toLocaleString() }</TableCell>
                      
                      <TableCell>{appointment.patient.name}</TableCell>
                      <TableCell>{appointment.speciality}</TableCell>
                      <TableCell>{appointment.price}€</TableCell>
                      <TableCell>
                          <Button color="primary" 
                          onClick={() => {
                            setSelectedAppointment(appointment.id);
                            onOpen();
                          }
                        }
                          >Check Notes</Button>
                      </TableCell> 

                      {/* <TableCell>
                        {appointment.bill ? (
                          <Button>View Bill</Button>
                        ) : (
                          <> 
                          <span className="mr-4"> 
                          Not issued yet.
                          </span>
                          <Button color="primary">Issue Bill</Button>
                          </>
                        )}
                      </TableCell> */}

                    </TableRow>
                  ))}
                </TableBody>
              </Table>

                
                </section>

        </section>
      </section>
      <NotesModal appointmentID= {selectedAppointment} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
      <Footer />
    </main>
  );
}

export default MyAppointments;