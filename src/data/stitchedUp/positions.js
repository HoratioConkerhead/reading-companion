// Geographic positions for locations in "Stitched Up" optimized for Leaflet
// Using actual coordinates (latitude, longitude) for map positioning

export const locationPositions = {
    // UK Locations
    'cynthia_house': { lat: 51.4286, lon: -1.2507, label: "Cynthia's House", type: "uk" },
    'denleigh_manor': { lat: 51.3564, lon: -1.9103, label: "Denleigh Manor", type: "uk" },
    'imperial_aggregates': { lat: 51.4971, lon: -0.1863, label: "Imperial Aggregates", type: "uk" },
    'thames_house': { lat: 51.4953, lon: -0.1251, label: "Thames House", type: "uk" },
    'aldworth': { lat: 51.5103, lon: -1.2100, label: "Aldworth", type: "uk" },
    'ashampstead': { lat: 51.4628, lon: -1.1942, label: "Ashampstead", type: "uk" },
    'yattendon': { lat: 51.4530, lon: -1.1890, label: "Yattendon", type: "uk" },
    'scilly_isles': { lat: 49.9359, lon: -6.3228, label: "Scilly Isles", type: "uk" },
    'churn_ranges': { lat: 51.5731, lon: -1.2748, label: "Churn Rifle Ranges", type: "uk" },
    'crawford_place': { lat: 51.5201, lon: -0.1653, label: "Crawford Place Flat", type: "uk" },
    'bucklebury_camp': { lat: 51.4201, lon: -1.2651, label: "American Camp", type: "uk" },
    'felicity_cottage': { lat: 51.5153, lon: -1.2150, label: "Felicity's Cottage", type: "uk" },
    'national_gallery': { lat: 51.5085, lon: -0.1281, label: "National Gallery", type: "uk" },
    'blenheim_palace': { lat: 51.8417, lon: -1.3614, label: "Blenheim Palace", type: "uk" },
    'the_ritz': { lat: 51.5071, lon: -0.1444, label: "The Ritz Hotel", type: "uk" },
    'long_boat_inn': { lat: 50.1210, lon: -5.5409, label: "Long Boat Inn", type: "uk" },
    'queens_head_pub': { lat: 51.4242, lon: -1.2401, label: "Queen's Head Pub", type: "uk" },
    'reading_hotel': { lat: 51.4582, lon: -0.9731, label: "Great Western Hotel", type: "uk" },
    'aldworth_village': { lat: 51.5103, lon: -1.2100, label: "Aldworth Village", type: "uk" },
    'croydon_airport': { lat: 51.3570, lon: -0.1208, label: "Croydon Airport", type: "uk" },
    'fishguard_harbor': { lat: 52.0102, lon: -4.9850, label: "Fishguard Harbor", type: "uk" },
    'goring_station': { lat: 51.5210, lon: -1.1401, label: "Goring & Streatley Station", type: "uk" },
    'box_tunnel': { lat: 51.4184, lon: -2.2156, label: "Box Tunnel", type: "uk" },
    'admiral_duncan': { lat: 51.5140, lon: -0.1340, label: "Admiral Duncan Pub", type: "uk" },
    'martins_bank': { lat: 51.5130, lon: -0.0873, label: "Martins Bank", type: "uk" },
    'penzance': { lat: 50.1186, lon: -5.5371, label: "Penzance", type: "uk" },
    'london': { lat: 51.5074, lon: -0.1278, label: "London", type: "uk" },
    
    // German Locations
    'hotel_adlon': { lat: 52.5163, lon: 13.3797, label: "Hotel Adlon", type: "german" },
    'tempelhof_airport': { lat: 52.4730, lon: 13.4016, label: "Tempelhof Airport", type: "german" },
    
    // Irish Locations
    'rosslare': { lat: 52.2507, lon: -6.3396, label: "Rosslare Harbor", type: "irish" }
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
        { lat: 50.1210, lon: -5.5409, label: "Penzance" },
        { lat: 51.4184, lon: -2.2156, label: "Box Tunnel" },
        { lat: 51.5210, lon: -1.1401, label: "Goring" },
        { lat: 51.4582, lon: -0.9731, label: "Reading" },
        { lat: 51.5014, lon: -0.1419, label: "London" }
      ]
    },
    'edwards_murder': { locationId: 'crawford_place' },
    'rifle_testing': { locationId: 'churn_ranges' },
    'davies_ireland_escape': { 
      path: [
        { lat: 51.4530, lon: -1.1890, label: "Yattendon" },
        { lat: 52.0102, lon: -4.9850, label: "Fishguard" },
        { lat: 52.2507, lon: -6.3396, label: "Rosslare" }
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
    'shell_casing_identification': { locationId: 'thames_house' },
    'edwards_penzance_stay': { locationId: 'long_boat_inn' },
    'davies_reading_stay': { locationId: 'reading_hotel' },
    'investigation_meeting': { locationId: 'admiral_duncan' },
    'montgomery_visit': { locationId: 'bucklebury_camp' }
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
    'helmut_schnitter': { locationId: 'scilly_isles' },
    'jim': { locationId: 'thames_house' },
    'bert': { locationId: 'ashampstead' },
    'mike': { locationId: 'crawford_place' },
    'keith': { locationId: 'yattendon' },
    'amy_wyndholme': { locationId: 'denleigh_manor' },
    'horace_wyndholme': { locationId: 'denleigh_manor' },
    'patrick': { locationId: 'denleigh_manor' },
    'sheila': { locationId: 'denleigh_manor' },
    'oswald_mosley': { locationId: 'london' },
    'montys_adc': { locationId: 'bucklebury_camp' },
    'jack': { locationId: 'aldworth_village' },
    'paul_holness': { locationId: 'london' },
    'don': { locationId: 'london' },
    'inspector_williams': { locationId: 'fishguard_harbor' },
    'jacobs': { locationId: 'thames_house' },
    'chief_inspector': { locationId: 'london' }
  };
  
  // Map boundaries for the main view
  export const mapBoundaries = {
    uk: {
      minLat: 49.5,
      maxLat: 59.0,
      minLon: -8.0,
      maxLon: 2.0
    },
    europe: {
      minLat: 47.0,
      maxLat: 59.0,
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
    'auburn_wig': { locationId: 'cynthia_house' },
    'edwards_cheques': { locationId: 'fishguard_harbor' },
    'fg42_rifle': { locationId: 'churn_ranges' },
    'secure_briefcase': { locationId: 'thames_house' },
    'berts_painting': { locationId: 'ashampstead' }
  };