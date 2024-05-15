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

function Navbar({ isLoggedIn }) {
  return (
    <nav className="p-4 bg-transparent">
      <Nav className="shadow-xl rounded-xl">
        <NavbarBrand className="flex gap-2" as={Link} href={"/"}>
          <Image src={logo} alt="ACME" width={32} height={32} />
          <p className="text-xl font-black text-primary">PHIHUB</p>
        </NavbarBrand>

        {isLoggedIn && (
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                My Appointments
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page">
                Calendar
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}

        <NavbarContent justify="end">
          {isLoggedIn ? (
            <NavbarContent as="div" justify="end">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <span className="flex flex-row items-center">
                    <Avatar
                      isBordered
                      as="button"
                      className="mr-4 transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                    <h1 className="text-lg cursor-pointer">Josefino Calças</h1>
                  </span>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="gap-2 h-14">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">calcas@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="flex flex-row"
                    color="danger"
                  >
                    <span className="flex flex-row items-center w-full text-danger">
                      <CgLogOut className="mr-2" /> Logout
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
        </NavbarContent>
      </Nav>
    </nav>
  );
}

export default Navbar;
