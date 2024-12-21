import Bg from "@/public/bg.jpg";
import Login from "@/components/Login";

export default function Home() {
  return (
    <div
      className="  w-screen h-screen overflow-hidden  "
      style={{
        backgroundImage: `url(${Bg.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <Login />
    </div>
  );
}
