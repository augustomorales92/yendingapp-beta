
import Navbar from "@/components/Navbar";
import LoginButton from "@/components/buttons/LoginButton";

export default function Home() {

  return (
    <>
      <Navbar />
      <div className=" h-screen p-12 flex flex-col min-h-screen">
        <div className="flex flex-col m-auto gap-5">
          <h1 className="text-secondary text-5xl font-bold ">Swipe Right</h1>
          <LoginButton/>
        </div>
      </div>
    </>

  );
}
