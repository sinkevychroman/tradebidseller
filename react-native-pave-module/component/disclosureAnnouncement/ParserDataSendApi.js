export const DataSubmitDisclosure = (type) => {
  return {
    VEHICLE_DISCLOSURES: {
      'ACCIDENT_REPAIR_>€3,000': type[`ACCIDENT_REPAIR_>€3,000`],
      ALL_KEYS_PRESENT: type['ALL_KEYS_PRESENT'],
      'EX-RENTAL_/_TAXI': type['EX-RENTAL_/_TAXI'],
      FULLY_OPERATIONAL_CLUTCH: type['FULLY_OPERATIONAL_CLUTCH'],
      VLC_PRESENT: type['VLC_PRESENT'],
      WARNING_LIGHTS_ON: type['WARNING_LIGHTS_ON'],
      FULL_SERVICE_HISTORY: type['FULL_SERVICE_HISTORY'],
    },
  };
};

export const DataSubmitAnnouncement = (type) => {
  return {
    REGISTRATION: type['REGISTRATION_DOCUMENTS_PRESENT?'],
    ALL_KEYS_PRESENT: type['ALL_KEYS_ARE_PRESENT?'],
    BOOKS_PRESENT: type[`ARE_ALL_SERVICE,_WARRANTY_AND_OWNERS_MANUAL_PRESENT?`],
    DISCS_PRESENT: type['ALL_SOFTWARE_AND_NAVIGATION_DISCS_ARE_PRESENT?'],
    RIMS_TYRES:
      type['IF_AFTERMARKET_WINTER_TYRES_AND_RIMS,_ARE_ORIGINALS_INCLUDED?'],
    OTHER_ANNOUNCEMENTS: type['ANY_OTHER_ANNOUNCEMENTS?'],
  };
};
