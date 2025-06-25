
import React from 'react';
import { MATERIALS, COMPONENT_TYPES, DEFAULT_SAFETY_FACTOR } from '../constants';
import { Material, ComponentType, DesignParameters } from '../types';

interface DesignInputFormProps {
  designParams: DesignParameters; 
  setDesignParams: React.Dispatch<React.SetStateAction<DesignParameters>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{ 
  label: string; 
  id: string; 
  type?: string; 
  value: string | number; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; 
  children?: React.ReactNode; 
  min?: number; 
  step?: number; 
  required?: boolean; 
  tooltip?: string;
  name?: string;
}> = 
  ({ label, id, type = "text", value, onChange, children, min, step, required, tooltip, name }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
      {label}
      {tooltip && (
        <span className="ml-1 group relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {tooltip}
          </span>
        </span>
      )}
    </label>
    {type === "select" ? (
      <select id={id} name={name || id} value={value} onChange={onChange} required={required} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-brandPrimary focus:border-brandPrimary sm:text-sm">
        {children}
      </select>
    ) : (
      <input type={type} id={id} name={name || id} value={value} onChange={onChange} min={min} step={step} required={required} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-brandPrimary focus:border-brandPrimary sm:text-sm" />
    )}
  </div>
);


const DesignInputForm: React.FC<DesignInputFormProps> = ({ designParams, setDesignParams, onGenerate, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const targetValue = e.target.type === 'number' ? parseFloat(value) : value;
    
    if (name.startsWith("dimension-")) {
        const dimensionKey = name.split("-")[1] as keyof DesignParameters['dimensions'];
        setDesignParams(prev => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [dimensionKey]: parseFloat(value), // Dimensions are always numbers
            }
        }));
    } else {
        setDesignParams(prev => ({
            ...prev,
            [name]: targetValue,
        }));
    }
  };
  
  const selectedMaterial = MATERIALS.find(m => m.id === designParams.material);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-brandSecondary mb-6">1. Design Parameters</h2>
      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }}>
        <InputField
          label="Component Type"
          id="componentType"
          type="select"
          value={designParams.componentType}
          onChange={handleInputChange}
          name="componentType" 
          required
          tooltip="Select the type of component you are designing (e.g., Bracket, Beam)."
        >
          <option value="" disabled>Select component type</option>
          {COMPONENT_TYPES.map((type: ComponentType) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </InputField>

        <h3 className="text-md font-semibold text-gray-700 mt-6 mb-2">Dimensions (mm)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Length"
            id="dimension-length"
            name="dimension-length" // Ensure name matches for handler
            type="number"
            value={designParams.dimensions.length}
            onChange={handleInputChange}
            min={1}
            required
            tooltip="Overall length of the component's bounding box."
          />
          <InputField
            label="Width"
            id="dimension-width"
            name="dimension-width" // Ensure name matches for handler
            type="number"
            value={designParams.dimensions.width}
            onChange={handleInputChange}
            min={1}
            required
            tooltip="Overall width of the component's bounding box."
          />
          <InputField
            label="Height"
            id="dimension-height"
            name="dimension-height" // Ensure name matches for handler
            type="number"
            value={designParams.dimensions.height}
            onChange={handleInputChange}
            min={1}
            required
            tooltip="Overall height of the component's bounding box."
          />
        </div>

        <h3 className="text-md font-semibold text-gray-700 mt-6 mb-2">Material & Load</h3>
        <InputField
          label="Material"
          id="material"
          type="select"
          value={designParams.material}
          onChange={handleInputChange}
          name="material"
          required
          tooltip="Select the primary material for the component."
        >
          <option value="" disabled>Select material</option>
          {MATERIALS.map((material: Material) => (
            <option key={material.id} value={material.id}>{material.name}</option>
          ))}
        </InputField>
        {selectedMaterial && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md text-xs text-gray-600 border border-gray-200">
            <p><strong>Density:</strong> {selectedMaterial.density} kg/m³</p>
            <p><strong>Yield Strength:</strong> {selectedMaterial.yieldStrength} MPa</p>
            <p><strong>Elastic Modulus:</strong> {selectedMaterial.elasticModulus} GPa</p>
          </div>
        )}

        <InputField
          label="Primary Load (N)"
          id="load"
          type="number"
          value={designParams.load}
          onChange={handleInputChange}
          name="load"
          min={0}
          required
          tooltip="The primary static load the component must withstand, in Newtons."
        />
        
        <InputField
          label="Safety Factor"
          id="safetyFactor"
          type="number"
          value={designParams.safetyFactor}
          onChange={handleInputChange}
          name="safetyFactor"
          min={1}
          step={0.1}
          required
          tooltip={`Recommended: ${DEFAULT_SAFETY_FACTOR} or higher. This factor multiplies the applied load to ensure the design can handle unexpected stresses.`}
        />

        <div className="mt-8 text-center">
          <button 
            type="submit" 
            className="w-full bg-brandPrimary hover:bg-yellow-500 text-brandTextOnPrimary font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
            aria-label="Generate optimized design"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brandTextOnPrimary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : "Generate Optimized Design"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DesignInputForm;
