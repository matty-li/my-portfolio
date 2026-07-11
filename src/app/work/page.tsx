import { Column, Heading, Meta, Schema, Row, SmartLink, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default async function Work({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}) {
  const { tag, sort } = await searchParams;
  const activeSort = sort === "oldest" ? "oldest" : "newest";

  const allProjects = getPosts(["src", "app", "work", "projects"]);
  const allTags = Array.from(
    new Set(allProjects.flatMap((post) => post.metadata.tags || []))
  );

  const buildQuery = (params: { tag?: string; sort?: string }) => {
    const query = new URLSearchParams();
    if (params.tag) query.set("tag", params.tag);
    if (params.sort) query.set("sort", params.sort);
    const q = query.toString();
    return q ? `/work?${q}` : "/work";
  };

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Row fillWidth horizontal="between" vertical="center" wrap marginBottom="l" gap="16">
        <Row gap="8" wrap>
          <SmartLink href={buildQuery({ sort })}>
            <Text variant="label-default-s" onBackground={!tag ? "brand-strong" : "neutral-weak"}>
              All
            </Text>
          </SmartLink>
          {allTags.map((t) => (
            <SmartLink key={t} href={buildQuery({ tag: t, sort })}>
              <Text
                variant="label-default-s"
                onBackground={tag === t ? "brand-strong" : "neutral-weak"}
              >
                {t}
              </Text>
            </SmartLink>
          ))}
        </Row>
        <Row gap="8">
          <SmartLink href={buildQuery({ tag, sort: "newest" })}>
            <Text
              variant="label-default-s"
              onBackground={activeSort === "newest" ? "brand-strong" : "neutral-weak"}
            >
              Newest
            </Text>
          </SmartLink>
          <SmartLink href={buildQuery({ tag, sort: "oldest" })}>
            <Text
              variant="label-default-s"
              onBackground={activeSort === "oldest" ? "brand-strong" : "neutral-weak"}
            >
              Oldest
            </Text>
          </SmartLink>
        </Row>
      </Row>
      <Projects tag={tag} layout="list" sort={activeSort} />
    </Column>
  );
}