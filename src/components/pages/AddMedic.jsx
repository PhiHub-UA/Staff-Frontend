import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import medicSchema from "../../schemas/medicSchema";
import SideMenu from "../layout/SideMenu";
import {
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import InputField from "../InputField";
import axios from "../../api/axios";


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

  function onSubmit(data) {
    const formData = { ...data, role: "staff", username: data.name };
    addMedic.mutate(JSON.stringify(formData));
  }

  const addMedic = useMutation({
    mutateKey: "addMedic",
    mutationFn:  (data) => {
      console.log(data);
      const res =  axios.post("staff/medics", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
            ? `Bearer ${localStorage.getItem("token")}`
            : undefined,
        },
      
      });
      return res.data;
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate("/dashboard"); // change to /medics
      }, 5000);
    },
  });

  const { data: specialities } = useQuery({
    queryKey: ["specialities"],
    queryFn: async () => {
      const res = await axios.get("/patient/speciality", {
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
        <section className="flex flex-col col-span-4 gap-4 p-4 rounded-lg ">
          <article className="flex flex-col gap-4 p-4 glass">
            <h1 className="px-2 text-2xl font-bold ">Add a medic</h1>
          </article>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <article className="flex flex-col gap-4 p-4 bg-transparent bg-white rounded-lg backdrop-blur-sm">
              <h1 className="text-xl font-bold text-primary">
                Personal Information
              </h1>
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
            </article>
            <article className="flex flex-col gap-4 p-4 bg-white rounded-lg bg-backdrop-blur-sm">
              <h1 className="text-xl font-bold text-primary">
                Account Information
              </h1>
              <div className="divider" />
              <InputField
                register={register}
                name={"username"}
                errors={errors?.username}
                label={"Username"}
                isRequired
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
            </article>
            <Button
              type="submit"
              onClick={() => {
                console.log(errors);
              }}
              color="primary"
              className="text-xl text-white rounded-lg"
            >
              Add medic
            </Button>
          </form>
          {addMedic.isSuccess && (
            <p className="text-green-500">Medic added successfully</p>
          )}
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default AddMedic;
