/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Mapping of major Indian cities, cultural hubs, and district headquarters to their canonical State or Union Territory
export const CITY_STATE_MAP: Record<string, string> = {
  // West Bengal
  'kolkata': 'West Bengal',
  'calcutta': 'West Bengal',
  'howrah': 'West Bengal',
  'darjeeling': 'West Bengal',
  'siliguri': 'West Bengal',
  'asansol': 'West Bengal',
  'durgapur': 'West Bengal',
  'bardhaman': 'West Bengal',
  'burdwan': 'West Bengal',
  'kharagpur': 'West Bengal',
  'malda': 'West Bengal',
  'kalimpong': 'West Bengal',
  'shantiniketan': 'West Bengal',
  'bolpur': 'West Bengal',
  'murshidabad': 'West Bengal',
  'jalpaiguri': 'West Bengal',
  'cooch behar': 'West Bengal',

  // Maharashtra
  'mumbai': 'Maharashtra',
  'bombay': 'Maharashtra',
  'pune': 'Maharashtra',
  'nagpur': 'Maharashtra',
  'nashik': 'Maharashtra',
  'thane': 'Maharashtra',
  'aurangabad': 'Maharashtra',
  'chhatrapati sambhajinagar': 'Maharashtra',
  'solapur': 'Maharashtra',
  'amravati': 'Maharashtra',
  'kolhapur': 'Maharashtra',
  'navi mumbai': 'Maharashtra',
  'shirdi': 'Maharashtra',
  'nanded': 'Maharashtra',
  'jalgaon': 'Maharashtra',
  'akola': 'Maharashtra',
  'latur': 'Maharashtra',
  'ratnagiri': 'Maharashtra',

  // Karnataka
  'bengaluru': 'Karnataka',
  'bangalore': 'Karnataka',
  'mysuru': 'Karnataka',
  'mysore': 'Karnataka',
  'hubballi': 'Karnataka',
  'hubli': 'Karnataka',
  'mangaluru': 'Karnataka',
  'mangalore': 'Karnataka',
  'belagavi': 'Karnataka',
  'belgaum': 'Karnataka',
  'kalaburagi': 'Karnataka',
  'gulbarga': 'Karnataka',
  'dharwad': 'Karnataka',
  'shivamogga': 'Karnataka',
  'shimoga': 'Karnataka',
  'ballari': 'Karnataka',
  'bellary': 'Karnataka',
  'udupi': 'Karnataka',
  'hampi': 'Karnataka',
  'hassan': 'Karnataka',
  'madikeri': 'Karnataka',
  'coorg': 'Karnataka',

  // Tamil Nadu
  'chennai': 'Tamil Nadu',
  'madras': 'Tamil Nadu',
  'coimbatore': 'Tamil Nadu',
  'madurai': 'Tamil Nadu',
  'tiruchirappalli': 'Tamil Nadu',
  'trichy': 'Tamil Nadu',
  'salem': 'Tamil Nadu',
  'tirunelveli': 'Tamil Nadu',
  'vellore': 'Tamil Nadu',
  'erode': 'Tamil Nadu',
  'thoothukudi': 'Tamil Nadu',
  'thanjavur': 'Tamil Nadu',
  'tanjore': 'Tamil Nadu',
  'kanyakumari': 'Tamil Nadu',
  'kanchipuram': 'Tamil Nadu',
  'rameswaram': 'Tamil Nadu',
  'ooty': 'Tamil Nadu',
  'kodaikanal': 'Tamil Nadu',

  // Gujarat
  'ahmedabad': 'Gujarat',
  'surat': 'Gujarat',
  'vadodara': 'Gujarat',
  'baroda': 'Gujarat',
  'rajkot': 'Gujarat',
  'bhavnagar': 'Gujarat',
  'jamnagar': 'Gujarat',
  'junagadh': 'Gujarat',
  'gandhinagar': 'Gujarat',
  'anand': 'Gujarat',
  'navsari': 'Gujarat',
  'morbi': 'Gujarat',
  'somnath': 'Gujarat',
  'dwarka': 'Gujarat',
  'bhuj': 'Gujarat',
  'porbandar': 'Gujarat',
  'mehsana': 'Gujarat',

  // Uttar Pradesh
  'lucknow': 'Uttar Pradesh',
  'kanpur': 'Uttar Pradesh',
  'varanasi': 'Uttar Pradesh',
  'kashi': 'Uttar Pradesh',
  'banaras': 'Uttar Pradesh',
  'benares': 'Uttar Pradesh',
  'ayodhya': 'Uttar Pradesh',
  'faizabad': 'Uttar Pradesh',
  'agra': 'Uttar Pradesh',
  'prayagraj': 'Uttar Pradesh',
  'allahabad': 'Uttar Pradesh',
  'ghaziabad': 'Uttar Pradesh',
  'noida': 'Uttar Pradesh',
  'greater noida': 'Uttar Pradesh',
  'meerut': 'Uttar Pradesh',
  'aligarh': 'Uttar Pradesh',
  'bareilly': 'Uttar Pradesh',
  'moradabad': 'Uttar Pradesh',
  'gorakhpur': 'Uttar Pradesh',
  'mathura': 'Uttar Pradesh',
  'vrindavan': 'Uttar Pradesh',
  'jhansi': 'Uttar Pradesh',
  'firozabad': 'Uttar Pradesh',
  'muzaffarnagar': 'Uttar Pradesh',

  // Rajasthan
  'jaipur': 'Rajasthan',
  'jodhpur': 'Rajasthan',
  'udaipur': 'Rajasthan',
  'kota': 'Rajasthan',
  'bikaner': 'Rajasthan',
  'ajmer': 'Rajasthan',
  'bhilwara': 'Rajasthan',
  'alwar': 'Rajasthan',
  'sikar': 'Rajasthan',
  'pali': 'Rajasthan',
  'pushkar': 'Rajasthan',
  'jaisalmer': 'Rajasthan',
  'mount abu': 'Rajasthan',
  'chittorgarh': 'Rajasthan',
  'bharatpur': 'Rajasthan',

  // Punjab
  'amritsar': 'Punjab',
  'ludhiana': 'Punjab',
  'jalandhar': 'Punjab',
  'patiala': 'Punjab',
  'bathinda': 'Punjab',
  'mohali': 'Punjab',
  'pathankot': 'Punjab',
  'hoshiarpur': 'Punjab',
  'batala': 'Punjab',
  'moga': 'Punjab',
  'abohar': 'Punjab',
  'anandpur sahib': 'Punjab',

  // Haryana
  'gurugram': 'Haryana',
  'gurgaon': 'Haryana',
  'faridabad': 'Haryana',
  'panipat': 'Haryana',
  'ambala': 'Haryana',
  'yamunanagar': 'Haryana',
  'rohtak': 'Haryana',
  'hisar': 'Haryana',
  'karnal': 'Haryana',
  'sonipat': 'Haryana',
  'panchkula': 'Haryana',
  'kurukshetra': 'Haryana',

  // Delhi (UT)
  'delhi': 'Delhi',
  'new delhi': 'Delhi',
  'old delhi': 'Delhi',
  'dwarka delhi': 'Delhi',
  'rohini': 'Delhi',
  'connaught place': 'Delhi',

  // Odisha
  'bhubaneswar': 'Odisha',
  'cuttack': 'Odisha',
  'puri': 'Odisha',
  'rourkela': 'Odisha',
  'berhampur': 'Odisha',
  'sambalpur': 'Odisha',
  'balasore': 'Odisha',
  'bhadrak': 'Odisha',
  'baripada': 'Odisha',
  'konark': 'Odisha',

  // Bihar
  'patna': 'Bihar',
  'gaya': 'Bihar',
  'bhagalpur': 'Bihar',
  'muzaffarpur': 'Bihar',
  'purnia': 'Bihar',
  'darbhanga': 'Bihar',
  'bihar sharif': 'Bihar',
  'arrah': 'Bihar',
  'begusarai': 'Bihar',
  'katihar': 'Bihar',
  'nalanda': 'Bihar',
  'bodh gaya': 'Bihar',

  // Kerala
  'thiruvananthapuram': 'Kerala',
  'trivandrum': 'Kerala',
  'kochi': 'Kerala',
  'cochin': 'Kerala',
  'ernakulam': 'Kerala',
  'kozhikode': 'Kerala',
  'calicut': 'Kerala',
  'kollam': 'Kerala',
  'thrissur': 'Kerala',
  'kannur': 'Kerala',
  'alappuzha': 'Kerala',
  'alleppey': 'Kerala',
  'palakkad': 'Kerala',
  'kottayam': 'Kerala',
  'malappuram': 'Kerala',
  'wayanad': 'Kerala',

  // Telangana
  'hyderabad': 'Telangana',
  'secunderabad': 'Telangana',
  'warangal': 'Telangana',
  'nizamabad': 'Telangana',
  'karimnagar': 'Telangana',
  'khammam': 'Telangana',
  'ramagundam': 'Telangana',
  'mahbubnagar': 'Telangana',

  // Andhra Pradesh
  'visakhapatnam': 'Andhra Pradesh',
  'vizag': 'Andhra Pradesh',
  'vijayawada': 'Andhra Pradesh',
  'guntur': 'Andhra Pradesh',
  'nellore': 'Andhra Pradesh',
  'kurnool': 'Andhra Pradesh',
  'rajahmundry': 'Andhra Pradesh',
  'tirupati': 'Andhra Pradesh',
  'kakinada': 'Andhra Pradesh',
  'anantapur': 'Andhra Pradesh',

  // Madhya Pradesh
  'bhopal': 'Madhya Pradesh',
  'indore': 'Madhya Pradesh',
  'gwalior': 'Madhya Pradesh',
  'jabalpur': 'Madhya Pradesh',
  'ujjain': 'Madhya Pradesh',
  'sagar': 'Madhya Pradesh',
  'dewas': 'Madhya Pradesh',
  'satna': 'Madhya Pradesh',
  'ratlam': 'Madhya Pradesh',
  'rewa': 'Madhya Pradesh',
  'khajuraho': 'Madhya Pradesh',

  // Assam
  'guwahati': 'Assam',
  'silchar': 'Assam',
  'dibrugarh': 'Assam',
  'jorhat': 'Assam',
  'nagaon': 'Assam',
  'tezpur': 'Assam',
  'tinsukia': 'Assam',
  'bongaigaon': 'Assam',

  // Jharkhand
  'ranchi': 'Jharkhand',
  'jamshedpur': 'Jharkhand',
  'dhanbad': 'Jharkhand',
  'bokaro': 'Jharkhand',
  'deoghar': 'Jharkhand',
  'hazaribagh': 'Jharkhand',

  // Chhattisgarh
  'raipur': 'Chhattisgarh',
  'bilaspur': 'Chhattisgarh',
  'bhilai': 'Chhattisgarh',
  'durg': 'Chhattisgarh',
  'korba': 'Chhattisgarh',
  'rajnandgaon': 'Chhattisgarh',
  'jagdalpur': 'Chhattisgarh',

  // Himachal Pradesh
  'shimla': 'Himachal Pradesh',
  'dharamshala': 'Himachal Pradesh',
  'manali': 'Himachal Pradesh',
  'solan': 'Himachal Pradesh',
  'mandi': 'Himachal Pradesh',
  'kullu': 'Himachal Pradesh',
  'palampur': 'Himachal Pradesh',

  // Uttarakhand
  'dehradun': 'Uttarakhand',
  'haridwar': 'Uttarakhand',
  'rishikesh': 'Uttarakhand',
  'nainital': 'Uttarakhand',
  'haldwani': 'Uttarakhand',
  'roorkee': 'Uttarakhand',
  'rudrapur': 'Uttarakhand',
  'almora': 'Uttarakhand',

  // Goa
  'panaji': 'Goa',
  'panjim': 'Goa',
  'margao': 'Goa',
  'vasco da gama': 'Goa',
  'mapusa': 'Goa',
  'ponda': 'Goa',

  // Jammu & Kashmir (UT)
  'srinagar': 'Jammu and Kashmir',
  'jammu': 'Jammu and Kashmir',
  'anantnag': 'Jammu and Kashmir',
  'baramulla': 'Jammu and Kashmir',
  'katra': 'Jammu and Kashmir',

  // Ladakh (UT)
  'leh': 'Ladakh',
  'kargil': 'Ladakh',

  // Chandigarh (UT)
  'chandigarh': 'Chandigarh',

  // Puducherry (UT)
  'puducherry': 'Puducherry',
  'pondicherry': 'Puducherry',
  'karaikal': 'Puducherry',
  'mahe': 'Puducherry',
  'yanam': 'Puducherry',

  // Tripura
  'agartala': 'Tripura',
  'dharmanagar': 'Tripura',
  'udaipur tripura': 'Tripura',

  // Sikkim
  'gangtok': 'Sikkim',
  'namchi': 'Sikkim',
  'gezing': 'Sikkim',
  'pelling': 'Sikkim',

  // Meghalaya
  'shillong': 'Meghalaya',
  'tura': 'Meghalaya',
  'cherrapunji': 'Meghalaya',
  'sohra': 'Meghalaya',

  // Manipur
  'imphal': 'Manipur',
  'churachandpur': 'Manipur',
  'thoubal': 'Manipur',

  // Mizoram
  'aizawl': 'Mizoram',
  'lunglei': 'Mizoram',
  'champhai': 'Mizoram',

  // Nagaland
  'kohima': 'Nagaland',
  'dimapur': 'Nagaland',
  'mokokchung': 'Nagaland',

  // Arunachal Pradesh
  'itanagar': 'Arunachal Pradesh',
  'naharlagun': 'Arunachal Pradesh',
  'tawang': 'Arunachal Pradesh',
  'pasighat': 'Arunachal Pradesh',

  // Dadra and Nagar Haveli and Daman and Diu (UT)
  'daman': 'Dadra and Nagar Haveli and Daman and Diu',
  'diu': 'Dadra and Nagar Haveli and Daman and Diu',
  'silvassa': 'Dadra and Nagar Haveli and Daman and Diu',

  // Andaman and Nicobar Islands (UT)
  'port blair': 'Andaman and Nicobar Islands',
  'havelock': 'Andaman and Nicobar Islands',
  'swaraj dweep': 'Andaman and Nicobar Islands',

  // Lakshadweep (UT)
  'kavaratti': 'Lakshadweep',
  'agatti': 'Lakshadweep',
};

