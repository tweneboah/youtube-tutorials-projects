import React from 'react';

export const ModernTemplate = ({ data }) => (
  <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg">
    <header className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{data.personalInfo.name}</h1>
      <p className="text-gray-600">{data.personalInfo.email} | {data.personalInfo.phone}</p>
      <p className="text-gray-600">{data.personalInfo.location}</p>
    </header>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 border-b-2 border-indigo-600 mb-3">Professional Summary</h2>
      <p className="text-gray-700">{data.summary}</p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 border-b-2 border-indigo-600 mb-3">Work Experience</h2>
      {data.workExperience.map((exp, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{exp.position}</h3>
          <p className="text-gray-600">{exp.company} | {exp.duration}</p>
          <ul className="list-disc list-inside text-gray-700">
            {exp.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 border-b-2 border-indigo-600 mb-3">Education</h2>
      {data.education.map((edu, index) => (
        <div key={index} className="mb-2">
          <h3 className="font-semibold">{edu.degree}</h3>
          <p className="text-gray-600">{edu.school} | {edu.year}</p>
        </div>
      ))}
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-indigo-600 border-b-2 border-indigo-600 mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {data.skills.map((skill, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            {skill}
          </span>
        ))}
      </div>
    </section>

    {data.projects && (
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-indigo-600 border-b-2 border-indigo-600 mb-3">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-semibold">{project.name}</h3>
            <p className="text-gray-700">{project.description}</p>
          </div>
        ))}
      </section>
    )}
  </div>
);

export const MinimalTemplate = ({ data }) => (
  <div className="max-w-2xl mx-auto p-8 bg-white">
    <header className="border-b-2 border-gray-300 pb-4 mb-6">
      <h1 className="text-4xl font-light text-gray-800">{data.personalInfo.name}</h1>
      <div className="flex gap-4 text-gray-600 mt-2">
        <span>{data.personalInfo.email}</span>
        <span>{data.personalInfo.phone}</span>
        <span>{data.personalInfo.location}</span>
      </div>
    </header>

    <section className="mb-6">
      <p className="text-gray-700 leading-relaxed">{data.summary}</p>
    </section>

    <section className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Experience</h2>
      {data.workExperience.map((exp, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-medium">{exp.position}</h3>
            <span className="text-gray-600 text-sm">{exp.duration}</span>
          </div>
          <p className="text-gray-600 mb-2">{exp.company}</p>
          <ul className="list-disc list-inside text-gray-700">
            {exp.achievements.map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <div className="grid grid-cols-2 gap-6">
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="font-medium">{edu.degree}</h3>
            <p className="text-gray-600">{edu.school}, {edu.year}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="text-gray-700">
              {skill}{index !== data.skills.length - 1 ? " • " : ""}
            </span>
          ))}
        </div>
      </section>
    </div>
  </div>
);
