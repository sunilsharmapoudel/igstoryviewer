import Accordion from "@/components/Accordion";
import ScrollReveal from "@/components/ScrollReveal";

const FAQS = [
  {
    question: "What is IG Story Viewer?",
    answer:
      "IG Story Viewer is a user-friendly tool that allows you to view Instagram stories effortlessly. With our platform, you can watch stories anonymously, download them, and explore profiles without hassle.",
  },
  {
    question: "How does the anonymous IG story viewer work?",
    answer:
      "Our anonymous IG story viewer lets you watch Instagram stories without revealing your identity. Simply enter the username of the account whose stories you want to view, and you can watch them discreetly.",
  },
  {
    question: "Can I download Instagram stories using IG Story Viewer?",
    answer:
      "Yes, you can! Our platform offers a seamless Instagram story download feature. Just find the story you want to save, click the download button, and it will be saved to your device instantly.",
  },
  {
    question: "How do I use the Instagram profile viewer?",
    answer:
      "Using the Instagram profile viewer is simple. Enter the username of the profile you wish to explore, and you can browse their content without needing to follow them.",
  },
  {
    question: "Are these features free to use?",
    answer:
      "Absolutely! All our features, including the IG story viewer, anonymous IG story viewer, Instagram story download, and Instagram profile viewer, are completely free. Enjoy Instagram story viewers free with IG Story Viewer!",
  },
  {
    question: "Is IG Story Viewer easy to use?",
    answer:
      "Yes, IG Story Viewer is designed to be intuitive and user-friendly. Whether you are viewing stories, downloading them, or exploring profiles, our platform ensures a smooth and easy experience.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ScrollReveal className="text-center">
        <h2 className="text-2xl font-bold text-title sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-muted">
          Everything you need to know about IG Story Viewer.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={100} className="mt-10">
        <Accordion
          items={FAQS.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          }))}
        />
      </ScrollReveal>
    </section>
  );
}
