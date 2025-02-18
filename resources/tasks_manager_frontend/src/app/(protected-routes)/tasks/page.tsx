import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import CreateCategoryForm from "@/components/CreateCategoryForm/CreateCategoryForm";
import Link from "next/link";
import TaskList from "@/components/TaskList/TaskList";

const CreateCategory: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="flex space-x-4">
        <Link href="/tasks/create">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Criar Tarefa
          </button>
        </Link>
      </div>
     <TaskList />
    </>
  );
};

export default CreateCategory;
