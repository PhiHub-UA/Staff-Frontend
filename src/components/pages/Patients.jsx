import React from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import SideMenu from "../layout/SideMenu";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";

function Patients() {
  const { data: patients } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const res = await axios.get("medic/patients", {
        headers: {
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      });
      return res.data;
    },
  });

  /* 
    patient info
    private String phone;
    private String email;
    private Integer age;
    // Login Info
    private String username;
    private String name;
    @JsonIgnore
    private String password; */

  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="grid grid-cols-5 grow mx-[5%] gap-4 p-4">
        <SideMenu className="col-span-1" />
        <section className="flex flex-col col-span-4 gap-4 rounded-lg ">
          <article className="flex flex-col gap-4 p-4 glass">
            <h1 className="px-2 text-2xl font-bold ">Patients</h1>
          </article>
          <article className="flex flex-col gap-4 p-4 rounded-lg grow glass">
            <Table>
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Age</TableColumn>
                <TableColumn>Phone</TableColumn>
              </TableHeader>

              <TableBody>
                {patients?.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </article>
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default Patients;
