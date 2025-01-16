import React from 'react';

export const ModernTemplate = ({ data }) => (
  <div className="max-w-2xl mx-auto p-8 bg-white">
    <header className="mb-8">
      <div className="text-right mb-8">
        <p>{data.personalInfo.name}</p>
        <p>{data.personalInfo.email}</p>
        <p>{data.personalInfo.phone}</p>
        <p>{data.personalInfo.location}</p>
      </div>
      <div className="mb-8">
        <p>{new Date().toLocaleDateString()}</p>
      </div>
      <div className="mb-8">
        <p>{data.recipientName}</p>
        <p>{data.companyName}</p>
        <p>{data.companyAddress}</p>
      </div>
    </header>

    <main className="space-y-6 text-gray-800">
      <p>Dear {data.recipientName || 'Hiring Manager'},</p>
      
      <div className="whitespace-pre-line">
        {data.content}
      </div>

      <div className="mt-8">
        <p>Sincerely,</p>
        <p className="mt-4">{data.personalInfo.name}</p>
      </div>
    </main>
  </div>
);

export const MinimalTemplate = ({ data }) => (
  <div className="max-w-2xl mx-auto p-8 bg-white">
    <header className="border-b pb-6 mb-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-light text-gray-800">{data.personalInfo.name}</h1>
        <div className="text-gray-600 space-x-4">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
        </div>
      </div>
    </header>

    <main className="space-y-6 text-gray-800">
      <div className="mb-8">
        <p>{new Date().toLocaleDateString()}</p>
        <p className="mt-4">{data.recipientName}</p>
        <p>{data.companyName}</p>
        <p>{data.companyAddress}</p>
      </div>

      <p>Dear {data.recipientName || 'Hiring Manager'},</p>
      
      <div className="whitespace-pre-line leading-relaxed">
        {data.content}
      </div>

      <div className="mt-8">
        <p>Best regards,</p>
        <p className="mt-4">{data.personalInfo.name}</p>
      </div>
    </main>
  </div>
);
