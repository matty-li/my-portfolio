import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  Column,
  Heading,
  Text,
  SmartLink,
  Line,
  Row,
  Carousel,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  return (
    <Column as="section" maxWidth="l" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <SmartLink href="/work">
        <Text variant="label-strong-m">Projects</Text>
      </SmartLink>
      <Row fillWidth gap="32" vertical="center" s={{ direction: "column" }}>
        {post.metadata.images.length > 0 && (
          <Column flex={6} fillWidth>
            <Carousel
              sizes="(max-width: 960px) 100vw, 960px"
              aspectRatio="16 / 9"
              items={post.metadata.images.map((image) => ({
                slide: image,
                alt: post.metadata.title,
              }))}
            />
          </Column>
        )}
        <Column flex={5} fillWidth gap="8">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
          <Heading variant="display-strong-m">{post.metadata.title}</Heading>
          {post.metadata.summary && (
            <Text variant="body-default-m" onBackground="neutral-weak">
              {post.metadata.summary}
            </Text>
          )}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <Row gap="8" wrap marginTop="4">
              {post.metadata.tags.map((tag) => (
                <SmartLink key={tag} href={`/work?tag=${encodeURIComponent(tag)}`}>
                  <Text
                    variant="label-default-s"
                    onBackground="brand-medium"
                    style={{
                      padding: "1px 8px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--brand-alpha-weak)",
                    }}
                  >
                    {tag}
                  </Text>
                </SmartLink>
              ))}
            </Row>
          )}
        </Column>
      </Row>
      <Column style={{ margin: "auto" }} as="article" maxWidth="200">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}