import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ModernTemplate, MinimalTemplate } from './CoverLetterTemplates';
import { generateCoverLetter } from '../../config/gemini';
import ExportOptions from '../resume/ExportOptions';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaBuilding, FaInfoCircle, FaMagic, FaDownload } from 'react-icons/fa';

const templates = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const FormCard = ({ children, title, icon: Icon }) => (
  <motion.div
    variants={itemVariants}
    className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden"
  >
    <div className="flex items-center space-x-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    {children}
  </motion.div>
);

export default function CoverLetterBuilder() {
  const [template, setTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetterData, setCoverLetterData] = useState({
    personalInfo: {},
    recipientName: '',
    companyName: '',
    companyAddress: '',
    content: '',
  });
  
  const componentRef = useRef();
  const { register, handleSubmit, watch } = useForm();

  const handleGenerate = async (data) => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateCoverLetter({
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        industry: data.industry,
        keySkills: data.keySkills,
        experienceLevel: data.experienceLevel,
        achievements: data.achievements,
        companyInfo: data.companyInfo,
      });

      setCoverLetterData({
        personalInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location,
        },
        recipientName: data.recipientName,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        content: generatedContent,
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const inputClasses = "mt-1 block w-full bg-gray-800/30 border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-1";

  const TemplateComponent = templates[template];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400 via-blue-500 to-transparent"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Create Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Cover Letter</span>
          </h1>
          <p className="text-xl text-gray-300">
            Craft a compelling cover letter with our AI-powered assistant
          </p>
        </motion.div>

        {/* Template Selection */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Choose Template Style</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(templates).map(([key]) => (
                <motion.button
                  key={key}
                  onClick={() => setTemplate(key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    template === key
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-gray-700 hover:border-blue-500/50 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit(handleGenerate)} className="space-y-6">
              <FormCard title="Personal Information" icon={FaUser}>
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Full Name</label>
                    <input type="text" {...register('name')} className={inputClasses} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className={labelClasses}>Email</label>
                    <input type="email" {...register('email')} className={inputClasses} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className={labelClasses}>Phone</label>
                    <input type="tel" {...register('phone')} className={inputClasses} placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className={labelClasses}>Location</label>
                    <input type="text" {...register('location')} className={inputClasses} placeholder="City, State" />
                  </div>
                </div>
              </FormCard>

              <FormCard title="Job Details" icon={FaBriefcase}>
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Job Title</label>
                    <input type="text" {...register('jobTitle')} className={inputClasses} placeholder="Software Engineer" />
                  </div>
                  <div>
                    <label className={labelClasses}>Company Name</label>
                    <input type="text" {...register('companyName')} className={inputClasses} placeholder="Tech Company Inc." />
                  </div>
                  <div>
                    <label className={labelClasses}>Recipient Name (optional)</label>
                    <input type="text" {...register('recipientName')} className={inputClasses} placeholder="Mr. John Smith" />
                  </div>
                  <div>
                    <label className={labelClasses}>Company Address</label>
                    <input type="text" {...register('companyAddress')} className={inputClasses} placeholder="123 Company St, City, State" />
                  </div>
                </div>
              </FormCard>

              <FormCard title="Additional Information" icon={FaInfoCircle}>
                <div className="space-y-4">
                  <div>
                    <label className={labelClasses}>Industry</label>
                    <input type="text" {...register('industry')} className={inputClasses} placeholder="Technology, Healthcare, Finance" />
                  </div>
                  <div>
                    <label className={labelClasses}>Key Skills</label>
                    <input type="text" {...register('keySkills')} className={inputClasses} placeholder="Project Management, React.js, Team Leadership" />
                  </div>
                  <div>
                    <label className={labelClasses}>Experience Level</label>
                    <select {...register('experienceLevel')} className={inputClasses}>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive Level</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Notable Achievements</label>
                    <textarea {...register('achievements')} rows={3} className={inputClasses} 
                      placeholder="List your relevant achievements..." />
                  </div>
                  <div>
                    <label className={labelClasses}>Company Research</label>
                    <textarea {...register('companyInfo')} rows={3} className={inputClasses}
                      placeholder="What interests you about this company? Any recent news or developments?" />
                  </div>
                </div>
              </FormCard>

              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <motion.button
                  type="submit"
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 ${
                    isGenerating
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90'
                  }`}
                  disabled={isGenerating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <FaMagic className="h-5 w-5" />
                      <span>Generate Cover Letter</span>
                    </>
                  )}
                </motion.button>

                <ExportOptions 
                  resumeData={coverLetterData}
                  componentRef={componentRef}
                />
              </motion.div>
            </form>
          </div>

          {/* Preview Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Preview</h3>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaDownload className="h-5 w-5" />
                <span>Export</span>
              </div>
            </div>
            <div ref={componentRef} className="p-8 bg-white">
              <TemplateComponent data={coverLetterData} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
