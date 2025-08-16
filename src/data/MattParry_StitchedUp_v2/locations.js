export const locations = [
  {
    id: 'scilly_isles',
    name: 'Isles of Scilly',
    type: 'Island Group',
    description: 'Group of islands 28 miles south-west of Land\'s End, Cornwall. The Achilles heel of UK coastal defenses during WWII, with minimal naval presence and coastal fortifications.',
    country: 'United Kingdom',
    region: 'Cornwall',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Point of German infiltration due to poor coastal defenses and regular steamship service to mainland',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    features: [
      'Minimal naval presence',
      'Small army garrison',
      'Few flying boats',
      'Regular steamship service to Penzance',
      'Poor coastal fortifications',
      'Easily negotiable minefields'
    ]
  },
  {
    id: 'denleigh_manor',
    name: 'Denleigh Manor',
    type: 'Country House',
    description: 'Imposing Georgian country house in Wiltshire, owned by Lady Amelia Wyndholme and her husband Horace. Setting for the weekend party where Cynthia is recruited.',
    country: 'United Kingdom',
    region: 'Wiltshire',
    coordinates: { lat: 51.3492, lng: -1.9921 },
    significance: 'Location of Cynthia\'s recruitment for British intelligence work',
    events: ['cynthia_arrives_denleigh', 'weekend_party_introductions', 'dinner_politics', 'cynthia_recruited'],
    introducedInChapter: 'chapter_01',
    features: [
      'Georgian architecture',
      'Extensive gardens and grounds',
      'Trout lake',
      'Tennis courts',
      'Croquet lawn',
      'Stables',
      'Drawing room',
      'Library',
      'Dining room',
      'Multiple guest bedrooms'
    ]
  },
  {
    id: 'cynthia_house_bucklebury',
    name: 'Cynthia\'s House, Bucklebury',
    type: 'Private Residence',
    description: 'Cynthia and Richard\'s expansive house and gardens in Bucklebury, Berkshire. Used as a venue for Nazi sympathizer parties and later taken over by the Harringtons.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.4333, lng: -1.2000 },
    significance: 'Base for intelligence operations and Nazi sympathizer gatherings',
    events: ['first_party_bucklebury', 'second_party_mosley', 'suitcase_delivery', 'harringtons_takeover'],
    introducedInChapter: 'chapter_01',
    features: [
      'Expansive gardens',
      'Large house',
      'Party venue',
      'Intelligence operations base',
      'Later occupied by Harringtons'
    ]
  },
  {
    id: 'hotel_adlon_berlin',
    name: 'Hotel Adlon, Berlin',
    type: 'Hotel',
    description: 'Luxury hotel in Berlin where Richard and Cynthia stay during their trip to Germany. Meeting place with German Nazi sympathizers.',
    country: 'Germany',
    region: 'Berlin',
    coordinates: { lat: 52.5167, lng: 13.3833 },
    significance: 'Location of meetings with German Nazi sympathizers and establishment of operational framework',
    events: ['berlin_trip', 'hotel_adlon_meeting', 'nazi_sympathizers_berlin'],
    introducedInChapter: 'chapter_04',
    features: [
      'Luxury accommodation',
      'Meeting rooms',
      'Reception areas',
      'High-class service',
      'Location near government buildings'
    ]
  },
  {
    id: 'berlin',
    name: 'Berlin',
    type: 'City',
    description: 'Capital of Germany and center of Nazi power during the 1930s. Location of meetings with Nazi sympathizers and establishment of connections.',
    country: 'Germany',
    region: 'Berlin',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    significance: 'Center of Nazi operations and source of German sympathizer network',
    events: ['berlin_trip', 'hotel_adlon_meeting', 'nazi_sympathizers_berlin'],
    introducedInChapter: 'chapter_04',
    features: [
      'Capital city',
      'Government buildings',
      'Nazi headquarters',
      'Reichsbank',
      'Cultural centers',
      'Transportation hub'
    ]
  },
  {
    id: 'churn_rifle_ranges',
    name: 'Churn Rifle Ranges',
    type: 'Military Training Facility',
    description: 'Rifle ranges where the conspirators practiced shooting, preparing for their assassination attempt. Poor security allowed unauthorized practice.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.4500, lng: -1.1500 },
    significance: 'Location where conspirators prepared for assassination attempt',
    events: ['rifle_discovery', 'churn_ranges_practice'],
    introducedInChapter: 'chapter_10',
    features: [
      'Rifle ranges',
      'Target practice facilities',
      'Poor security',
      'Unauthorized access possible',
      'Training grounds'
    ]
  },
  {
    id: 'crawford_place_london',
    name: 'Crawford Place, London',
    type: 'Residential Street',
    description: 'Location of T.G. Edwards\' London flat where he was murdered by a woman disguised as a postman.',
    country: 'United Kingdom',
    region: 'London',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    significance: 'Scene of Edwards\' murder',
    events: ['edwards_murder', 'postman_disguise'],
    introducedInChapter: 'chapter_13',
    features: [
      'Residential buildings',
      'London flat',
      'Urban location',
      'Accessible by postman'
    ]
  },
  {
    id: 'box_tunnel',
    name: 'Box Tunnel',
    type: 'Railway Tunnel',
    description: 'Railway tunnel on the main line where cases were switched during the train journey as part of the network\'s operational logistics.',
    country: 'United Kingdom',
    region: 'Wiltshire',
    coordinates: { lat: 51.4167, lng: -2.2500 },
    significance: 'Location of case switching operation during train journey',
    events: ['train_journey', 'case_switching', 'box_tunnel_incident'],
    introducedInChapter: 'chapter_12',
    features: [
      'Railway tunnel',
      'Main line location',
      'Dark environment',
      'Operational advantage',
      'Surveillance difficulty'
    ]
  },
  {
    id: 'american_transport_division_camp',
    name: 'American Transport Division Camp',
    type: 'Military Camp',
    description: 'Military camp where Montgomery was scheduled to conduct an inspection, becoming the target of the assassination attempt.',
    country: 'United Kingdom',
    region: 'Aylesbury',
    coordinates: { lat: 51.8167, lng: -0.8167 },
    significance: 'Target location for assassination attempt on Montgomery',
    events: ['assassination_attempt', 'montgomery_target', 'louise_intervention'],
    introducedInChapter: 'chapter_19',
    features: [
      'Military facilities',
      'Inspection areas',
      'March past grounds',
      'Officers mess',
      'Security perimeter'
    ]
  },
  {
    id: 'aldworth',
    name: 'Aldworth',
    type: 'Village',
    description: 'Village where the Harringtons live, monitored by British intelligence surveillance teams.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.5000, lng: -1.2000 },
    significance: 'Location of Harrington surveillance operation',
    events: ['aldworth_surveillance', 'harrington_monitoring'],
    introducedInChapter: 'chapter_32',
    features: [
      'Rural village',
      'Harrington residence',
      'Surveillance observation points',
      'Local amenities'
    ]
  },
  {
    id: 'ashampstead',
    name: 'Ashampstead',
    type: 'Village',
    description: 'Village where the Snowdens live, monitored by British intelligence surveillance teams.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.4833, lng: -1.1833 },
    significance: 'Location of Snowden surveillance operation',
    events: ['ashampstead_watch', 'snowden_monitoring'],
    introducedInChapter: 'chapter_33',
    features: [
      'Rural village',
      'Snowden residence',
      'Surveillance observation points',
      'Local amenities'
    ]
  },
  {
    id: 'yattendon',
    name: 'Yattendon',
    type: 'Village',
    description: 'Village where the Davies live, monitored by British intelligence surveillance teams.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.4667, lng: -1.2000 },
    significance: 'Location of Davies surveillance operation',
    events: ['yattendon_observation', 'davies_monitoring'],
    introducedInChapter: 'chapter_34',
    features: [
      'Rural village',
      'Davies residence',
      'Surveillance observation points',
      'Local amenities'
    ]
  },
  {
    id: 'louise_cottage',
    name: 'Louise\'s Cottage',
    type: 'Private Residence',
    description: 'Louise Harrington\'s cottage where she was killed in a suspicious gas explosion, likely orchestrated by remaining conspirators.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.4500, lng: -1.2000 },
    significance: 'Scene of Louise\'s murder',
    events: ['louise_gas_explosion', 'suspicious_death'],
    introducedInChapter: 'chapter_23',
    features: [
      'Cottage residence',
      'Gas supply',
      'Neighboring properties',
      'Rural location'
    ]
  },
  {
    id: 'atlantic_hotel',
    name: 'Atlantic Hotel',
    type: 'Hotel',
    description: 'Hotel in the Isles of Scilly where Chief Inspector Bennet conducted surveillance operations, watching for suspicious activity.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Base for Bennet\'s surveillance operation in Scilly Isles',
    events: ['atlantic_hotel_surveillance', 'suspicious_activity_watch'],
    introducedInChapter: 'chapter_27',
    features: [
      'Hotel accommodation',
      'Observation windows',
      'Restaurant facilities',
      'Strategic location',
      'Surveillance base'
    ]
  },
  {
    id: 'hugh_town',
    name: 'Hugh Town',
    type: 'Town',
    description: 'Main town on St Mary\'s, Isles of Scilly, where the steamship company offices are located and tickets to Penzance can be purchased.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Main settlement and transport hub in Scilly Isles',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    features: [
      'Steamship company offices',
      'Main settlement',
      'Transport hub',
      'Local amenities',
      'Port facilities'
    ]
  },
  {
    id: 'penzance',
    name: 'Penzance',
    type: 'Town',
    description: 'Mainland port town in Cornwall, destination of the steamship service from Scilly Isles and entry point for German infiltration.',
    country: 'United Kingdom',
    region: 'Cornwall',
    coordinates: { lat: 50.1188, lng: -5.5376 },
    significance: 'Mainland entry point for German agents from Scilly Isles',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    features: [
      'Port facilities',
      'Steamship terminal',
      'Transport connections',
      'Coastal location',
      'Entry point to mainland'
    ]
  },
  {
    id: 'bucklebury',
    name: 'Bucklebury',
    type: 'Village',
    description: 'Village in Berkshire where Cynthia and Richard\'s house is located, used as base for intelligence operations.',
    country: 'United Kingdom',
    region: 'Berkshire',
    coordinates: { lat: 51.4333, lng: -1.2000 },
    significance: 'Base location for Cynthia\'s intelligence operations',
    events: ['first_party_bucklebury', 'second_party_mosley', 'suitcase_delivery'],
    introducedInChapter: 'chapter_01',
    features: [
      'Rural village',
      'Cynthia\'s house',
      'Intelligence operations base',
      'Local community',
      'Transport connections'
    ]
  },
  {
    id: 'london',
    name: 'London',
    type: 'City',
    description: 'Capital of the United Kingdom and center of British intelligence operations, government, and financial institutions.',
    country: 'United Kingdom',
    region: 'London',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    significance: 'Center of British government, intelligence operations, and financial institutions',
    events: ['edwards_murder', 'cheque_book_discovery', 'edwards_account_revealed', 'investigation_begins'],
    introducedInChapter: 'chapter_11',
    features: [
      'Government buildings',
      'Intelligence headquarters',
      'Financial district',
      'Transport hub',
      'Cultural center',
      'Security services'
    ]
  },
  {
    id: 'ireland',
    name: 'Ireland',
    type: 'Country',
    description: 'Destination for fleeing conspirators (Davies and Snowdens) as the net closes in on their operations.',
    country: 'Ireland',
    region: 'Ireland',
    coordinates: { lat: 53.4129, lng: -8.2439 },
    significance: 'Escape destination for conspirators',
    events: ['flight_ireland'],
    introducedInChapter: 'chapter_18',
    features: [
      'Neutral during WWII',
      'Escape destination',
      'Refuge for conspirators',
      'Geographic proximity to UK',
      'Political asylum'
    ]
  },
  {
    id: 'martins_bank_london',
    name: 'Martins Bank, 68 Lombard Street',
    type: 'Bank',
    description: 'Bank in London where T.G. Edwards maintained an account used for Nazi operations. Located in the financial district.',
    country: 'United Kingdom',
    region: 'London',
    coordinates: { lat: 51.5136, lng: -0.0876 },
    significance: 'Financial institution used by Nazi network',
    events: ['cheque_book_discovery', 'edwards_account_revealed'],
    introducedInChapter: 'chapter_11',
    features: [
      'Financial institution',
      'Lombard Street location',
      'Account services',
      'Cheque facilities',
      'Professional banking'
    ]
  },
  {
    id: 'old_town_bay',
    name: 'Old Town Bay',
    type: 'Bay',
    description: 'Bay on St Mary\'s, Isles of Scilly, location of the church with the unusual grave of Naval Surgeon Abraham Leggatt.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Location of historical interest visited by Bennet during surveillance',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    features: [
      'Church location',
      'Unusual grave',
      'Coastal bay',
      'Historical interest',
      'Tourist attraction'
    ]
  },
  {
    id: 'porthcressa_beach',
    name: 'Porthcressa Beach',
    type: 'Beach',
    description: 'Beach on St Mary\'s, Isles of Scilly, accessible via path over Penninis Head, with wire emplacements on the sands.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Location visited by Bennet during his surveillance operation',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    features: [
      'Sandy beach',
      'Wire emplacements',
      'Coastal path access',
      'Penninis Head overlook',
      'Defensive positions'
    ]
  },
  {
    id: 'holgates_green',
    name: 'Holgates Green',
    type: 'Area',
    description: 'Area in Hugh Town, Isles of Scilly, mentioned in connection with local geography and movement patterns.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Local geographic reference point',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    features: [
      'Local area',
      'Geographic reference',
      'Movement patterns',
      'Urban location'
    ]
  },
  {
    id: 'town_beach',
    name: 'Town Beach',
    type: 'Beach',
    description: 'Beach area in Hugh Town, Isles of Scilly, mentioned in connection with local geography and movement patterns.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Local geographic reference point',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    features: [
      'Beach area',
      'Local amenity',
      'Geographic reference',
      'Coastal location'
    ]
  },
  {
    id: 'steamship_company_offices',
    name: 'Steamship Company Offices',
    type: 'Office',
    description: 'Offices in Hugh Town where tickets to Penzance can be purchased, used by German agents for mainland travel.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Transport booking office used by infiltrating agents',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    features: [
      'Ticket sales',
      'Travel information',
      'Customer service',
      'Transport hub',
      'Booking facilities'
    ]
  },
  {
    id: 'bishop_and_wolf_pub',
    name: 'Bishop and Wolf Pub',
    description: 'Pub in Hugh Town where Bennet conducted surveillance, reading his newspaper while watching for suspicious activity.',
    country: 'United Kingdom',
    region: 'Isles of Scilly',
    coordinates: { lat: 49.9167, lng: -6.3167 },
    significance: 'Surveillance location for Bennet\'s operation',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    features: [
      'Public house',
      'Surveillance vantage point',
      'Local gathering place',
      'Cover for observation'
    ]
  }
];
