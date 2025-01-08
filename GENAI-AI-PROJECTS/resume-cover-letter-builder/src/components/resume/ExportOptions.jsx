import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

export default function ExportOptions({ resumeData, componentRef }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const exportAsPDF = async () => {
    setIsExporting(true);
    setExportProgress(10);

    try {
      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      setExportProgress(50);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      setExportProgress(80);

      const fileName = `${resumeData.personalInfo.name || 'Resume'}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
      pdf.save(fileName);

      setExportProgress(100);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const exportAsJSON = () => {
    try {
      const fileName = `${resumeData.personalInfo.name || 'Resume'}_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
      const fileContent = JSON.stringify(resumeData, null, 2);
      const blob = new Blob([fileContent], { type: 'application/json' });
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Failed to export JSON. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={exportAsPDF}
          disabled={isExporting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting PDF ({exportProgress}%)
            </>
          ) : (
            'Export as PDF'
          )}
        </button>
        
        <button
          onClick={exportAsJSON}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save as Template
        </button>
      </div>

      {isExporting && (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${exportProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
