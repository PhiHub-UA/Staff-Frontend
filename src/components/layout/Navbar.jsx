import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import { logo } from "../../assets";

function Navbar() {
  return (
    <nav className="p-4 bg-transparent">
      <Nav className="shadow-xl rounded-xl">
        <NavbarBrand className="flex gap-2">
          <Image src={logo} alt="ACME" width={32} height={32} />
          <p className="text-xl font-black text-primary">PHIHUB</p>
        </NavbarBrand>
        
        {/* <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
            <NavLink color="foreground" href="#">
              Features
            </NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink href="#" aria-current="page">
              Customers
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" href="#">
              Integrations
            </NavLink>
          </NavbarItem>
        </NavbarContent> */}
        
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/login"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Nav>
    </nav>
  );
}

export default Navbar;
