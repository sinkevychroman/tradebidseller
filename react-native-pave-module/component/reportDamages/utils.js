import {Dimensions, Platform, StatusBar} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

export const isIPhoneX = () => {
  if (width > height) {
    if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
      return (
        (width === X_HEIGHT && height === X_WIDTH) ||
        (width === XSMAX_HEIGHT && height === XSMAX_WIDTH)
      );
    } else {
      return false;
    }
  } else {
    if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
      return (
        (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
      );
    } else {
      return false;
    }
  }
};

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 22,
  android: StatusBar.currentHeight,
  default: 0,
});

export function replaceUnderscore(name) {
  var named = name.split('UNIQUE').join('');
  var namedd = named.split('_').join(' ');
  return namedd;
}

export function validURL(str) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

export const getGradeScoreColor = (grade_score) => {
  switch (grade_score) {
    case 0:
      return '#718093';
    case 1:
      return '#f9ca24';
    case 2:
      return '#f0932b';
    case 3:
      return '#e84118';
    case 4:
      return '#e84118';
    default:
      return '#718093';
  }
};

export const getTireColorByName = (damage_condition_name) => {
  switch (damage_condition_name) {
    case 'LIKE_NEW':
      return '#00b894';
    case 'GOOD_CONDITION':
      return '#f9ca24';
    case 'WORN_MEDIUM':
      return '#f0932b';
    case 'WORN_MAJOR':
      return '#b71540';
    case 'FLAT_TIRE':
      return '#f0932b';
    case 'WINTER_TREAD':
      return '#74b9ff';
    case 'WEATHER_CRACKED':
      return '#f0932b';
    default:
      return '#b71540';
  }
};

// ['new', '11/32, 10/32, 9/32']
// ['major', ' 3/32, 2/32, 1/32']
// ['medium', '5/32, 4/32']
// ['good', '8/32, 7/32, 6/32']
// ['snow', 'N/A']
export const getTireTreadDepthByConditionName = (damage_condition_name) => {
  switch (damage_condition_name) {
    case 'LIKE_NEW':
      return '11/32, 10/32, 9/32';
    case 'GOOD_CONDITION':
      return '8/32, 7/32, 6/32';
    case 'WORN_MEDIUM':
      return '5/32, 4/32';
    case 'WORN_MAJOR':
      return '3/32, 2/32, 1/32';
    case 'FLAT_TIRE':
      return '5/32, 4/32';
    case 'WINTER_TREAD':
      return 'N/A';
    case 'WEATHER_CRACKED':
      return '5/32, 4/32';
    default:
      return '3/32, 2/32, 1/32';
  }
};

export function sortDamageAreas(damageAreas) {
  var leftArea = [];
  var frontArea = [];
  var rightArea = [];
  var rearArea = [];
  var windshieldArea = [];
  var tireArea = [];
  var otherArea = [];

  damageAreas.forEach((area) => {
    if (area.view === 'LEFT VIEW') {
      leftArea.push(area);
    } else if (area.view === 'FRONT VIEW') {
      frontArea.push(area);
    } else if (area.view === 'RIGHT VIEW') {
      rightArea.push(area);
    } else if (area.view === 'REAR VIEW') {
      rearArea.push(area);
    } else if (area.view === 'WINDSHIELD') {
      windshieldArea.push(area);
    } else if (area.view === 'TIRE') {
      tireArea.push(area);
    } else {
      otherArea.push(area);
    }
  });

  var dataSorted = [
    ...otherArea,
    ...leftArea,
    ...frontArea,
    ...rightArea,
    ...rearArea,
    ...windshieldArea,
    ...tireArea,
  ];
  return dataSorted;
}

export function sortDetectedDamages(array) {
  var arrayNormalItems = [];
  var arrayRejected = [];
  var arrayTires = [];
  var arrayParts = [];

  array.forEach((item) => {
    if (item?.user_response === 'reject') {
      arrayRejected.push(item);
    } else if (item?.damage_group === 'TIRE') {
      arrayTires.push(item);
      // } else if (item?.damage_group === 'PART') {
      //   arrayParts.push(item);
    } else {
      arrayNormalItems.push(item);
    }
  });

  var sortedDetectedDamages = [
    ...arrayNormalItems,
    ...arrayRejected,
    // ...arrayParts,
    ...arrayTires,
  ];

  return sortedDetectedDamages;
}

export async function fetchWithTimeout(url, options, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout),
    ),
  ]);
}
