import { auth } from "@clerk/nextjs/server";
import { getData } from "../lib/api";
import { LinksProvider } from "./(context)/LinksContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  const data = await getData(userId || "");

  return <LinksProvider data={data}>{children}</LinksProvider>;
}
