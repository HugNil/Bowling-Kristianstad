'use client';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title: string;
  intro?: string;
  items: FaqItem[];
  contactPhone?: string;
  className?: string;
};

export default function FaqSection({
  title,
  intro,
  items,
  contactPhone,
  className = "hall-section",
}: FaqSectionProps) {
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/\s|-/g, "")}` : "";

  const renderAnswer = (answer: string) => {
    if (!contactPhone || !answer.includes(contactPhone)) {
      return answer;
    }

    return answer.split(contactPhone).flatMap((part, index, parts) =>
      index === parts.length - 1
        ? [part]
        : [
            part,
            <a
              key={`phone-${index}`}
              href={phoneHref}
              className="font-semibold text-red-800 underline underline-offset-2 hover:text-red-900"
            >
              {contactPhone}
            </a>,
          ],
    );
  };

  return (
    <section className={`hall-faq ${className}`} aria-label={title}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          {title}
        </h2>
        {intro && (
          <p className="text-lg text-gray-600 mb-10">{intro}</p>
        )}
        <div className="faq-list">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-b border-gray-300 py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900">
                {item.question}
                <span className="shrink-0 text-2xl leading-none text-red-800 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-600">{renderAnswer(item.answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
