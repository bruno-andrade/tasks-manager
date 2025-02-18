
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import CreateCategoryForm from "@/components/CreateCategoryForm/CreateCategoryForm";
import Link from "next/link";

const CreateCategory: FunctionComponent = async () => {
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
      </div>
      <p>
        Lista de Categorias
      </p>
    </>
  );
};

export default CreateCategory;


