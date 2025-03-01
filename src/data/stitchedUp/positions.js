// Geographic positions for locations in "Stitched Up"
// Approximate coordinates (latitude, longitude) for map positioning

export const locationPositions = {
    // UK Locations
    'cynthia_house': { lat: 51.4, lon: -1.25, label: "Cynthia's House", type: "uk" },
    'denleigh_manor': { lat: 51.35, lon: -1.9, label: "Denleigh Manor", type: "uk" },
    'imperial_aggregates': { lat: 51.49, lon: -0.18, label: "Imperial Aggregates", type: "uk" },
    'thames_house': { lat: 51.495, lon: -0.125, label: "Thames House", type: "uk" },
    'aldworth': { lat: 51.51, lon: -1.21, label: "Aldworth", type: "uk" },
    'ashampstead': { lat: 51.46, lon: -1.19, label: "Ashampstead", type: "uk" },
    'yattendon': { lat: 51.45, lon: -1.18, label: "Yattendon", type: "uk" },
    'scilly_isles': { lat: 49.93, lon: -6.32, label: "Scilly Isles", type: "uk" },
    'churn_ranges': { lat: 51.57, lon: -1.27, label: "Churn Rifle Ranges", type: "uk" },
    'crawford_place': { lat: 51.52, lon: -0.16, label: "Crawford Place Flat", type: "uk" },
    'bucklebury_camp': { lat: 51.4, lon: -1.26, label: "American Camp", type: "uk" },
    'felicity_cottage': { lat: 51.52, lon: -1.215, label: "Felicity's Cottage", type: "uk" },
    'national_gallery': { lat: 51.508, lon: -0.128, label: "National Gallery", type: "uk" },
    'blenheim_palace': { lat: 51.84, lon: -1.36, label: "Blenheim Palace", type: "uk" },
    'the_ritz': { lat: 51.507, lon: -0.144, label: "The Ritz Hotel", type: "uk" },
    'long_boat_inn': { lat: 50.12, lon: -5.54, label: "Long Boat Inn", type: "uk" },
    'queens_head_pub': { lat: 51.42, lon: -1.24, label: "Queen's Head Pub", type: "uk" },
    'reading_hotel': { lat: 51.458, lon: -0.97, label: "Great Western Hotel", type: "uk" },
    'aldworth_village': { lat: 51.51, lon: -1.21, label: "Aldworth Village", type: "uk" },
    'croydon_airport': { lat: 51.35, lon: -0.12, label: "Croydon Airport", type: "uk" },
    'fishguard_harbor': { lat: 52.01, lon: -4.98, label: "Fishguard Harbor", type: "uk" },
    'goring_station': { lat: 51.52, lon: -1.14, label: "Goring & Streatley Station", type: "uk" },
    'box_tunnel': { lat: 51.42, lon: -2.22, label: "Box Tunnel", type: "uk" },
    'admiral_duncan': { lat: 51.514, lon: -0.134, label: "Admiral Duncan Pub", type: "uk" },
    'martins_bank': { lat: 51.513, lon: -0.087, label: "Martins Bank", type: "uk" },
    
    // German Locations
    'hotel_adlon': { lat: 52.516, lon: 13.38, label: "Hotel Adlon", type: "german" },
    'tempelhof_airport': { lat: 52.47, lon: 13.4, label: "Tempelhof Airport", type: "german" },
    
    // Irish Locations
    'rosslare': { lat: 52.25, lon: -6.34, label: "Rosslare Harbor", type: "irish" }
  };
  
  // Event positions (may be at existing location or unique position)
  export const eventPositions = {
    'german_infiltration': { locationId: 'scilly_isles' },
    'cynthia_recruitment': { locationId: 'denleigh_manor' },
    'berlin_trip': { locationId: 'hotel_adlon' },
    'hitler_sighting': { locationId: 'hotel_adlon' },
    'first_party': { locationId: 'cynthia_house' },
    'second_party': { locationId: 'cynthia_house' },
    'edwards_arrival': { locationId: 'scilly_isles' },
    'train_journey': { 
      path: [
        { lat: 50.12, lon: -5.54, label: "Penzance" },
        { lat: 51.42, lon: -2.22, label: "Box Tunnel" },
        { lat: 51.52, lon: -1.14, label: "Goring" },
        { lat: 51.458, lon: -0.97, label: "Reading" },
        { lat: 51.52, lon: -0.16, label: "London" }
      ]
    },
    'edwards_murder': { locationId: 'crawford_place' },
    'rifle_testing': { locationId: 'churn_ranges' },
    'davies_ireland_escape': { 
      path: [
        { lat: 51.45, lon: -1.18, label: "Yattendon" },
        { lat: 52.01, lon: -4.98, label: "Fishguard" },
        { lat: 52.25, lon: -6.34, label: "Rosslare" }
      ]
    },
    'house_occupation': { locationId: 'cynthia_house' },
    'assassination_attempt': { locationId: 'cynthia_house' },
    'louise_death': { locationId: 'aldworth_village' },
    'tradecraft_training': { locationId: 'cynthia_house' },
    'secure_line_installation': { locationId: 'cynthia_house' },
    'edwards_discovery': { locationId: 'crawford_place' },
    'intelligence_meeting': { locationId: 'national_gallery' },
    'intelligence_meeting_blenheim': { locationId: 'blenheim_palace' },
    'ritz_meeting': { locationId: 'the_ritz' },
    'cottage_surveillance': { locationId: 'felicity_cottage' },
    'final_planning': { locationId: 'queens_head_pub' },
    'cynthia_diversion_call': { locationId: 'cynthia_house' },
    'summerhouse_hiding': { locationId: 'cynthia_house' },
    'berlin_departure': { locationId: 'croydon_airport' },
    'suitcase_opening': { locationId: 'cynthia_house' },
    'bank_account_investigation': { locationId: 'martins_bank' },
    'thames_house_meeting': { locationId: 'thames_house' },
    'shell_casing_identification': { locationId: 'thames_house' }
  };
  
  // Character last known positions - useful for filtering
  export const characterPositions = {
    'cynthia_childreth': { locationId: 'cynthia_house' },
    'richard_childreth': { locationId: 'cynthia_house' },
    'bill_laurie': { locationId: 'thames_house' },
    'hannah_park': { locationId: 'thames_house' },
    'jane_maclean': { locationId: 'thames_house' },
    'edwin': { locationId: 'cynthia_house' },
    'george_bennet': { locationId: 'thames_house' },
    'peter_snowden': { locationId: 'ashampstead' },
    'marjorie_snowden': { locationId: 'ashampstead' },
    'bob_harrington': { locationId: 'aldworth' },
    'louise_harrington': { locationId: 'aldworth' },
    'john_davies': { locationId: 'yattendon' },
    'megan_davies': { locationId: 'yattendon' },
    'mary': { locationId: 'cynthia_house' },
    'alison': { locationId: 'cynthia_house' },
    'felicity': { locationId: 'felicity_cottage' },
    'gladys': { locationId: 'aldworth_village' },
    'montgomery': { locationId: 'bucklebury_camp' },
    'edwards': { locationId: 'crawford_place' },
    'gerda_stammer': { locationId: 'hotel_adlon' },
    'franz_stammer': { locationId: 'hotel_adlon' },
    'lena_weber': { locationId: 'hotel_adlon' },
    'helmut_schnitter': { locationId: 'scilly_isles' }
  };
  
  // Map boundaries for the main view
  export const mapBoundaries = {
    uk: {
      minLat: 49.5,
      maxLat: 53.0,
      minLon: -8.0,
      maxLon: 2.0
    },
    europe: {
      minLat: 47.0,
      maxLat: 54.0,
      minLon: -8.0,
      maxLon: 15.0
    }
  };
  
  // Objects positions (typically at locations where they were used or found)
  export const objectPositions = {
    'german_rifle': { locationId: 'cynthia_house' },
    'mysterious_suitcase': { locationId: 'cynthia_house' },
    'cheque_book': { locationId: 'fishguard_harbor' },
    'secure_phone_line': { locationId: 'cynthia_house' },
    'shell_casing': { locationId: 'churn_ranges' },
    'montys_beret': { locationId: 'bucklebury_camp' },
    'blockade_car': { locationId: 'cynthia_house' },
    'auburn_wig': { locationId: 'cynthia_house' }
  };