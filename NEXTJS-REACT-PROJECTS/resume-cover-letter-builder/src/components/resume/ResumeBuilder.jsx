import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ModernTemplate, MinimalTemplate } from './ResumeTemplates';
import { generateResumeContent } from '../../config/gemini';
import ExportOptions from './ExportOptions';
import { motion } from 'framer-motion';
import { FaUser, FaBriefcase, FaGraduationCap, FaTools, FaProjectDiagram, FaMagic, FaDownload } from 'react-icons/fa';

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

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [template, setTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const componentRef = useRef();
  const { register, handleSubmit, reset } = useForm();

  const sections = [
    { id: 'personalInfo', label: 'Personal Info', icon: FaUser },
    { id: 'workExperience', label: 'Experience', icon: FaBriefcase },
    { id: 'education', label: 'Education', icon: FaGraduationCap },
    { id: 'skills', label: 'Skills', icon: FaTools },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
  ];

  const handleGenerateContent = async (section, data) => {
    setIsGenerating(true);
    try {
      const generatedContent = await generateResumeContent(section, data);
      
      // Parse the generated content based on section type
      let parsedContent;
      switch (section) {
        case 'workExperience':
          parsedContent = {
            position: data.position,
            company: data.company,
            duration: data.duration,
            achievements: generatedContent.split('\n').filter(item => item.trim()),
          };
          setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, parsedContent],
          }));
          break;

        case 'skills':
          parsedContent = generatedContent.split(',').map(skill => skill.trim());
          setResumeData(prev => ({
            ...prev,
            skills: parsedContent,
          }));
          break;

        case 'projects':
          parsedContent = {
            name: data.name,
            description: generatedContent,
          };
          setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, parsedContent],
          }));
          break;

        default:
          setResumeData(prev => ({
            ...prev,
            [section]: generatedContent,
          }));
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    switch (activeSection) {
      case 'personalInfo':
        setResumeData(prev => ({
          ...prev,
          personalInfo: data,
        }));
        break;

      case 'workExperience':
        if (data.useAI) {
          await handleGenerateContent('workExperience', data);
        } else {
          const newExperience = {
            position: data.position,
            company: data.company,
            duration: data.duration,
            achievements: data.achievements.split('\n').filter(item => item.trim()),
          };
          setResumeData(prev => ({
            ...prev,
            workExperience: [...prev.workExperience, newExperience],
          }));
        }
        break;

      case 'education':
        const newEducation = {
          degree: data.degree,
          school: data.school,
          year: data.year,
          gpa: data.gpa,
        };
        setResumeData(prev => ({
          ...prev,
          education: [...prev.education, newEducation],
        }));
        break;

      case 'skills':
        if (data.useAI) {
          await handleGenerateContent('skills', data);
        } else {
          const skillsList = data.skills.split(',').map(skill => skill.trim());
          setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, ...skillsList],
          }));
        }
        break;

      case 'projects':
        if (data.useAI) {
          await handleGenerateContent('projects', data);
        } else {
          const newProject = {
            name: data.name,
            description: data.description,
            technologies: data.technologies,
          };
          setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, newProject],
          }));
        }
        break;
    }
    reset();
  };

  const renderForm = () => {
    const inputClasses = "mt-1 block w-full bg-gray-800/30 border-gray-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-1";
    
    const formContent = {
      personalInfo: (
        <>
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
        </>
      ),
      workExperience: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Position</label>
              <input type="text" {...register('position')} className={inputClasses} placeholder="Software Engineer" />
            </div>
            <div>
              <label className={labelClasses}>Company</label>
              <input type="text" {...register('company')} className={inputClasses} placeholder="Tech Company Inc." />
            </div>
            <div>
              <label className={labelClasses}>Duration</label>
              <input type="text" {...register('duration')} className={inputClasses} placeholder="Jan 2020 - Present" />
            </div>
            <div>
              <label className={labelClasses}>Achievements</label>
              <textarea {...register('achievements')} rows={4} className={inputClasses} 
                placeholder="• Led development of feature X&#10;• Improved performance by Y%&#10;• Managed team of Z engineers" />
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
              <input type="checkbox" {...register('useAI')} 
                className="h-5 w-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700" />
              <div className="flex items-center">
                <FaMagic className="text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">Use AI to generate professional description</span>
              </div>
            </div>
          </div>
        </>
      ),
      education: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Degree</label>
              <input type="text" {...register('degree')} className={inputClasses} 
                placeholder="Bachelor of Science in Computer Science" />
            </div>
            <div>
              <label className={labelClasses}>School</label>
              <input type="text" {...register('school')} className={inputClasses} placeholder="University Name" />
            </div>
            <div>
              <label className={labelClasses}>Year</label>
              <input type="text" {...register('year')} className={inputClasses} placeholder="2020 - 2024" />
            </div>
            <div>
              <label className={labelClasses}>GPA (optional)</label>
              <input type="text" {...register('gpa')} className={inputClasses} placeholder="3.8/4.0" />
            </div>
          </div>
        </>
      ),
      skills: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Skills</label>
              <textarea {...register('skills')} rows={4} className={inputClasses} 
                placeholder="JavaScript, React, Node.js, Python, etc." />
            </div>
            <div>
              <label className={labelClasses}>Role (for AI generation)</label>
              <input type="text" {...register('role')} className={inputClasses} placeholder="Full Stack Developer" />
            </div>
            <div>
              <label className={labelClasses}>Focus Areas</label>
              <input type="text" {...register('focusAreas')} className={inputClasses} 
                placeholder="Web Development, Cloud Computing" />
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
              <input type="checkbox" {...register('useAI')} 
                className="h-5 w-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700" />
              <div className="flex items-center">
                <FaMagic className="text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">Use AI to generate relevant skills</span>
              </div>
            </div>
          </div>
        </>
      ),
      projects: (
        <>
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>Project Name</label>
              <input type="text" {...register('name')} className={inputClasses} placeholder="E-commerce Platform" />
            </div>
            <div>
              <label className={labelClasses}>Description</label>
              <textarea {...register('description')} rows={4} className={inputClasses} 
                placeholder="Built a full-stack e-commerce platform with features like..." />
            </div>
            <div>
              <label className={labelClasses}>Technologies Used</label>
              <input type="text" {...register('technologies')} className={inputClasses} 
                placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
              <input type="checkbox" {...register('useAI')} 
                className="h-5 w-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-700" />
              <div className="flex items-center">
                <FaMagic className="text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">Use AI to enhance project description</span>
              </div>
            </div>
          </div>
        </>
      ),
    };

    const currentSection = sections.find(s => s.id === activeSection);
    return (
      <FormCard title={currentSection.label} icon={currentSection.icon}>
        {formContent[activeSection]}
      </FormCard>
    );
  };

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
            Build Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Professional Resume</span>
          </h1>
          <p className="text-xl text-gray-300">
            Create a standout resume with our AI-powered builder
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
            {/* Section Navigation */}
            <motion.div variants={itemVariants} className="flex space-x-2 overflow-x-auto pb-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <section.icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {renderForm()}

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
                      <span>Save Section</span>
                    </>
                  )}
                </motion.button>

                <ExportOptions 
                  resumeData={resumeData}
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
              <TemplateComponent data={resumeData} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
