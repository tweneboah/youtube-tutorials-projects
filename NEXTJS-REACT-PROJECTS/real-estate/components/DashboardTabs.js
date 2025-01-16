import { FaHome, FaEnvelope } from 'react-icons/fa';

export default function DashboardTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'listings', label: 'Listings', icon: FaHome },
    { id: 'enquiries', label: 'Enquiries', icon: FaEnvelope },
  ];

  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${
                activeTab === tab.id
                  ? 'bg-[#ffa509] text-white shadow-lg transform scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }
            `}
          >
            <Icon className="h-5 w-5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
