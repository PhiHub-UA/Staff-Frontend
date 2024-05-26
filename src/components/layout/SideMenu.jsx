/* eslint-disable react/prop-types */
import { Link } from "@nextui-org/react";
import { useStaffStore } from "../../stores/staffStore";

function SideMenu({ className }) {

  const permissions = useStaffStore((state) => state.permissions);
  const role = useStaffStore((state) => state.role);

  return (
    <div
      className={`flex flex-col items-start gap-2 p-4 bg-white rounded-lg backdrop-blur-sm ${className} `}
    >
      <section>
        <h1 className="py-2 space-y-2 text-2xl">Menu</h1>
        <ul className="flex flex-col gap-2 ">
          <li>
            <Link href="/dashboard" className="text-xl">
              Dashboard
            </Link>
          </li>

          {role && role === "medic" && (


              <li>
                <Link href="/patients" className="text-xl">
                  Patients
                </Link>
              </li>
            )  }
            
              <li>
                <Link href="/appointments" className="text-xl">
                  Appointments
              </Link>
              </li>



          {permissions?.includes("MANAGE") && ( 
            <> 
          <li>
            <Link href="/staff" className="text-xl">
              Staff
            </Link>
          </li>

          <li>
          <Link href="/medics" className="text-xl">
              Medics
          </Link>
          </li>
          </>
          )}
          {permissions?.includes("CREATE") && ( 
            <> 
          <li>
            <Link href="/addmedic" className="text-xl">
              Add Medics
            </Link>
          </li>
          <li>
            <Link href="/addstaff" className="text-xl">
              Add Staff Personnel
            </Link>
          </li>
          </>
          )}
        </ul>
      </section>
    </div>
  );
}

export default SideMenu;
