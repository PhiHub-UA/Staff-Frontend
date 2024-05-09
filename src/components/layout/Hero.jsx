import { Image } from "@nextui-org/react";
import { hospital } from "../../assets";

function Hero() {
  return (
    <section className="flex flex-row items-center justify-around h-full">
      <Image src={hospital} height={400} width={400} className="" />
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-primary">PHIHUB</h1>
        <p className="text-lg">The best hospital management system</p>
      </div>
    </section>
  );
}

export default Hero;
