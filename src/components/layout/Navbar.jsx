/* eslint-disable react/prop-types */
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Avatar,
} from "@nextui-org/react";
import { logo } from "../../assets";

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
            <>
              <Avatar src="https://i.pravatar.cc/300" size="md" />
              <NavbarItem>Josefino Calças</NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color="primary" href="/login" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>{" "}
            </>
          )}
        </NavbarContent>
      </Nav>
    </nav>
  );
}

export default Navbar;
