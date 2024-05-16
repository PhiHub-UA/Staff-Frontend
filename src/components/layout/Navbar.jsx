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
} from '@nextui-org/react';
import {logo} from '../../assets';
import {CgLogOut} from 'react-icons/cg';
import {CgProfile} from 'react-icons/cg';
import axios from '../../api/axios';
import {Chip} from '@nextui-org/react';
import {useNavigate} from 'react-router-dom';

import {useQuery} from '@tanstack/react-query';
import {useStaffStore} from '../../stores/staffStore';

function Navbar () {
  const navigate = useNavigate ();
  const login = useStaffStore (state => state.login) || false;
  const user = useStaffStore (state => state.username);
  const role = useStaffStore (state => state.role);
  const logout = useStaffStore (state => state.logout);

  const handleLogout = () => {
    logout ();
    navigate ('/');
  };

  const getStaff = useQuery ({
    queryKey: ['staff'],
    queryFn: () => {
      axios
        .get ('/staff/me', {
          headers: {
            Authorization: localStorage.getItem ('token')
              ? `Bearer ${localStorage.getItem ('token')}`
              : undefined,
          },
        })
        .then (res => {
          login (res.data.username, 'staff', res.data.permissions);
        })
        .catch (err => {
        });
      return null;
    },
  });

  const getMedic = useQuery ({
    queryKey: ['medic'],
    queryFn: () => {
      axios
        .get ('/staff/medics/me', {
          headers: {
            Authorization: localStorage.getItem ('token')
              ? `Bearer ${localStorage.getItem ('token')}`
              : undefined,
          },
        })
        .then (res => {
          login (res.data.username, 'medic', res.data.permissions);
        })
        .catch (err => {
          console.log (err);
        });
      return null;
    },
  });

  return (
    <nav className="p-4 bg-transparent">
      <Nav className="shadow-xl rounded-xl">
        <NavbarBrand className="flex gap-2" as={Link} href={'/'}>
          <Image src={logo} alt="ACME" width={32} height={32} />
          <p className="text-xl font-black text-primary">PHIHUB</p>
        </NavbarBrand>
        {user &&
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavbarItem>
              <Link color="foreground" href="/dashboard">
                Dashboard
              </Link>
            </NavbarItem>
          </NavbarContent>}

        {user
          ? <NavbarContent as="div" justify="end">
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
                    <h1 className="pr-2 font-semibold text-primary">{user}</h1>
                    <Chip color="default">{role}</Chip>
                  </span>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem color="primary" as="button">
                    <span className="flex flex-row items-center gap-2 text-primary">
                      <CgProfile />
                      <Link href="#">Profile</Link>
                    </span>

                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    as="button"
                    onClick={handleLogout}
                  >
                    <span className="flex flex-row items-center gap-2 text-danger">

                      <CgLogOut />
                      Log Out
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          : <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>}

      </Nav>
    </nav>
  );
}

export default Navbar;
