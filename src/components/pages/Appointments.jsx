import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import {  useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SideMenu from "../layout/SideMenu";
import axios from "../../api/axios";
import { useState } from "react";
import { useStaffStore } from "../../stores/staffStore";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

import {Button, useDisclosure } from "@nextui-org/react";
import NotesModal from "../layout/NotesModal";

function MyAppointments() {

  const queryClient = useQueryClient();

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const role = useStaffStore((state) => state.role);

  const {data:appointments} = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {

      console.log(role);

      if(role === "staff") {
        return await getAllAppointments();
      } else {
        return await getMedicAppointments();
      }

    },
  });

  const getMedicAppointments = async () => {  
    const res = await axios.get("/medic/appointments", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Bearer ${localStorage.getItem("token")}`
          : undefined,
      },
    })
    return res.data;
  };


  const getAllAppointments = async () => {
    const res = await axios.get("/staff/appointments", {
      headers: {
        Authorization: localStorage.getItem("token")
          ? `Bearer ${localStorage.getItem("token")}`
          : undefined,
      },
    });
    return res.data;
  };

  const issueBill = useMutation({
    mutationFn: async (appointmentID) => {
      console.log(appointmentID);
      const res = await axios.put(`/staff/appointments/${appointmentID}/issue_bill`, {}, {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
    },
  });


  const endAppointment = useMutation({
    mutationKey: ["endAppointment"],
    mutationFn: async (appointmentID) => {
      const res = await axios.put(`/medic/appointments/${appointmentID}/end`, {}, {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("medicAppointments");
    }
  });

  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="grid grid-cols-5 grow mx-[5%] gap-4 p-4">
        <SideMenu className="col-span-1" />
        <section className="flex flex-col col-span-4 gap-4  rounded-lg ">
          <article className="flex flex-col gap-4 p-4 glass">
            <h1 className="px-2 text-2xl font-bold ">{role === "staff" ? "All Appointments" : "My Appointments" }</h1>
          </article>

            <section className="flex flex-col gap-4 p-4 bg-white rounded-lg backdrop-blur-sm ">

              <Table>
                <TableHeader>
                  <TableColumn>Date</TableColumn>
                 
                  <TableColumn>Patient</TableColumn>
                  <TableColumn>Doctor</TableColumn>
                  <TableColumn>Speciality</TableColumn>
                  <TableColumn>Price</TableColumn>
                  <TableColumn>Notes</TableColumn>
                  <TableColumn>Bill Status</TableColumn>
                  <TableColumn>Finish Appointment</TableColumn>
                  
                </TableHeader>
                <TableBody>

                  {appointments?.map((appointment) => (
                    <TableRow key = {appointment.id}>
                      <TableCell>{new Date(appointment.date).toLocaleString() }</TableCell>
                      
                      <TableCell>{appointment.patient.name}</TableCell>
                      <TableCell>{appointment.medic.name}</TableCell>
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
                        
                      {role === "medic" ? 

<TableCell>
<Button color="foreground" disabled>Cant do this.</Button>
</TableCell> :


                      role === "staff" && (appointment.state === "PENDING" || appointment.state==="CHECKED_IN") ?
                      (
                        <TableCell>
                          <Button color="foreground"

                          >Cant issue bill yet.</Button>
                        </TableCell>
                      ):
                      appointment.state==="FINISHED"?

                      <TableCell>
                      <Button color="success"
                      onClick={() => issueBill.mutate(appointment.id)}

                      

                      >Issue Bill</Button>
                    </TableCell>:

                      appointment.state === "BILL_ISSUED" ?
                      <TableCell>
                        <Button color="foreground" disabled>Bill issued</Button>
                      </TableCell>
                      :
                      appointment.state === "BILL_PAID" ?
                      <TableCell>
                        <Button color="foreground" disabled>Bill paid . ${appointment.price} </Button>
                         </TableCell>
                      :
                      <TableCell>
                        <Button color="foreground" disabled>Cant do this.</Button>
                      </TableCell>
                      }
                





                        
                      { role === "staff" ?
                      (<TableCell>
                        <Button color="default" disabled={true}>Not possible</Button>
                      </TableCell>)
                      :
                      appointment?.state == "CHECKED_IN" ? (<TableCell>
                        <Button color="success" 
                        onClick={() => {
                          endAppointment.mutate(appointment.id);
                        }}
                        >Finish appointment</Button>
                      </TableCell>)
                      : 
                      appointment?.state == "FINISHED" ? (<TableCell>
                        <Button color="default" disabled={true}>Appointment finished already</Button>
                      </TableCell>)
                      :
                      (<TableCell>
                        <Button color="default" disabled={true}>Not possible</Button>
                      </TableCell>)
                      }


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