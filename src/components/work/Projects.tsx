import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard, ProjectListItem } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  tag?: string;
  layout?: "card" | "list";
  sort?: "newest" | "oldest";
}

export function Projects({ range, exclude, tag, layout = "card", sort = "newest" }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  if (tag) {
    allProjects = allProjects.filter((post) => post.metadata.tags?.includes(tag));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    const diff = new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    return sort === "oldest" ? -diff : diff;
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (layout === "list") {
    return (
      <Column fillWidth marginBottom="40" paddingX="l">
        {displayedProjects.map((post) => (
          <ProjectListItem
            key={post.slug}
            href={`/work/${post.slug}`}
            image={post.metadata.images?.[0]}
            title={post.metadata.title}
            description={post.metadata.summary}
            tags={post.metadata.tags}
            ctaHref={post.metadata.link}
            date={post.metadata.publishedAt}
          />
        ))}
      </Column>
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={[]}
          link={post.metadata.link || ""}
          tags={post.metadata.tags}
        />
      ))}
    </Column>
  );
}