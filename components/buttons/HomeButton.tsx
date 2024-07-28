import Link from "next/link";

export default function HomeButton() {
  return (
    <Link className={`btn-secondary my-3 max-w-36 `} href="/auth/login">
      {"Let's Start"}
    </Link>
  );
}
