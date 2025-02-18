
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import CreateTaskForm from "@/components/CreateTaskForm/CreateTaskForm";

const CreateCategory: FunctionComponent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <CreateTaskForm/>
  );
};

export default CreateCategory;


