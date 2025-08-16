// Position data for locations, events, characters, and objects in Stitched Up
// Coordinates are approximate and based on real-world locations mentioned in the novel

export const locationPositions = {
  // Key locations from the novel
  'bucklebury': { lat: 51.4431, lon: -1.2075, name: 'Bucklebury, Berkshire' },
  'denleigh_manor': { lat: 51.4431, lon: -1.2075, name: 'Denleigh Manor (near Bucklebury)' },
  'london': { lat: 51.5074, lon: -0.1278, name: 'London' },
  'berlin': { lat: 52.5200, lon: 13.4050, name: 'Berlin, Germany' },
  'hotel_adlon': { lat: 52.5163, lon: 13.3779, name: 'Hotel Adlon, Berlin' },
  'scilly_isles': { lat: 49.9167, lon: -6.3167, name: 'Isles of Scilly' },
  'penzance': { lat: 50.1188, lon: -5.5376, name: 'Penzance, Cornwall' },
  'churn_ranges': { lat: 51.4431, lon: -1.2075, name: 'Churn Rifle Ranges (near Bucklebury)' },
  'box_tunnel': { lat: 51.4167, lon: -2.2500, name: 'Box Tunnel, Wiltshire' },
  'aldworth': { lat: 51.4431, lon: -1.2075, name: 'Aldworth (near Bucklebury)' }
};

export const eventPositions = {
  // Events with location references
  'german_infiltration_scilly': { locationId: 'scilly_isles', name: 'German Infiltration via Scilly Isles' },
  'cynthia_arrives_denleigh': { locationId: 'denleigh_manor', name: 'Cynthia Arrives at Denleigh Manor' },
  'berlin_trip': { locationId: 'berlin', name: 'Berlin Trip' },
  'hotel_adlon_meeting': { locationId: 'hotel_adlon', name: 'Hotel Adlon Meeting' },
  'first_party_bucklebury': { locationId: 'bucklebury', name: 'First Party at Bucklebury' },
  'second_party_mosley': { locationId: 'bucklebury', name: 'Second Party with Mosley' },
  'rifle_discovery': { locationId: 'churn_ranges', name: 'Rifle Discovery at Churn Ranges' },
  'train_journey': { locationId: 'box_tunnel', name: 'Train Journey through Box Tunnel' },
  'edwards_murder': { locationId: 'london', name: 'Edwards Murder in London' }
};

export const characterPositions = {
  // Characters with their primary locations
  'cynthia_childreth': { locationId: 'bucklebury', name: 'Lady Cynthia Childreth' },
  'richard_childreth': { locationId: 'bucklebury', name: 'Richard Childreth' },
  'bill_lawrie': { locationId: 'london', name: 'Wing Commander William Lawrie' },
  'hannah_park': { locationId: 'london', name: 'Hannah Park' },
  'jane_maclean': { locationId: 'london', name: 'Jane Maclean' },
  'peter_snowden': { locationId: 'aldworth', name: 'Colonel Peter Snowden' },
  'marjorie_snowden': { locationId: 'aldworth', name: 'Marjorie Snowden' },
  'bob_harrington': { locationId: 'aldworth', name: 'Bob Harrington' },
  'louise_harrington': { locationId: 'aldworth', name: 'Louise Harrington' },
  'sir_john_davies': { locationId: 'aldworth', name: 'Sir John Davies' },
  'lady_megan_davies': { locationId: 'aldworth', name: 'Lady Megan Davies' },
  'gerda_stammer': { locationId: 'berlin', name: 'Gerda Stammer' },
  'franz_stammer': { locationId: 'berlin', name: 'Franz Stammer' },
  'helmut_schnitter': { locationId: 'scilly_isles', name: 'Helmut Schnitter' },
  'george_bennet': { locationId: 'london', name: 'Chief Inspector George Bennet' }
};

export const objectPositions = {
  // Objects with their locations
  'german_rifle_fg42': { locationId: 'churn_ranges', name: 'German Rifle (FG42)' },
  'suitcase_radio': { locationId: 'bucklebury', name: 'Suitcase with Radio' },
  'cheque_book_edwards': { locationId: 'london', name: 'T.G. Edwards Cheque Book' }
};

export const mapBoundaries = {
  // Map view boundaries
  uk: [
    [49.5, -8.0], // Southwest
    [59.0, 2.0]   // Northeast
  ],
  europe: [
    [47.0, -8.0], // Southwest
    [59.0, 15.0]  // Northeast
  ]
};
