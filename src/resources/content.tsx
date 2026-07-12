import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Matty",
  lastName: "Li",
  name: `Matty Li`,
  role: "Game Developer",
  avatar: "/images/avatar.jpg",
  email: "mattyli.dev@gmail.com",
  location: "Vancouver, BC", // Expecting the IANA time zone identifier, e.g., 'Canada/Pacific'
  languages: [], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
  resume: "/MattyLi_Resume.pdf",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/matty-li",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mattyli42/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "itch.io",
    icon: "itchio",
    link: "https://mattyli.itch.io/",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Looking for a game programmer with a background in art and UI/UX? </>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">https://mattyli.itch.io/</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Play now!
        </Text>
      </Row>
    ),
    href: "https://mattyli.itch.io/",
  },
  subline: (
    <>
      Hi, I'm {person.firstName}. I love learning new skills and solving technical problems.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Get to know ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <br/>I'm always excited to learn new things and expand my skills/knowledge, and I'm happy to help out and support others when I can.
        <br/>While I have a background in art and UI/UX design, I'm drawn to programming and the challenges of technical problem solving.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Game of Apps",
        timeframe: "Jun 2021 - July 2022",
        role: "Design Intern (Summer)",
        achievements: [
          <>
            Redesigned Game of Apps' website and mobile app user experience flows in Figma, building a more efficient and flexible design system and delivering high-fidelity mock-ups
          </>,
          <>
            Developed social media marketing campaigns from strategy to scripted content, and produced node-based motion graphics for video productions in DaVinci Resolve
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
  {
    name: "Kwantlen Polytechnic University",
    timeframe: "Sep 2024 - Present",
    role: <>Advanced Game Development Diploma • <strong>4.3 GPA</strong></>,
    description: (
      <>
        Entertainment Arts Entrance Award for strong application portfolio.
      </>
    ),
  },
  {
    name: "Kwantlen Polytechnic University",
    timeframe: "Sep 2023 - Aug 2024",
    role: <>Entertainment Arts Certificate • <strong>4.33 GPA</strong></>,
    description: (
      <>
        Entertainment Arts Entrance Award for strong application portfolio.
      </>
    ),
  },
],
   
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills",
    skills: [
      {
  title: "Development",
  description: <>Unity description</>,
      tags: [
        { name: "Unity", icon: "unity" },
        { name: "Unreal Engine", icon: "unrealengine" },
        { name: "C#", icon: "csharp" },
        { name: "Python", icon: "python" },
        { name: "Perforce", icon: "perforce" },
        { name: "Git", icon: "git" },
      ],
      images: [],
    },
    {
      title: "Design",
      description: <>Unreal description</>,
      tags: [
        { name: "Figma", icon: "figma" },
        { name: "Adobe Photoshop", icon: "photoshop" },
        { name: "Illustration"},
        { name: "UI/UX Design"},
      ],
      images: [],
    },
    {
      title: "Approach",
      description: <>Unreal description</>,
      tags: [
        { name: "Attention to detail"},
        { name: "Problem solving"},
        { name: "Continuous learner"},
        { name: "Agile development"},
      ],
      images: [],
    },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects`,
  description: `Projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
