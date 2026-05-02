import { useEffect, useState } from "react";
import ResumeTemplate from "./components/resume/ResumeTemplate";
import type { ResumeData } from "./components/resume/ResumeTemplate";

const defaultResume: ResumeData = {
  name: "MATTHEW WILSON",
  location: "Indianapolis, IN",
  email: "matthew.b.wilson23@gmail.com",
  phone: "317-379-7774",
  linkedin: "linkedin.com/in/matthew-wilson-856130221",
  github: "github.com/mw228",
  header: "Frontend Software Engineer | Vue, React, TypeScript",

  summary:
    "Accomplished Frontend Software Engineer with 3+ years of experience building and scaling high-traffic web applications using Vue (Nuxt), React, and TypeScript. Experienced in component-driven architecture, CMS integrations, and improving performance and accessibility across enterprise platforms.",

  skills: [
    {
      label: "Frontend",
      value:
        "Vue.js, Nuxt.js, React, TypeScript, JavaScript (ES6+), Tailwind CSS, Bootstrap",
    },
    {
      label: "Architecture & Data",
      value:
        "Component-driven architecture, Headless CMS (Storyblok), API integration, JSON data handling",
    },
    {
      label: "Performance & Quality",
      value:
        "Web performance optimization, Lighthouse, Accessibility (WCAG), Semantic HTML, Cross-browser testing",
    },
    {
      label: "Tools & Workflow",
      value:
        "Git, CI/CD pipelines, Pull Requests, Code Reviews, Agile/Scrum, Production deployments",
    },
  ],

  experience: [
    {
      company: "Navient",
      role: "Software Engineer (Frontend) (Converted from Intern)",
      dates: "May 2023 – October 2025",
      bullets: [
        "Helped modernize and rebuild high-traffic, public-facing web applications, improving usability and mobile responsiveness",
        "Designed and implemented a reusable component library used across multiple full-site rebuilds, reducing development time for future projects",
        "Contributed to full platform rebuilds including Navient, Pioneer Credit Recovery, and Xtend Healthcare using a shared codebase",
        "Took a leading role in migrating from Bootstrap to Tailwind CSS, improving maintainability and build performance",
        "Served as a go-to resource for component development, styling, and debugging across applications",
        "Integrated frontend components with API-driven and CMS-managed data, resolving issues tied to early-stage CMS usage",
        "Improved Lighthouse performance and accessibility scores across multiple applications",
        "Delivered features in an Agile, CI/CD-driven environment using pull requests, code reviews, and automated deployments",
      ],
    },
    {
      company: "Navient",
      role: "Software Engineer Intern",
      dates: "May 2022 – May 2023",
      bullets: [
        "Developed and shipped production frontend features using Vue and TypeScript across high-traffic applications",
        "Built and maintained UI components while resolving bugs in live production systems",
        "Collaborated within an Agile team using pull requests, code reviews, and CI/CD workflows",
        "Selected to support the internship program post-conversion, assisting with onboarding new interns",
      ],
    },
  ],

  projects: [
    {
      name: "Frontend Component Library & Interactive Demos",
      link: "https://mw228.github.io/react-examples/#/",
      github: "https://github.com/mw228",
      bullets: [
        "Built a structured frontend portfolio and demo suite showcasing reusable React components and real-world UI patterns",
        "Implemented forms, dashboards, authentication flows, API integration, filtering, and pagination",
        "Applied modern React practices including hooks, controlled components, and state management",
        "Designed demos to reflect production use cases with loading, error, and empty state handling",
      ],
    },
  ],

  education: {
    school: "Indiana University Purdue University Indianapolis",
    degree: "Bachelor of Science in Computer Science",
  },
};

function loadResume(): ResumeData {
  try {
    const saved = localStorage.getItem("resumeData");
    if (!saved) return defaultResume;

    const parsed = JSON.parse(saved);

    return {
      ...defaultResume,
      ...parsed,
      skills: Array.isArray(parsed.skills)
        ? parsed.skills
        : defaultResume.skills,
      experience: Array.isArray(parsed.experience)
        ? parsed.experience
        : defaultResume.experience,
      education: {
        ...defaultResume.education,
        ...(parsed.education || {}),
      },
    };
  } catch {
    return defaultResume;
  }
}

