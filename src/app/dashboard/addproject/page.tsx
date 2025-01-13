"use client";
import { addProjects } from "@/lib/action";
import { useRouter } from "next/navigation";
import React from "react";

const AddProjectPage = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      link: formData.get("url") as string,
      studentMatric: formData.get("studentMatric") as string,
    };
    console.log("Form data:", data);
    const result = await addProjects(formData);
    console.log("Result:", result);

    // Redirect to the project page
    router.push(`/dashboard/projects/${data.studentMatric}`);
  };
  return (
    <div className="max-h-screen max-w-screen ">
      {" "}
      <h1 className="text-3xl font-semibold text-center">Add Project</h1>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="h-1/2 w-1/2 m-auto p-4">
        <div className="flex flex-col">
          <input type="text" name="title" placeholder="project title" />
          <input type="text" name="studentMatric" placeholder="matric number" />

          <input type="text" name="url" placeholder="project url" />
          <textarea
            placeholder="project description"
            name="description"></textarea>
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-600 shadow-sm text-white rounded-2xl ">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddProjectPage;
