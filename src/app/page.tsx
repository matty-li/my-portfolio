import {
  Heading,
  Text,
  Button,
  IconButton,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, social, baseURL, routes } from "@/resources";
import { Mailchimp, ProjectCarousel } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  const carouselItems = allProjects
  .filter((project) => project.metadata.images.length > 0)
  .map((project) => ({
    image: project.metadata.images[0],
    alt: project.metadata.title,
    href: `/work/${project.slug}`,
    description: project.metadata.summary,
  }));

  return (
    <Column maxWidth="l" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Row fillWidth gap="40" vertical="center" paddingY="24" s={{ direction: "column" }}>
        <Column flex={5} gap="16" fillWidth>
          <RevealFx translateY="4" fillWidth paddingBottom="8">
            <Heading wrap="balance" variant="display-strong-m">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.15} fillWidth paddingBottom="8">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          {social.length > 0 && (
            <RevealFx translateY="8" delay={0.25} fillWidth>
              <Row gap="8" wrap>
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <IconButton
                          key={item.name}
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                          size="l"
                          tooltip={item.name}
                          data-border="rounded"
                        />
                      ),
                  )}
              </Row>
            </RevealFx>
          )}
          <RevealFx paddingTop="8" delay={0.35} fillWidth>
            <Row gap="12" wrap>
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="primary"
                size="m"
                weight="default"
              >
                About Me
              </Button>
              {person.resume && (
                <Button
                  href={person.resume}
                  variant="secondary"
                  size="m"
                  weight="default"
                  prefixIcon="document"
                  data-border="rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </Button>
              )}
            </Row>
          </RevealFx>
        </Column>
        <Column flex={6} fillWidth>
          <RevealFx translateY="16" delay={0.2} fillWidth>
            <ProjectCarousel
              items={carouselItems}
              interval={4000}
              aspectRatio="4 / 3"
              sizes="(max-width: 960px) 100vw, 720px"
            />
          </RevealFx>
        </Column>
      </Row>
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
      <Mailchimp />
    </Column>
  );
}