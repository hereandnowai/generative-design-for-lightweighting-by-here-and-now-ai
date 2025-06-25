
import React, { useState, useEffect, useCallback } from 'react';
import { HistoricDesign, DesignParameters, DesignResults } from '../types';
import { MATERIALS, COMPONENT_TYPES } from '../constants';
import { FiTrash2, FiEye, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const HISTORY_STORAGE_KEY = 'generativeDesignHistory';

interface HistoryPageProps {
  onNavigateToDesigner: (params: DesignParameters, results: DesignResults) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigateToDesigner }) => {
  const [historicDesigns, setHistoricDesigns] = useState<HistoricDesign[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const loadHistory = useCallback(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistoricDesigns(JSON.parse(storedHistory));
      } else {
        setHistoricDesigns([]);
      }
    } catch (error) {
      console.error("Error loading design history:", error);
      setHistoricDesigns([]); // Reset to empty on error
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const deleteDesign = (id: string) => {
    if (window.confirm("Are you sure you want to delete this design from history?")) {
      try {
        const updatedHistory = historicDesigns.filter(design => design.id !== id);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
        setHistoricDesigns(updatedHistory);
      } catch (error) {
        console.error("Error deleting design from history:", error);
        alert("Failed to delete design. Please try again.");
      }
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHistoricDesigns([]);
      setShowClearConfirm(false);
    } catch (error) {
      console.error("Error clearing design history:", error);
      alert("Failed to clear history. Please try again.");
    }
  };

  const getMaterialName = (id: string) => MATERIALS.find(m => m.id === id)?.name || id;
  const getComponentTypeName = (id: string) => COMPONENT_TYPES.find(ct => ct.id === id)?.name || id;

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="animate-fadeIn py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-brandSecondary">Design History</h1>
        {historicDesigns.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-150 flex items-center"
            aria-label="Clear all design history"
          >
            <FiXCircle className="mr-2" /> Clear All History
          </button>
        )}
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center"><FiAlertTriangle className="mr-2"/>Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete all design history? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {historicDesigns.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="mt-4 text-lg text-gray-500">No past designs found.</p>
          <p className="text-sm text-gray-400">Designs you generate will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historicDesigns.map((design) => (
            <div key={design.id} className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-brandSecondary capitalize">
                    {design.params.componentType ? getComponentTypeName(design.params.componentType) : 'Custom Part'}
                  </h2>
                  <p className="text-xs text-gray-500">Generated: {formatDate(design.timestamp)}</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <p><strong className="text-gray-600">Material:</strong> {getMaterialName(design.params.material)}</p>
                  <p><strong className="text-gray-600">Original Weight:</strong> {design.results.originalWeight} g</p>
                  <p><strong className="text-gray-600">Optimized Weight:</strong> {design.results.newWeight} g</p>
                  <p className="font-semibold text-green-600">
                    <strong className="text-gray-600">Reduction:</strong> {design.results.weightReductionPercentage}%
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
                 <button
                  onClick={() => onNavigateToDesigner(design.params, design.results)}
                  className="text-sm text-brandSecondary hover:text-brandPrimary p-2 rounded-md transition-colors flex items-center"
                  aria-label="View design details and parameters"
                >
                  <FiEye className="mr-1" /> View/Reload
                </button>
                <button
                  onClick={() => deleteDesign(design.id)}
                  className="text-sm text-red-500 hover:text-red-700 p-2 rounded-md transition-colors flex items-center"
                  aria-label="Delete this design from history"
                >
                  <FiTrash2 className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
