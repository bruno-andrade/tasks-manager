
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import CreateCategoryForm from "@/components/CreateCategoryForm/CreateCategoryForm";

const CreateCategory: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <CreateCategoryForm/>
  );
};

export default CreateCategory;


