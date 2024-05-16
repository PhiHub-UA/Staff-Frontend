import Navbar from "../layout/Navbar"
import SideMenu from "../layout/SideMenu"
import {useQuery} from "@tanstack/react-query"
import axios from "../../api/axios"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";


function Medics() {


    const {data:medics} = useQuery({
        queryKey: ["medics"],
        queryFn: async () => {
            const res = await axios.get("staff/medics", {
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
    medic info 

    private String phone;
    private String email;
    private Integer age;
    // Login Info
    private String username;
    private String name;

    private List<Speciality> specialities;


    */

    return (
        <main className="flex flex-col w-full min-h-screen hero-gradient">
          <Navbar isLoggedIn />
          <section className="grid grid-cols-5 grow mx-[5%] gap-4 p-4">
            <SideMenu className="col-span-1" />
            <section className="flex flex-col col-span-4 gap-4  rounded-lg ">
              <article className="flex flex-col gap-4 p-4 glass">
                <h1 className="px-2 text-2xl font-bold ">Medics</h1>
              </article>

              <article className="flex flex-col gap-4 p-4 bg-transparent bg-white rounded-lg backdrop-blur-sm">

                <Table>
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Age</TableColumn>
                        <TableColumn>Phone</TableColumn>
                        <TableColumn>Specialities</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {medics?.map((medic) => (
                            <TableRow>
                                <TableCell>{medic.name}</TableCell>
                                <TableCell>{medic.email}</TableCell>
                                <TableCell>{medic.age}</TableCell>
                                <TableCell>{medic.phone}</TableCell>
                                <TableCell>{medic.specialities.map((speciality) => speciality).join(", ")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
              </article>


              </section>
              </section>
              </main>
    )
}

export default Medics