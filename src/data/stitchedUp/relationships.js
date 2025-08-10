// Relationships data for "Stitched Up" book

export const relationships = [
    { from: 'bill_laurie', to: 'cynthia_childreth', type: 'handler-asset' },
    { from: 'bill_laurie', to: 'richard_childreth', type: 'handler-asset' },
    { from: 'bill_laurie', to: 'hannah_park', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'jane_maclean', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'edwin', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'george_bennet', type: 'colleague' },
    { from: 'bill_laurie', to: 'louise_harrington', type: 'handler-informant' },
    { from: 'cynthia_childreth', to: 'richard_childreth', type: 'spouse' },
    { from: 'cynthia_childreth', to: 'mary', type: 'employer-confidante' },
    { from: 'cynthia_childreth', to: 'amy_wyndholme', type: 'friend' },
    { from: 'john_davies', to: 'megan_davies', type: 'spouse' },
    { from: 'john_davies', to: 'peter_snowden', type: 'conspirator' },
    { from: 'john_davies', to: 'bob_harrington', type: 'conspirator' },
    { from: 'peter_snowden', to: 'marjorie_snowden', type: 'spouse' },
    { from: 'peter_snowden', to: 'bob_harrington', type: 'conspirator' },
    { from: 'bob_harrington', to: 'louise_harrington', type: 'spouse' },
    { from: 'george_bennet', to: 'jim', type: 'superior-subordinate' },
    { from: 'gerda_stammer', to: 'franz_stammer', type: 'spouse' },
    { from: 'gerda_stammer', to: 'lena_weber', type: 'colleague' },
    { from: 'hannah_park', to: 'jane_maclean', type: 'colleague-partner' },
    { from: 'louise_harrington', to: 'gerda_stammer', type: 'associate' },
    { from: 'richard_childreth', to: 'bill_laurie', type: 'asset-handler' },
    { from: 'megan_davies', to: 'edwards', type: 'assassin-victim' },

    // Montgomery relationships
    { from: 'montgomery', to: 'montys_adc', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'montys_adc', type: 'intelligence-contact' },
    
    // Gladys relationships
    { from: 'gladys', to: 'cynthia_childreth', type: 'informant-contact' },
    { from: 'gladys', to: 'mary', type: 'village-connection' },
    
    // Alison relationships
    { from: 'bill_laurie', to: 'alison', type: 'superior-subordinate' },
    { from: 'alison', to: 'cynthia_childreth', type: 'protector-protected' },
    { from: 'alison', to: 'john_davies', type: 'surveillance-target' },
    
    // Felicity relationships
    { from: 'bill_laurie', to: 'felicity', type: 'superior-subordinate' },
    { from: 'felicity', to: 'paul_holness', type: 'cover-contact' },
    { from: 'felicity', to: 'bob_harrington', type: 'surveillance-target' },
    { from: 'felicity', to: 'louise_harrington', type: 'surveillance-target' },
    { from: 'felicity', to: 'jack', type: 'observed-observer' },
    
    // Don relationships
    { from: 'bill_laurie', to: 'don', type: 'superior-subordinate' },
    { from: 'don', to: 'cynthia_childreth', type: 'trainer-trainee' },
    
    // Jack relationships
    { from: 'jack', to: 'bob_harrington', type: 'co-conspirator' },
    { from: 'jack', to: 'louise_harrington', type: 'co-conspirator' },
    
    // Intelligence team relationships
    { from: 'george_bennet', to: 'bert', type: 'superior-subordinate' },
    { from: 'george_bennet', to: 'mike', type: 'superior-subordinate' },
    { from: 'george_bennet', to: 'keith', type: 'superior-subordinate' },
    { from: 'george_bennet', to: 'ken', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'edwin', type: 'superior-subordinate' },
    { from: 'bert', to: 'marjorie_snowden', type: 'surveillance-target' },
    { from: 'keith', to: 'john_davies', type: 'surveillance-target' },
    { from: 'mike', to: 'peter_snowden', type: 'surveillance-target' },
    
    // Denleigh Manor staff
    { from: 'patrick', to: 'amy_wyndholme', type: 'employee-employer' },
    { from: 'sheila', to: 'amy_wyndholme', type: 'employee-employer' },
    
    // Horace Wyndholme connections
    { from: 'horace_wyndholme', to: 'amy_wyndholme', type: 'spouse' },
    { from: 'horace_wyndholme', to: 'bill_laurie', type: 'intelligence-colleague' },
    
    // Mosley connections
    { from: 'oswald_mosley', to: 'peter_snowden', type: 'ideological-supporter' },
    { from: 'oswald_mosley', to: 'bob_harrington', type: 'ideological-supporter' },
    
    // Helmut Schnitter
    { from: 'helmut_schnitter', to: 'edwards', type: 'predecessor-successor' },
    
    // Expert connections
    { from: 'bill_laurie', to: 'jacobs', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'paul_holness', type: 'intelligence-contact' },
    
    // Law enforcement
    { from: 'george_bennet', to: 'chief_inspector', type: 'colleague-rival' },
    { from: 'george_bennet', to: 'inspector_williams', type: 'superior-cooperator' },
    
    // Davies-Edwards-Megan connections
    { from: 'megan_davies', to: 'edwards', type: 'assassin-victim' },
    { from: 'john_davies', to: 'edwards', type: 'conspirator' },
    
    // Additional connections for original characters
    { from: 'mary', to: 'richard_childreth', type: 'employee-employer' },
    { from: 'gerda_stammer', to: 'cynthia_childreth', type: 'recruiter-target' },
    { from: 'hannah_park', to: 'alison', type: 'colleague' },
    { from: 'jane_maclean', to: 'alison', type: 'colleague' }
];
