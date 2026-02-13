import React from 'react';

const SidePanel = ({
  isFullPage,
  springForce,
  setSpringForce,
  repulsionForce,
  setRepulsionForce,
  showDescription,
  setShowDescription,
  showRelationship,
  setShowRelationship,
  showNumber,
  setShowNumber,
  showImportance,
  setShowImportance,
  scaleSizeByImportance,
  setScaleSizeByImportance,
  groupColors,
  getGroupColor,
  relationshipLegendItems
}) => (
  <div className="w-48 flex-shrink-0">
    <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 p-4 h-full" style={{ height: isFullPage ? 'calc(100vh - 95px)' : '840px' }}>

      {/* Physics Controls */}
      <div className="mb-6">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Spring Force</label>
              <span className="text-xs text-gray-500">{springForce}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="1"
              value={springForce}
              onChange={(e) => setSpringForce(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Repulsion Force</label>
              <span className="text-xs text-gray-500">{repulsionForce}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step="100"
              value={repulsionForce}
              onChange={(e) => setRepulsionForce(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* View Options */}
      <div className="mb-6">
        <div>
          <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">View Options</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" checked={showDescription} onChange={(e) => setShowDescription(e.target.checked)} className="mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Description</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={showRelationship} onChange={(e) => setShowRelationship(e.target.checked)} className="mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Relationship</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={showNumber} onChange={(e) => { setShowNumber(e.target.checked); if (e.target.checked) setShowImportance(false); }} className="mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Relationship Count</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={showImportance} onChange={(e) => { setShowImportance(e.target.checked); if (e.target.checked) setShowNumber(false); }} className="mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Importance Rating</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={scaleSizeByImportance} onChange={(e) => setScaleSizeByImportance(e.target.checked)} className="mr-2" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Size is Importance</span>
            </label>
          </div>
        </div>
      </div>

      {/* Character Groups Key */}
      <div className="mb-6">
        <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">Character Groups</label>
        <div className="space-y-2">
          {Object.keys(groupColors).map(group => (
            <div key={group} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: getGroupColor(group) }}></div>
              <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{group}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relationship Types Key */}
      {relationshipLegendItems.length > 0 && (
        <div className="mb-6">
          <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">Relationship Types</label>
          <div className="space-y-2">
            {relationshipLegendItems.map(item => (
              <div key={item.label} className="flex items-center">
                <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  </div>
);

export default SidePanel;
