/* eslint-disable @typescript-eslint/ban-ts-comment */

import { notFound } from "next/navigation";
import db from "@/lib/db";
import { ILinks } from "@/types/links";
import { headers } from "next/headers";
import EditLink from "@/components/editlinks";

type tParams = Promise<{ id: string }>;

export default async function EditLinkPage({ params }: { params: tParams }) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  // Get the short URL from params
  const { id } = await params;

  //@ts-expect-error
  const link: ILinks = await db.shortLink.findUnique({
    where: { id },
  });

  if (!link) {
    return notFound(); // Show 404 page if the link is not found
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Link</h2>
      <EditLink baseUrl={baseUrl} link={link} id={id} />
    </div>
  );
}
