import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import EditTaskForm from "@/components/EditFormTask/EditFormTask";
import { getTaskById } from "@/services/taskService";


export type Params = Promise<{ id: string }>;

export default async function EditTaskPage (props: { params: Params}) {

  const { id } = await props.params;
  if (id) {
    return (
      <EditTaskForm taskId={id} />
    );
  }

  redirect("/");
};
