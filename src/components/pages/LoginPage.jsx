import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@nextui-org/react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "../../api/axios";

function LoginPage() {
  const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  function onSubmit(data) {
    login.mutate(data);
  }

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      await axios.post(
        "/auth/login",
        { ...data, role: "staff" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
  });

  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <Navbar />
      <section className="flex flex-col items-center justify-center grow ">
        <Card isBlurred>
          <CardHeader className="flex justify-center gap-3 ">
            <h1 className="text-2xl font-bold text-primary">Login</h1>
          </CardHeader>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="gap-2">
            <span className="flex flex-col">
              <Input placeholder="Username" {...register("username")} />
              {errors.username && <p className="p-1 px-2 text-error text-md">{errors.username.message} </p>}
            </span>
            <span className="flex flex-col">

              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && <p className="p-1 px-2 text-error text-md">{errors.password.message} </p>}
            </span>
            </CardBody>

            <CardFooter className="flex flex-col justify-evenly">
              <Button color="primary" variant="flat" block type="submit">
                Login
              </Button>

              {login.isError && <p className="p-1 px-2 text-error text-md">{login.error.message}</p>}
              {login.isSuccess && <p className="p-1 px-2 text-success text-md"> Registo efetuado com sucesso </p>}
            </CardFooter>
          </form>
        </Card>
      </section>

      <Footer />
    </main>
  );
}

export default LoginPage;
