import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Favorites = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (session) {
    return <h1>Minhas partituras favoritas</h1>;
  }

  redirect("/login");
};

export default Favorites;
