/* eslint-disable react/prop-types */
import { Link } from "@nextui-org/react";
import { useStaffStore } from "../../stores/staffStore";

function SideMenu({ className }) {

  const permissions = useStaffStore((state) => state.permissions);

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
          {permissions && permissions.includes("MANAGE") && ( 
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
          {permissions && permissions.includes("CREATE") && ( 
            <> 
          <li>
            <Link href="/addmedic" className="text-xl">
              Add a medic
            </Link>
          </li>
          <li>
            <Link href="/addstaff" className="text-xl">
              Add a staff
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