// Popular city suggestions grouped by state name
export const POPULAR_CITIES_BY_STATE: Record<string, string[]> = {
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri', 'Asansol', 'Durgapur', 'Shantiniketan'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Chhatrapati Sambhajinagar', 'Kolhapur'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi', 'Udupi', 'Hampi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Thanjavur', 'Rameswaram'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Somnath', 'Dwarka'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Ayodhya', 'Kanpur', 'Agra', 'Prayagraj', 'Mathura'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Pushkar', 'Jaisalmer'],
  'Punjab': ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Kurukshetra'],
  'Delhi': ['New Delhi', 'Old Delhi', 'Dwarka', 'Rohini', 'Connaught Place'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 'Konark'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Nalanda'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Alappuzha', 'Kollam'],
  'Telangana': ['Hyderabad', 'Secunderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore', 'Kurnool'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Khajuraho'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Bhilai', 'Durg', 'Korba'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Manali', 'Solan', 'Kullu'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Haldwani', 'Almora'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Katra'],
  'Ladakh': ['Leh', 'Kargil'],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
  'Tripura': ['Agartala', 'Dharmanagar', 'Udaipur'],
  'Sikkim': ['Gangtok', 'Namchi', 'Pelling'],
  'Meghalaya': ['Shillong', 'Tura', 'Cherrapunji'],
  'Manipur': ['Imphal', 'Churachandpur', 'Thoubal'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Pasighat', 'Naharlagun'],
  'Dadra and Nagar Haveli and Daman and Diu': ['Daman', 'Diu', 'Silvassa'],
  'Andaman and Nicobar Islands': ['Port Blair', 'Havelock (Swaraj Dweep)'],
  'Lakshadweep': ['Kavaratti', 'Agatti'],
};

/**
 * Checks whether a given string is known to be a city rather than a state/UT
 */
export function findStateForCity(cityInput: string): string | undefined {
  if (!cityInput || !cityInput.trim()) return undefined;
  const clean = cityInput.trim().toLowerCase();
  return CITY_STATE_MAP[clean];
}

export interface CityValidationResult {
  isValid: boolean;
  isMismatch: boolean;
  detectedState?: string;
  warning?: {
    en: string;
    hi: string;
    bn: string;
  };
}

/**
 * Validates whether a city matches the selected state.
 * Returns information if a mismatch is detected (e.g. typing Kolkata in Maharashtra).
 */
export function validateCityForState(cityInput?: string, stateInput?: string): CityValidationResult {
  if (!cityInput || !cityInput.trim()) {
    return { isValid: true, isMismatch: false };
  }

  const cleanCity = cityInput.trim().toLowerCase();
  const detectedState = CITY_STATE_MAP[cleanCity];

  // If city is not in our known list, we allow it (custom town/village is valid)
  if (!detectedState) {
    return { isValid: true, isMismatch: false };
  }

  // If state is All of India or universal, any Indian city is valid
  if (!stateInput || stateInput.toLowerCase().includes('all') || stateInput.toLowerCase().includes('india') || stateInput.toLowerCase().includes('bharat')) {
    return { isValid: true, isMismatch: false, detectedState };
  }

  const cleanState = stateInput.trim().toLowerCase();
  const detectedClean = detectedState.toLowerCase();

  // If it matches the state
  if (cleanState === detectedClean || cleanState.includes(detectedClean) || detectedClean.includes(cleanState)) {
    return { isValid: true, isMismatch: false, detectedState };
  }

  // Mismatch detected! (e.g. city is Kolkata, but state selected is Maharashtra)
  return {
    isValid: false,
    isMismatch: true,
    detectedState,
    warning: {
      en: `Note: ${cityInput.trim()} is traditionally located in ${detectedState}.`,
      hi: `ध्यान दें: ${cityInput.trim()} पारंपरिक रूप से ${detectedState} में स्थित है।`,
      bn: `দৃষ্টি আকর্ষণ: ${cityInput.trim()} ঐতিহ্যগতভাবে ${detectedState}-এ অবস্থিত।`,
    },
  };
}

/**
 * Returns suggested popular cities for a given state name
 */
export function getPopularCitiesForState(stateName?: string): string[] {
  if (!stateName) return [];
  return POPULAR_CITIES_BY_STATE[stateName] || [];
}
