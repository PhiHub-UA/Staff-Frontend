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


function Staff() {


    const {data:staff} = useQuery({
        queryKey: ["staff"],
        queryFn: async () => {
            const res = await axios.get("staff", {
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
          <section className="grid grid-cols-5 grow mx-[5%] gap-4 p-4">
            <SideMenu className="col-span-1" />
            <section className="flex flex-col col-span-4 gap-4  rounded-lg ">
              <article className="flex flex-col gap-4 p-4 glass">
                <h1 className="px-2 text-2xl font-bold ">Staff</h1>
              </article>

              <article className="flex flex-col gap-4 p-4 bg-transparent bg-white rounded-lg backdrop-blur-sm">

                <Table>
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Age</TableColumn>
                        <TableColumn>Phone</TableColumn>
                        <TableColumn>Permissions</TableColumn>
                    </TableHeader>

                    <TableBody>

                        {staff?.map((staff) => (
                            <TableRow key={staff.id}>
                                <TableCell>{staff.name}</TableCell>
                                <TableCell>{staff.email}</TableCell>
                                <TableCell>{staff.age}</TableCell>
                                <TableCell>{staff.phone}</TableCell>
                                <TableCell>{staff.permissions.map((staff) => staff).join(", ")}
                                </TableCell>
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

export default Staff