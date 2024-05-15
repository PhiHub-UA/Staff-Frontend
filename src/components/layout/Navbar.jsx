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

import { useQuery } from "@tanstack/react-query";
import { useStaffStore } from "../../stores/staffStore";

function Navbar() {
  const login = useStaffStore((state) => state.login) || false;
  const user = useStaffStore((state) => state.username);
  const logout = useStaffStore((state) => state.logout);

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
            <NavbarItem>
              <Link color="foreground" href="#" aria-current="page">
                Register new Medics
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}

        {user ? (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <span className="flex flex-row items-center cursor-pointer">
                  <Avatar
                    isBordered
                    as="button"
                    className="mr-4 text-xl transition-transform"
                    color="secondary"
                    name={user}
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                  <h1 className="font-semibold text-primary">{user}</h1>
                </span>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="gap-2 h-14">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  as="button"
                  onClick={logout}
                >
                <span className="flex flex-row items-center gap-2 text-danger">
                  
                  <CgLogOut />
                  Log Out
                </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}

        
      </Nav>
    </nav>
  );
}

export default Navbar;