export default function App() {
  const [resume, setResume] = useState<ResumeData>(loadResume);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resume));
  }, [resume]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Editor Panel */}
      <div className="lg:w-[420px] w-full border-r bg-gray-50 p-6 overflow-y-auto no-print">
        <h2 className="text-lg font-semibold mb-6">Resume Editor</h2>

        {/* Identity */}
        <EditorSection title="Identity">
          <Field
            label="Name"
            value={resume.name}
            onChange={(value) => setResume({ ...resume, name: value })}
          />
          <Field
            label="Header"
            value={resume.header}
            onChange={(value) => setResume({ ...resume, header: value })}
          />
          <Field
            label="Location"
            value={resume.location}
            onChange={(value) => setResume({ ...resume, location: value })}
          />
          <Field
            label="Email"
            value={resume.email}
            onChange={(value) => setResume({ ...resume, email: value })}
          />
          <Field
            label="Phone"
            value={resume.phone}
            onChange={(value) => setResume({ ...resume, phone: value })}
          />
          <Field
            label="LinkedIn"
            value={resume.linkedin}
            onChange={(value) => setResume({ ...resume, linkedin: value })}
          />
          <Field
            label="GitHub"
            value={resume.github}
            onChange={(value) => setResume({ ...resume, github: value })}
          />

          <TextArea
            label="Professional Summary"
            value={resume.summary}
            rows={4}
            onChange={(value) => setResume({ ...resume, summary: value })}
          />
        </EditorSection>

        {/* Skills */}
        <EditorSection title="Core Technical Skills">
          <div className="space-y-3">
            {resume.skills.map((skill, index) => (
              <div
                key={index}
                className="rounded border border-gray-200 p-3 bg-white"
              >
                <Field
                  label="Label"
                  value={skill.label}
                  onChange={(value) => {
                    const skills = [...resume.skills];
                    skills[index] = { ...skills[index], label: value };
                    setResume({ ...resume, skills });
                  }}
                />
                <TextArea
                  label="Value"
                  value={skill.value}
                  rows={2}
                  onChange={(value) => {
                    const skills = [...resume.skills];
                    skills[index] = { ...skills[index], value };
                    setResume({ ...resume, skills });
                  }}
                />

                <button
                  type="button"
                  className="mt-2 text-sm text-gray-700 underline"
                  onClick={() => {
                    const skills = resume.skills.filter((_, i) => i !== index);
                    setResume({ ...resume, skills });
                  }}
                >
                  Remove skill row
                </button>
              </div>
            ))}

            <button
              type="button"
              className="w-full rounded border border-gray-300 bg-white py-2 text-sm font-medium"
              onClick={() => {
                setResume({
                  ...resume,
                  skills: [
                    ...resume.skills,
                    { label: "New Category", value: "" },
                  ],
                });
              }}
            >
              + Add skill row
            </button>
          </div>
        </EditorSection>

        {/* Experience */}
        <EditorSection title="Professional Experience">
          <div className="space-y-6">
            {resume.experience.map((job, jobIndex) => (
              <div
                key={jobIndex}
                className="rounded border border-gray-200 p-3 bg-white"
              >
                <Field
                  label="Company"
                  value={job.company}
                  onChange={(value) => {
                    const experience = [...resume.experience];
                    experience[jobIndex] = {
                      ...experience[jobIndex],
                      company: value,
                    };
                    setResume({ ...resume, experience });
                  }}
                />
                <Field
                  label="Role"
                  value={job.role}
                  onChange={(value) => {
                    const experience = [...resume.experience];
                    experience[jobIndex] = {
                      ...experience[jobIndex],
                      role: value,
                    };
                    setResume({ ...resume, experience });
                  }}
                />
                <Field
                  label="Dates"
                  value={job.dates}
                  onChange={(value) => {
                    const experience = [...resume.experience];
                    experience[jobIndex] = {
                      ...experience[jobIndex],
                      dates: value,
                    };
                    setResume({ ...resume, experience });
                  }}
                />

                <div className="mt-4">
                  <div className="text-sm font-semibold mb-2">Bullets</div>

                  {job.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="mb-2">
                      <textarea
                        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        rows={2}
                        value={bullet}
                        onChange={(e) => {
                          const experience = [...resume.experience];
                          const bullets = [...experience[jobIndex].bullets];
                          bullets[bulletIndex] = e.target.value;
                          experience[jobIndex] = {
                            ...experience[jobIndex],
                            bullets,
                          };
                          setResume({ ...resume, experience });
                        }}
                      />

                      <button
                        type="button"
                        className="mt-1 text-xs text-gray-700 underline"
                        onClick={() => {
                          const experience = [...resume.experience];
                          const bullets = experience[jobIndex].bullets.filter(
                            (_, i) => i !== bulletIndex,
                          );
                          experience[jobIndex] = {
                            ...experience[jobIndex],
                            bullets,
                          };
                          setResume({ ...resume, experience });
                        }}
                      >
                        Remove bullet
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="mt-2 w-full rounded border border-gray-300 bg-white py-2 text-sm font-medium"
                    onClick={() => {
                      const experience = [...resume.experience];
                      const bullets = [...experience[jobIndex].bullets, ""];
                      experience[jobIndex] = {
                        ...experience[jobIndex],
                        bullets,
                      };
                      setResume({ ...resume, experience });
                    }}
                  >
                    + Add bullet
                  </button>
                </div>

                <button
                  type="button"
                  className="mt-4 text-sm text-gray-700 underline"
                  onClick={() => {
                    const experience = resume.experience.filter(
                      (_, i) => i !== jobIndex,
                    );
                    setResume({ ...resume, experience });
                  }}
                >
                  Remove job
                </button>
              </div>
            ))}

            <button
              type="button"
              className="w-full rounded border border-gray-300 bg-white py-2 text-sm font-medium"
              onClick={() => {
                setResume({
                  ...resume,
                  experience: [
                    ...resume.experience,
                    {
                      company: "Company",
                      role: "Role",
                      dates: "Dates",
                      bullets: [""],
                    },
                  ],
                });
              }}
            >
              + Add job
            </button>
          </div>
        </EditorSection>
        <EditorSection title="Projects">
          <div className="space-y-6">
            {resume.projects.map((project, projectIndex) => (
              <div
                key={projectIndex}
                className="rounded border border-gray-200 p-3 bg-white"
              >
                <Field
                  label="Project Name"
                  value={project.name}
                  onChange={(value) => {
                    const projects = [...resume.projects];
                    projects[projectIndex].name = value;
                    setResume({ ...resume, projects });
                  }}
                />

                <Field
                  label="Live Link"
                  value={project.link || ""}
                  onChange={(value) => {
                    const projects = [...resume.projects];
                    projects[projectIndex].link = value;
                    setResume({ ...resume, projects });
                  }}
                />

                <Field
                  label="GitHub"
                  value={project.github || ""}
                  onChange={(value) => {
                    const projects = [...resume.projects];
                    projects[projectIndex].github = value;
                    setResume({ ...resume, projects });
                  }}
                />

                <div className="mt-4">
                  <div className="text-sm font-semibold mb-2">Bullets</div>

                  {project.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="mb-2">
                      <textarea
                        className="w-full border border-gray-300 p-2 text-sm"
                        rows={2}
                        value={bullet}
                        onChange={(e) => {
                          const projects = [...resume.projects];
                          projects[projectIndex].bullets[bulletIndex] =
                            e.target.value;
                          setResume({ ...resume, projects });
                        }}
                      />

                      <button
                        type="button"
                        className="mt-1 text-xs underline"
                        onClick={() => {
                          const projects = [...resume.projects];
                          projects[projectIndex].bullets = projects[
                            projectIndex
                          ].bullets.filter((_, i) => i !== bulletIndex);
                          setResume({ ...resume, projects });
                        }}
                      >
                        Remove bullet
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="mt-2 w-full border py-2 text-sm"
                    onClick={() => {
                      const projects = [...resume.projects];
                      projects[projectIndex].bullets.push("");
                      setResume({ ...resume, projects });
                    }}
                  >
                    + Add bullet
                  </button>
                </div>

                <button
                  type="button"
                  className="mt-4 text-sm underline"
                  onClick={() => {
                    const projects = resume.projects.filter(
                      (_, i) => i !== projectIndex,
                    );
                    setResume({ ...resume, projects });
                  }}
                >
                  Remove project
                </button>
              </div>
            ))}

            <button
              type="button"
              className="w-full border py-2 text-sm"
              onClick={() => {
                setResume({
                  ...resume,
                  projects: [
                    ...resume.projects,
                    {
                      name: "New Project",
                      link: "",
                      github: "",
                      bullets: [""],
                    },
                  ],
                });
              }}
            >
              + Add project
            </button>
          </div>
        </EditorSection>
        {/* Education */}
        <EditorSection title="Education">
          <Field
            label="School"
            value={resume.education.school}
            onChange={(value) =>
              setResume({
                ...resume,
                education: { ...resume.education, school: value },
              })
            }
          />
          <Field
            label="Degree"
            value={resume.education.degree}
            onChange={(value) =>
              setResume({
                ...resume,
                education: { ...resume.education, degree: value },
              })
            }
          />
        </EditorSection>
      </div>

      {/* Resume Preview */}
      <div className="flex-1 overflow-auto bg-gray-200 print:bg-white">
        <div className="flex justify-center py-8">
          <ResumeTemplate resume={resume} />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <input
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function EditorSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="text-md font-semibold mb-3">{title}</div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TextArea({
  label,
  value,
  rows = 3,
  onChange,
}: {
  label: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <textarea
        className="w-full border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
