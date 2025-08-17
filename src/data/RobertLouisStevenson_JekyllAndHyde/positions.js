export const locationPositions = {
  'street_door': { lat: 51.5145, lon: -0.1270, label: 'Mysterious Door (Fictional Alley)', type: 'uk' },
  'jekyll_house': { lat: 51.5156, lon: -0.1461, label: 'Dr. Jekyll’s House (Fictional Square)', type: 'uk' },
  'jekyll_laboratory': { lat: 51.5153, lon: -0.1455, label: 'Jekyll’s Laboratory (Rear of House)', type: 'uk' },
  'hyde_soho_house': { lat: 51.5136, lon: -0.1340, label: 'Hyde’s Soho Rooms', type: 'uk' },
  'lanyon_house': { lat: 51.5167, lon: -0.1447, label: 'Dr. Lanyon’s House (Cavendish Sq.)', type: 'uk' },
  'carew_murder_site': { lat: 51.5110, lon: -0.1200, label: 'Carew Murder Site (Street)', type: 'uk' },
  'utterson_chambers': { lat: 51.5117, lon: -0.1130, label: 'Utterson’s Chambers (Temple)', type: 'uk' },
  'jekyll_courtyard': { lat: 51.5150, lon: -0.1458, label: 'Jekyll’s Courtyard', type: 'uk' }
};

export const eventPositions = {
  'carew_murder': { locationId: 'carew_murder_site' },
  'soho_search': { locationId: 'hyde_soho_house' },
  'story_of_the_door': { locationId: 'street_door' },
  'child_trampling': { locationId: 'street_door' },
  'search_for_mr_hyde': { locationId: 'street_door' },
  'jekyll_dinner': { locationId: 'jekyll_house' },
  'incident_of_the_letter': { locationId: 'utterson_chambers' },
  'remarkable_incident_of_dr_lanyon': { locationId: 'lanyon_house' },
  'incident_at_the_window': { locationId: 'jekyll_courtyard' },
  'the_last_night': { locationId: 'jekyll_laboratory' },
  'dr_lanyon_narrative': { locationId: 'lanyon_house' },
  'jekyll_full_statement': { locationId: 'jekyll_laboratory' }
};

export const characterPositions = {
  'gabriel_utterson': { locationId: 'utterson_chambers' },
  'henry_jekyll': { locationId: 'jekyll_house' },
  'edward_hyde': { locationId: 'hyde_soho_house' },
  'hastie_lanyon': { locationId: 'lanyon_house' },
  'poole': { locationId: 'jekyll_house' },
  'mr_enfield': { locationId: 'street_door' },
  'inspector_newcomen': { locationId: 'carew_murder_site' }
};

export const objectPositions = {
  'jekyll_will': { locationId: 'utterson_chambers' },
  'broken_cane': { locationId: 'carew_murder_site' },
  'transformative_potion': { locationId: 'jekyll_laboratory' },
  'sealed_packet': { locationId: 'utterson_chambers' },
  'handwriting_letter': { locationId: 'utterson_chambers' },
  'coutts_cheque': { locationId: 'street_door' }
};

export const mapBoundaries = {
  'uk': { bounds: [[49.0, -8.0], [61.0, 2.0]] }
};


