import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  ButtonGroup,
  Autocomplete,
  AutocompleteItem,
  
} from "@nextui-org/react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const specialities = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Hematology",
  "Neurology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Urology",
];

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  return (
    <main className="flex flex-col min-h-screen hero-gradient">
      <Navbar />
      <section className="flex flex-col items-center justify-center grow ">
        <Card isBlurred>
          <ButtonGroup className="flex justify-center m-4">
            <Button
              color={isLogin ? "primary" : "muted"}
              variant="flat"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              color={!isLogin ? "primary" : "muted"}
              variant="flat"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </ButtonGroup>

          {isLogin ? (
            <>
              <CardHeader className="flex justify-center gap-3 ">
                <h1 className="text-2xl font-bold text-primary">Login</h1>
              </CardHeader>
              <CardBody className="gap-2">
                <Input placeholder="Email" />
                <Input type="password" placeholder="Password" />
              </CardBody>

              <CardFooter className="flex justify-evenly">
                <Button color="primary" variant="flat" block onClick={() => navigate("/dashboard")}>
                  Login
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="flex justify-center gap-3 ">
                <h1 className="text-2xl font-bold text-primary">Sign In</h1>
              </CardHeader>
              <CardBody className="gap-2">
                <Input placeholder="Name" />
                <Input placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Autocomplete
                  placeholder="Speciality"
                  className="w-full"
                  defaultItems={specialities}
                >
                  {specialities.map((speciality) => (
                    <AutocompleteItem key={speciality} value={speciality}>
                      {speciality}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                  
                  
              </CardBody>

              <CardFooter className="flex justify-evenly">
                <Button color="primary" variant="flat" block onClick={() => navigate("/dashboard")}>
                  Sign Up
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </section>

      <Footer />
    </main>
  );
}

export default LoginPage;
