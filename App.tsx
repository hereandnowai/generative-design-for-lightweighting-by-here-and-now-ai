
import React from 'react';
import { BRANDING_CONFIG, MATERIALS, DEFAULT_SAFETY_FACTOR } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import DesignInputForm from './components/DesignInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import EducationalContent from './components/EducationalContent';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import HistoryPage from './components/HistoryPage'; // New import
import { DesignParameters, DesignResults, HistoricDesign } from './types';

const MAX_HISTORY_ITEMS = 20;
const HISTORY_STORAGE_KEY = 'generativeDesignHistory';

type CurrentPage = 'home' | 'designer' | 'about' | 'history';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<CurrentPage>('home');
  const [designParams, setDesignParams] = React.useState<DesignParameters>({
    componentType: '',
    dimensions: { length: 100, width: 50, height: 20 },
    material: 'aluminum-6061',
    load: 1000, // N
    safetyFactor: DEFAULT_SAFETY_FACTOR,
  });
  const [results, setResults] = React.useState<DesignResults | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const saveDesignToHistory = (params: DesignParameters, results: DesignResults) => {
    try {
      const newHistoricDesign: HistoricDesign = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        params,
        results,
      };

      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      let history: HistoricDesign[] = storedHistory ? JSON.parse(storedHistory) : [];
      
      history.unshift(newHistoricDesign); // Add to the beginning

      if (history.length > MAX_HISTORY_ITEMS) {
        history = history.slice(0, MAX_HISTORY_ITEMS); // Keep only the newest items
      }
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save design to history:", error);
      // Optionally, inform the user if saving fails, though it's a non-critical feature.
    }
  };


  const handleGenerateDesign = async () => {
    setIsLoading(true);
    // Simulate API call / processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedMaterial = MATERIALS.find(m => m.id === designParams.material);
    const densityInKgPerMm3 = selectedMaterial ? selectedMaterial.density / 1e9 : 2.7e-9; 

    const volumeMm3 = designParams.dimensions.length * designParams.dimensions.width * designParams.dimensions.height; 
    const originalWeightInKg = volumeMm3 * densityInKgPerMm3; 
    const originalWeightInGrams = originalWeightInKg * 1000; 
    
    const newWeightInGrams = originalWeightInGrams * 0.3; 
    
    const currentResults: DesignResults = {
      originalWeight: originalWeightInGrams.toFixed(2),
      newWeight: newWeightInGrams.toFixed(2),
      weightReductionPercentage: (((originalWeightInGrams - newWeightInGrams) / originalWeightInGrams) * 100).toFixed(1),
      materialSaved: (originalWeightInGrams - newWeightInGrams).toFixed(2),
      stressDistribution: 'Optimized - Stress levels within acceptable limits',
      safetyFactorAchieved: designParams.safetyFactor <= (selectedMaterial ? selectedMaterial.yieldStrength / ( (designParams.load / (designParams.dimensions.width * designParams.dimensions.height / 2 )) / 1e6 ) / designParams.safetyFactor : 2.5) ? `Yes (Met ${designParams.safetyFactor})` : `Review Required (Target: ${designParams.safetyFactor})`,
      manufacturingFeasibility: 'Suitable for Additive Manufacturing (e.g., 3D Printing) and CNC Machining with considerations for complexity.',
      environmentalImpact: {
        fuelSavings: 'Potentially significant in mobile applications due to weight reduction.',
        carbonReduction: 'Notable reduction in material usage and operational energy consumption.'
      },
      designFile: `optimized_${designParams.componentType || 'part'}_${new Date().toISOString().slice(0,10)}.stl`
    };
    
    setResults(currentResults);
    saveDesignToHistory(designParams, currentResults); // Save to history
    setIsLoading(false);
  };

  const navigateTo = (page: CurrentPage) => {
    setCurrentPage(page);
    setResults(null); // Clear results when navigating away from designer, unless going to history page from designer
  };
  
  const handleNavigate = (page: CurrentPage) => {
    if (page === 'designer' && currentPage === 'history') {
        // Potentially pre-fill form if navigating from history to designer, TBD
        setCurrentPage(page);
    } else if (page !== 'designer') {
        setResults(null); // Clear results if not navigating to designer page
        setCurrentPage(page);
    } else {
        setCurrentPage(page);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage 
            onNavigateToDesigner={() => handleNavigate('designer')} 
          />
        )}
        {currentPage === 'designer' && (
          <>
            <h1 className="text-3xl font-bold text-brandSecondary mb-6 text-center">
              Generative Design for Lightweighting
            </h1>
            <p className="text-center mb-8 text-lg">
              Design lightweight, high-performance mechanical parts optimized for strength and material usage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DesignInputForm 
                designParams={designParams}
                setDesignParams={setDesignParams}
                onGenerate={handleGenerateDesign}
                isLoading={isLoading}
              />
              <ResultsDisplay results={results} isLoading={isLoading} />
            </div>
            
            <EducationalContent />
          </>
        )}
        {currentPage === 'about' && (
          <AboutPage />
        )}
        {currentPage === 'history' && (
          <HistoryPage onNavigateToDesigner={(params, res) => {
            setDesignParams(params);
            setResults(res);
            handleNavigate('designer');
          }} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
