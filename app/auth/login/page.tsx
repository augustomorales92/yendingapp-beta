import LoginGoogle from "@/components/buttons/LoginGoogle";
import Image from "next/image";
import Link from "next/link";
import CredentialLogin from "@/components/CredentialLogin";


export default async function LoginPage() {

/*   if (status === 'loading') {
    return <div className="text-secondary">Loading...</div>; // Or any loading indicator you prefer
  }
 */

  return (
    <div className="grid place-items-center h-screen mx-2 ">
      <div className="bg-secondary_b shadow-lg text-black rounded-lg border-t-4">
        <div className="w-full h-64 relative mb-6">
          <Image
            src="/images/celebrate.jpg"
            alt="Descriptive Alt Text"
            layout="fill"
            objectFit="cover"
            priority={false}
            className="rounded-t-lg"
          />
        </div>
        <div className="p-5 gap-3 ">
          <h1 className=" text-4xl text-primary font-bold text-center mb-2">
            Sign in
          </h1>
          <p className="text-center mb-6 text-secondary">
            Sign in to your account using one of the methods below
          </p>
          <div className="flex flex-col gap-3 px-6">
            <LoginGoogle />
            <CredentialLogin />
            <Link className="text-sm " href={"/auth/register"}>
              {`Don't have an account?`} <span className="underline text-primary_b font-bold">Register</span>
            </Link>
          </div>
        </div>



      </div>

    </div>
  );
}