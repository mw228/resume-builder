export type ResumeData = {
  name: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  header: string;

  skills: {
    label: string;
    value: string;
  }[];

  experience: {
    company: string;
    role: string;
    dates: string;
    bullets: string[];
  }[];

  projects: {
    name: string;
    link?: string;
    github?: string;
    bullets: string[];
  }[];

  education: {
    school: string;
    degree: string;
  };
};

export default function ResumeTemplate({ resume }: { resume: ResumeData }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 print:bg-white print:py-0">
      <div className="mx-auto w-full max-w-[800px] bg-white shadow-sm print:shadow-none px-16 py-14 print:px-8 print:py-0">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-[36px] font-semibold tracking-[0.08em] text-[#1E2A38]">
            {resume.name}
          </h1>

          <div className="mt-2 h-[2px] w-16 bg-[#1E2A38]" />

          <div className="mt-3 text-[10pt] text-gray-600 leading-relaxed">
            {resume.header}
          </div>

          <div className="mt-3 text-[10pt] text-gray-600 leading-relaxed">
            {resume.location} • {resume.email} • {resume.phone}
          </div>

          <div className="text-[10pt] text-gray-600">
            {resume.linkedin} • {resume.github}
          </div>
        </div>

        {/* SUMMARY */}
        <Section title="Professional Summary">
          <p className="text-[11pt] leading-[1.5] text-gray-800">
            {resume.summary}
          </p>
        </Section>

        {/* SKILLS */}
        <Section title="Core Technical Skills">
          <div className="space-y-1 text-[10.5pt] text-gray-800">
            {resume.skills.map((skill, index) => (
              <p key={index}>
                <span className="font-semibold text-gray-900">
                  {skill.label}:
                </span>{" "}
                {skill.value}
              </p>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section title="Professional Experience">
          {resume.experience.map((job, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[12.5pt] font-semibold text-gray-900">
                  {job.company}
                </h3>

                <span className="text-[10.5pt] text-gray-500">{job.dates}</span>
              </div>

              <p className="text-[11pt] text-gray-700 mt-1">{job.role}</p>

              <ul className="mt-3 list-disc ml-5 space-y-1 text-[10.5pt] leading-[1.4] text-gray-800">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* PROJECTS */}
        {resume.projects?.length > 0 && (
          <Section title="Projects">
            {resume.projects.map((project, index) => (
              <div key={index} className="mb-5 break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[12.5pt] font-semibold text-gray-900">
                    {project.name}
                  </h3>

                  <span className="text-[10.5pt] text-gray-500">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="underline whitespace-nowrap"
                      >
                        mw228.github.io/react-examples
                      </a>
                    )}
                  </span>
                </div>

                <ul className="mt-3 list-disc ml-5 space-y-1 text-[10.5pt] leading-[1.4] text-gray-800">
                  {project.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {/* EDUCATION */}
        <Section title="Education">
          <p className="text-[10.5pt] text-gray-800">
            <span className="font-semibold text-gray-900">
              {resume.education.school}
            </span>{" "}
            — {resume.education.degree}
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-[12.5px] font-semibold tracking-[0.12em] uppercase text-gray-800">
        {title}
      </h2>

      <div className="mt-2 h-[1px] bg-black print:bg-black" />

      <div className="mt-3">{children}</div>
    </div>
  );
}
