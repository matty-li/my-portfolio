"use client";

import { useRouter } from "next/navigation";
import { Row, Column, Media, Heading, Text, SmartLink } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

interface ProjectListItemProps {
  href: string;
  image?: string;
  title: string;
  description: string;
  tags?: string[];
  ctaHref?: string;
  date?: string;
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({
  href,
  image,
  title,
  description,
  tags = [],
  ctaHref,
  date,
}) => {
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/work?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <Column
      fillWidth
      gap="8"
      paddingY="12"
      paddingX="8"
      style={{ borderBottom: "1px solid var(--neutral-alpha-medium)" }}
    >
      <SmartLink href={href} style={{ width: "100%" }}>
        <Row fillWidth gap="16" vertical="center" s={{ direction: "column", horizontal: "start" }}>
          {image && (
            <Media
              src={image}
              alt={title}
              aspectRatio="4 / 3"
              radius="m"
              style={{ width: "220px", height: "165px", flexShrink: 0 }}
            />
          )}
          <Column gap="4" fillWidth>
            <Row fillWidth horizontal="between" vertical="center" wrap>
              <Heading as="h3" variant="heading-strong-m" wrap="balance">
                {title}
              </Heading>
              {date && (
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {formatDate(date)}
                </Text>
              )}
            </Row>
            {description?.trim() && (
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                wrap="balance"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {description}
              </Text>
            )}
            {tags.length > 0 && (
              <Row gap="8" wrap marginTop="4">
                {tags.map((tag) => (
                  <Text
                    key={tag}
                    variant="label-default-s"
                    onBackground="brand-medium"
                    onClick={(e) => handleTagClick(e, tag)}
                    style={{
                      padding: "1px 8px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--brand-alpha-weak)",
                      cursor: "pointer",
                    }}
                  >
                    {tag}
                  </Text>
                ))}
              </Row>
            )}
          </Column>
        </Row>
      </SmartLink>
      {ctaHref && (
        <Row fillWidth horizontal="end">
          <SmartLink
            suffixIcon="arrowUpRightFromSquare"
            style={{ margin: "0", width: "fit-content" }}
            href={ctaHref}
          >
            <Text variant="body-default-s">Play Now</Text>
          </SmartLink>
        </Row>
      )}
    </Column>
  );
};