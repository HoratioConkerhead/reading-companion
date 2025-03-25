import React, { useState, useEffect } from 'react';

const AppTour = ({ isOpen, onClose, onTabChange, currentTab }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define the tour steps
  const tourSteps = [
    {
      title: "Welcome to the Stitched Up Companion",
      content: "This interactive app helps you explore the world of Matt Parry's novel 'Stitched Up'. Let's take a quick tour to discover its features.",
      placement: "center",
    },
    {
      title: "Characters Tab",
      content: "Explore detailed profiles of all characters in the novel, including their backgrounds, traits, and relationships.",
      placement: "bottom",
      tab: 0,
    },
    {
      title: "Relationship Web",
      content: "Visualize the complex connections between characters with this interactive network diagram.",
      placement: "bottom",
      tab: 1,
    },
    {
      title: "Timeline",
      content: "Follow the chronological events of the story from beginning to end.",
      placement: "bottom",
      tab: 2,
    },
    {
      title: "Locations",
      content: "Discover key locations where the story takes place and their significance.",
      placement: "bottom",
      tab: 3,
    },
    {
      title: "Interactive Map",
      content: "Explore the geographic setting of the novel with this detailed map showing locations, character movements, and event sites.",
      placement: "bottom",
      tab: 4,
    },
    {
      title: "Plot Navigator",
      content: "Understand the structure of the plot and explore key themes and mystery elements.",
      placement: "bottom",
      tab: 5,
    },
    {
      title: "Objects Gallery",
      content: "Browse important items and artifacts that play a role in the story.",
      placement: "bottom",
      tab: 6,
    },
    {
      title: "Spy Encyclopedia",
      content: "Learn about spy techniques and tradecraft mentioned in the novel.",
      placement: "bottom",
      tab: 7,
    },
    {
      title: "Current Selections Panel",
      content: "This panel shows your currently selected items for quick cross-reference. Click any item to jump to its detailed view.",
      placement: "top",
    },
    {
      title: "Tour Complete",
      content: "You're now ready to explore the world of 'Stitched Up'! Click any tab to begin your adventure or take the tour again anytime from the button in the header.",
      placement: "center",
    },
  ];

  // Effect to change tab when navigating through steps
  useEffect(() => {
    if (!isOpen) return;
    
    const currentStepData = tourSteps[currentStep];
    if (currentStepData && currentStepData.tab !== undefined && currentStepData.tab !== currentTab) {
      onTabChange(currentStepData.tab);
    }
  }, [currentStep, isOpen, onTabChange, currentTab, tourSteps]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
    setCurrentStep(0);
  };

  const currentStepData = tourSteps[currentStep];
  
  // Calculate position class based on placement
  const getPositionClass = () => {
    if (currentStepData.placement === 'center') {
      return 'fixed inset-0 flex items-center justify-center z-50';
    } else if (currentStepData.placement === 'bottom') {
      return 'fixed top-32 left-1/2 transform -translate-x-1/2 z-50';
    } else if (currentStepData.placement === 'top') {
      return 'fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50';
    }
    return 'fixed inset-0 flex items-center justify-center z-50';
  };

  return (
    <div className="tour-overlay">
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      
      {/* Tour step modal */}
      <div className={getPositionClass()}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-bold mb-2">{currentStepData.title}</h2>
          <p className="mb-6">{currentStepData.content}</p>
          
          {/* Progress indicator */}
          <div className="mb-4 flex justify-center">
            {tourSteps.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-8 mx-1 rounded-full ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              {currentStep > 0 && (
                <button 
                  className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
              )}
            </div>
            
            <button 
              className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
              onClick={handleSkip}
            >
              Skip Tour
            </button>
            
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleNextStep}
            >
              {currentStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppTour;
