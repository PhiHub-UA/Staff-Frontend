import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import medicSchema from "../../schemas/medicSchema";
import SideMenu from "../layout/SideMenu";
import { Select, SelectItem, Button } from "@nextui-org/react";
import InputField from "../InputField";

const specialities = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Hematology",
  "Infectious Disease",
  "Nephrology",
  "Neurology",
  "Oncology",
  "Pulmonology",
  "Rheumatology",
  "Urology",
];

function AddMedic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(medicSchema),
  });
  const navigate = useNavigate();

  // mock success
  const [success, setSuccess] = useState(false);

  function onSubmit(data) {
    // addMedic.mutate(data);
    console.log(data);
    setSuccess(true);
    setTimeout(() => {
        navigate("/dashboard"); // change to /medics
    }, 500);
  }

  // TODO: Connect to API
  // const addMedic = useMutation((data)

  // const { data: specialities } = useQuery

  return (
    <main className="flex flex-col w-full min-h-screen hero-gradient">
      <Navbar isLoggedIn />
      <section className="grid grid-cols-6 grow mx-[5%] gap-4">
        <SideMenu className="col-span-1" />
        <section className="flex flex-col col-span-5 gap-4 p-4 bg-white rounded-lg backdrop-blur-sm ">
          <h1 className="text-xl font-bold ">Add a medic</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              register={register}
              name={"name"}
              errors={errors?.name}
              isRequired
              label={"Name"}
            />
            <InputField
              register={register}
              name={"email"}
              errors={errors?.email}
              isRequired
              label={"Email"}
            />
            <InputField
              register={register}
              name={"phone"}
              errors={errors?.phone}
              isRequired
              label={"Phone"}
            />
            <InputField
              register={register}
              name={"age"}
              errors={errors?.age}
              label={"Age"}
              isRequired
              isNumber
            />
            <InputField
              register={register}
              name={"password"}
              errors={errors?.password}
              label={"Password"}
              isRequired
              isPassword
            />
            <span className="flex flex-col">
              <Select
                label="Speciality"
                selectionMode="multiple"
                {...register("specialities")}
                isRequired
              >
                {specialities?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
              {errors.specialities && (
                <p className="p-1 px-2 text-error text-md">
                  {errors.specialities.message}{" "}
                </p>
              )}
            </span>
            <Button
              type="submit"
              onClick={() => {
                console.log(errors);
              }}
            >
              Add medic
            </Button>
          </form>
          {success && <p className="text-green-500">Medic added successfully</p>}
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default AddMedic;
