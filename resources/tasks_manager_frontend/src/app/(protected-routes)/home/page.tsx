import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";

const Home: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="flex space-x-4">
        <Link href="/category/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Criar Categoria
          </button>
        </Link>

        <Link href="/tasks/create">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Criar Tarefa
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;

interface Task {
  id: string;
  title: string;
  status: string;
  category: {
    id: string;
    name: string;
  };
  created_at: string;
}
