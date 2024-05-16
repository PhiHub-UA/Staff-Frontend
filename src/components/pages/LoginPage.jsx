import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import loginSchema from "../../schemas/loginSchema";
import {Tabs,Tab} from "@nextui-org/react";

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [visible, setVisible] = useState(false);

  function onSubmit(data) {
    stafflogin.mutate(data);
  }

  function onSubmitMedicLogin(data) {
    mediclogin.mutate(data);
  }

  const mediclogin = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const res = await axios.post(
        "/auth/login",
        { ...data, role: "medic" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    },
    onError: (err) => {
      console.error(err);
    },
  });


  const stafflogin = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const res = await axios.post(
        "/auth/login",
        { ...data, role: "staff" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <Navbar />
      <section className="flex flex-col items-center justify-center grow ">
        <div className="flex flex-row items-center gap-16">
        <Card isBlurred>
          <CardHeader className="flex justify-center gap-3 ">
            <h1 className="text-2xl font-bold text-primary">Staff Login</h1>
          </CardHeader>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="gap-2">
              <span className="flex flex-col">
                <Input placeholder="Username" {...register("username")} />
                {errors.username && (
                  <p className="p-1 px-2 text-error text-md">
                    {errors.username.message}{" "}
                  </p>
                )}
              </span>
              <span className="flex flex-col">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  endContent={
                    <button type="button" onClick={() => setVisible(!visible)}>
                      {visible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                />
                {errors.password && (
                  <p className="p-1 px-2 text-error text-md">
                    {errors.password.message}{" "}
                  </p>
                )}
              </span>
            </CardBody>

            <CardFooter className="flex flex-col justify-evenly">
              <Button color="primary" variant="flat" block type="submit">
                Login
              </Button>

              {stafflogin.isError && (
                <p className="p-1 px-2 text-error text-md">
                  Credenciais inválidas.
                </p>
              )}
              {stafflogin.isSuccess && (
                <p className="p-1 px-2 text-success text-md">
                  {" "}
                  Login efetuado com sucesso{" "}
                </p>
              )}
            </CardFooter>
          </form>
        </Card>


        <Card isBlurred>
          <CardHeader className="flex justify-center gap-3 ">
            <h1 className="text-2xl font-bold text-primary">Medic Login</h1>
          </CardHeader>

          <form noValidate onSubmit={handleSubmit(onSubmitMedicLogin)}>
            <CardBody className="gap-2">
              <span className="flex flex-col">
                <Input placeholder="Username" {...register("username")} />
                {errors.username && (
                  <p className="p-1 px-2 text-error text-md">
                    {errors.username.message}{" "}
                  </p>
                )}
              </span>
              <span className="flex flex-col">
                <Input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  endContent={
                    <button type="button" onClick={() => setVisible(!visible)}>
                      {visible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  }
                />
                {errors.password && (
                  <p className="p-1 px-2 text-error text-md">
                    {errors.password.message}{" "}
                  </p>
                )}
              </span>
            </CardBody>

            <CardFooter className="flex flex-col justify-evenly">
              <Button color="primary" variant="flat" block type="submit">
                Login
              </Button>

              {mediclogin.isError && (
                <p className="p-1 px-2 text-error text-md">
                  Credenciais inválidas.
                </p>
              )}
              {mediclogin.isSuccess && (
                <p className="p-1 px-2 text-success text-md">
                  {" "}
                  Login efetuado com sucesso{" "}
                </p>
              )}
            </CardFooter>
          </form>
        </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default LoginPage;
