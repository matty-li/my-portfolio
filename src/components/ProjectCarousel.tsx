"use client";

import { useEffect, useState } from "react";
import { Media, Row, Column, IconButton, SmartLink, Text, Button } from "@once-ui-system/core";
import styles from "./ProjectCarousel.module.scss";

interface ProjectCarouselItem {
  image: string;
  alt: string;
  href: string;
  description?: string;
}

interface ProjectCarouselProps {
  items: ProjectCarouselItem[];
  interval?: number;
  aspectRatio?: string;
  sizes?: string;
}

export function ProjectCarousel({
  items,
  interval = 4000,
  aspectRatio = "4 / 3",
  sizes,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (items.length === 0) return null;

  const current = items[index];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % items.length);
  };

  const handleDotClick = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i);
  };

  return (
    <Column fillWidth gap="12">
      <Row fillWidth className={styles.wrapper}>
        <Media
          radius="l"
          border="neutral-alpha-weak"
          aspectRatio={aspectRatio}
          sizes={sizes}
          alt={current.alt}
          src={current.image}
        />
        <Row className={styles.overlay} gap="16" vertical="end" horizontal="between">
          <Column gap="4" style={{ flex: 1, minWidth: 0 }}>
            <Text variant="heading-strong-l" style={{ color: "#fff" }}>
              {current.alt}
            </Text>
            {current.description && (
              <Text
                variant="body-default-s"
                style={{ color: "rgba(255,255,255,0.8)" }}
                wrap="balance"
              >
                {current.description}
              </Text>
            )}
          </Column>
          <SmartLink href={current.href} style={{ flexShrink: 0 }}>
            <Button variant="secondary" size="s" weight="default" arrowIcon>
              Read More
            </Button>
          </SmartLink>
        </Row>
        {items.length > 1 && (
  <Row
    fillWidth
    position="absolute"
    top="0"
    left="0"
    style={{ height: "100%", pointerEvents: "none" }}
    horizontal="between"
    vertical="center"
    paddingX="12"
  >
    <IconButton
      onClick={handlePrev}
      variant="secondary"
      icon="chevronLeft"
      style={{ pointerEvents: "auto" }}
    />
    <IconButton
      onClick={handleNext}
      variant="secondary"
      icon="chevronRight"
      style={{ pointerEvents: "auto" }}
    />
  </Row>
)}
      </Row>
      {items.length > 1 && (
        <Row gap="4" horizontal="center">
          {items.map((_, i) => (
            <Row
              key={i}
              onClick={(e) => handleDotClick(e, i)}
              radius="full"
              style={{
                width: i === index ? "16px" : "6px",
                height: "6px",
                cursor: "pointer",
                background:
                  i === index ? "var(--brand-solid-strong)" : "var(--neutral-alpha-medium)",
                transition: "width 0.2s ease",
              }}
            />
          ))}
        </Row>
      )}
    </Column>
  );
}