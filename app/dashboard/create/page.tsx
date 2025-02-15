 
import LinkShortener from "@/components/ShortBox";
import { authOptions } from "@/lib/auth";
import { IUser } from "@/types/user";
import { getServerSession } from "next-auth";
import React from "react";

async function CreateLink() {
    const session = await getServerSession(authOptions);
  return (
    <div>
      <LinkShortener user={session?.user as IUser}/>
    </div>
  );
}

export default CreateLink;
