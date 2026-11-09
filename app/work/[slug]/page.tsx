import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkStory } from "@/components/WorkStory";
import { getWork, work } from "@/lib/work";

type Params = { slug: string };

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Sudeep Sharma`,
    description: item.lead,
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();
  return <WorkStory item={item} />;
}
