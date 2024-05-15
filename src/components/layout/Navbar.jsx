/* eslint-disable react/prop-types */
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { logo } from "../../assets";
import { CgLogOut } from "react-icons/cg";
import axios from "../../api/axios";

import {useQuery} from "@tanstack/react-query";
import { useStaffStore } from "../../stores/staffStore";

function Navbar( ) {

  const login = useStaffStore((state) => state.login) || false;

  const _ = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      axios
        .get("/staff/users/me", {
          headers: {
            Authorization: localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : undefined,
          },
        })
        .then((res) => {
          login(res.data.username);
        })
        .catch((err) => {
          console.log(err);
        });
      return null;
    },
  });

  const user = useStaffStore((state) => state.username);
  const logout = useStaffStore((state) => state.logout);

  return (
    <nav className="p-4 bg-transparent">
      <Nav className="shadow-xl rounded-xl">
        <NavbarBrand className="flex gap-2" as={Link} href={"/"}>
          <Image src={logo} alt="ACME" width={32} height={32} />
          <p className="text-xl font-black text-primary">PHIHUB</p>
        </NavbarBrand>

        {user && (
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Register new Staff
              </Link>
            </NavbarItem>
            <NavbarItem >
              <Link color="foreground" href="#" aria-current="page">
                Register new Medics
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <>
              <Avatar src="https://i.pravatar.cc/300" size="md" />
              <NavbarItem>Josefino Calças</NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Nav>
    </nav>
  );
}

export default Navbar;
