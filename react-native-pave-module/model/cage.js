export const CAGES = {
  VIN: {
    id: 1,
    source: require('../assets/cageImage/vin.png'),
    name: 'VIN',
  },
  INTERIOR: {
    id: 2,
    source: require('../assets/cageImage/interior.png'),
    name: 'INTERIOR',
  },
  ODOMETER: {
    id: 3,
    source: require('../assets/cageImage/odometer.png'),
    name: 'ODOMETER',
  },
  LEFT_VIEW: {
    id: 4,
    source: require('../assets/cageImage/left-view.png'),
    name: 'LEFT VIEW',
  },
  FRONT_LEFT: {
    id: 10,
    source: require('../assets/cageImage/front-left.png'),
    name: 'FRONT LEFT',
  },
  FRONT_VIEW: {
    id: 5,
    source: require('../assets/cageImage/front-view.png'),
    name: 'FRONT VIEW',
  },
  FRONT_RIGHT: {
    id: 11,
    source: require('../assets/cageImage/front-right.png'),
    name: 'FRONT RIGHT',
  },
  RIGHT_VIEW: {
    id: 7,
    source: require('../assets/cageImage/right-view.png'),
    name: 'RIGHT VIEW',
  },
  REAR_RIGHT: {
    id: 12,
    source: require('../assets/cageImage/rear-right.png'),
    name: 'REAR RIGHT',
  },
  REAR_VIEW: {
    id: 8,
    source: require('../assets/cageImage/rear-view.png'),
    name: 'REAR VIEW',
  },
  REAR_LEFT: {
    id: 13,
    source: require('../assets/cageImage/rear-left.png'),
    name: 'REAR LEFT',
  },
  WIND_SHIELD: {
    id: 9,
    source: require('../assets/cageImage/wind-shield.png'),
    name: 'WINDSHIELD',
  },
  TIRE: {
    id: 6,
    source: require('../assets/cageImage/tire.png'),
    name: 'TIRE',
  },

  DEFAULT: {
    id: -101,
    name: 'UNKNOWN',
    source: require('../assets/logo-white.png'),
  },
  ODOMETER_INPUT: 100,
  VIN_CODE_INPUT: 101,
  UNKNOWN: -1,
};

export function getCages() {
  return [
    CAGES.VIN,
    CAGES.INTERIOR,
    CAGES.ODOMETER,
    CAGES.RIGHT_VIEW,
    CAGES.REAR_RIGHT,
    CAGES.REAR_VIEW,
    CAGES.REAR_LEFT,
    CAGES.LEFT_VIEW,
    CAGES.FRONT_LEFT,
    CAGES.FRONT_VIEW,
    CAGES.FRONT_RIGHT,
    CAGES.WIND_SHIELD,
    CAGES.TIRE,
  ];
}

export const MapCages = new Map(getCages().map((i) => [i.name, i]));

export function getTutorial(cage) {
  switch (cage.id) {
    case CAGES.VIN.id:
      return "Open the drivers' door and find the VIN barcode inside the door frame and take a photo within these lines. Please make sure the VIN itself is also readable in your image.";
    case CAGES.INTERIOR.id:
      return "Standing looking through the open driver's door, take a photo of the interior as illustrated by these lines.";
    case CAGES.ODOMETER.id:
      return 'Start the engine and capture the instrument cluster according to this illustration with the odometer reading displayed. Before exiting the vehicle, please turn the steering wheel as far to the right as it will go.';
    case CAGES.LEFT_VIEW.id:
      return 'As shown in this illustration, align yourself within the passenger side profile by stepping back about 10 feet to. Please fit the vehicle within these lines.';
    case CAGES.FRONT_LEFT.id:
      return 'Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the front passenger side, as shown in this illustration.';
    case CAGES.FRONT_VIEW.id:
      return 'Move to the front of the vehicle, stepping back safely about 10 feet to capture the profile according to this illustration. Please fit the vehicle within these lines.';
    case CAGES.FRONT_RIGHT.id:
      return 'Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the front passenger side, as shown in this illustration.';
    case CAGES.RIGHT_VIEW.id:
      return 'As shown in this illustration, align yourself within the driver side profile by stepping back about 10 feet to. Please fit the vehicle within these lines.';
    case CAGES.REAR_RIGHT.id:
      return 'Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the rear driver side, as shown in this illustration.';
    case CAGES.REAR_VIEW.id:
      return 'Move to the rear of the vehicle and capture the profile according to this illustration. Please try and fit the outline of the vehicle within these lines.';
    case CAGES.REAR_LEFT.id:
      return 'Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the rear passenger side, as shown in this illustration.';
    case CAGES.WIND_SHIELD.id:
      return 'Move to the front of the vehicle and capture the profile according to this illustration. Please fit the vehicle within these lines.';
    case CAGES.TIRE.id:
      return "Move to the front driver tire and capture the tire's profile according to this illustration.";
    default:
      return '';
  }
}
// CAM_LAYOUT_MESSAGE_INSTRUCTIONS_1: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_1',
//     defaultMessage:
//       "Open the drivers' door and find the VIN barcode inside the door frame and take a photo within these lines. Please make sure the VIN itself is also readable in your image.",
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_2: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_2',
//     defaultMessage: Standing looking through the open driver's door, take a photo of the interior as illustrated by these lines.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_3: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_3',
//     defaultMessage: Start the engine and capture the instrument cluster according to this illustration with the odometer reading displayed. Before exiting the vehicle, please turn the steering wheel as far to the right as it will go.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_3_LITE: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_3_LITE',
//     defaultMessage: Start the engine and capture the instrument cluster according to this illustration with the odometer reading displayed. ,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_4: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_4',
//     defaultMessage: As shown in this illustration, close the driver's door and safely step back about 10 feet to align yourself within the driver side profile. Please fit the vehicle within these lines.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_5: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_5',
//     defaultMessage: Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the front driver side, as shown in this illustration.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_6: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_6',
//     defaultMessage: Move to the front of the vehicle, stepping back safely about 10 feet to capture the profile according to this illustration. Please fit the vehicle within these lines.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_7: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_7',
//     defaultMessage: Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the front passanger side, as shown in this illustration.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_8: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_8',
//     defaultMessage: As shown in this illustration, align yourself within the driver side profile by stepping back about 10 feet to. Please fit the vehicle within these lines.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_9: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_9',
//     defaultMessage: Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the rear passanger side, as shown in this illustration.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_10: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_10',
//     defaultMessage: Move to the rear of the vehicle and capture the profile according to this illustration. Please try and fit the outline of the vehicle within these lines.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_11: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_11',
//     defaultMessage: Next, move closer to the vehicle and fill your camera frame at a 45-degree angle of the rear driver side, as shown in this illustration.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_12: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_12',
//     defaultMessage: Move to the front of the vehicle and capture the profile according to this illustration. Please try and fit the outline of the vehicle within these lines.,
//   },
//   CAM_LAYOUT_MESSAGE_INSTRUCTIONS_13: {
//     id: 'CAM_LAYOUT_MESSAGE_INSTRUCTIONS_13',
//     defaultMessage: Move to the front passenger tire and capture the tire's profile according to this illustration.,
//   },
