import {Dimensions, Platform, StatusBar} from 'react-native';
import {Logger} from '../../utils/AppLogger';
import {REACT_APP_DAMAGE_URL} from '../../constants/stringsConstants';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

export const isIPhoneX = () => {
  Logger('height, width ' + Platform.OS);
  Logger(height, width);
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
  ios: isIPhoneX() ? 54 : 0,
  android: StatusBar.currentHeight,
  default: 0,
});

export function isLandscape() {
  const dim = Dimensions.get('window');
  return dim.width >= dim.height;
}

export function getDamageTypeList(damage_group) {
  const damageTypesData = require('./damage_data.json');
  let damagePart = [];
  let damageBody = [];
  let damageGlass = [];
  let damageWheel = [];
  let damageTire = [];
  let typeSelectList = [];

  for (let key in damageTypesData.PART) {
    damagePart.push({
      name: key,
      grade_score: damageTypesData.PART[key].grade_score,
    });
  }
  for (let key in damageTypesData.BODY) {
    damageBody.push({
      name: key,
      grade_score: damageTypesData.BODY[key].grade_score,
    });
  }

  for (let key in damageTypesData.WHEEL) {
    damageWheel.push({
      name: key,
      grade_score: damageTypesData.WHEEL[key].grade_score,
    });
  }
  for (let key in damageTypesData.GLASS) {
    damageGlass.push({
      name: key,
      grade_score: damageTypesData.GLASS[key].grade_score,
    });
  }
  for (let key in damageTypesData.TIRE) {
    damageTire.push({
      name: key,
      grade_score: damageTypesData.TIRE[key].grade_score,
    });
  }
  let damageTypes = [];
  if (damage_group === 'PART') {
    damageTypes = damagePart;
  } else if (damage_group === 'BODY') {
    damageTypes = damageBody;
  } else if (damage_group === 'GLASS') {
    damageTypes = damageGlass;
  } else if (damage_group === 'WHEEL') {
    damageTypes = damageWheel;
  } else if (damage_group === 'TIRE') {
    damageTypes = damageWheel;
  }

  for (let j = 0; j < damageTypes.length; j++) {
    const type = damageTypes[j];
    typeSelectList.push({
      value: type.name,
      label: type.name,
      grade_score: type.grade_score,
    });
  }
  return typeSelectList;
}

// export const callApiGetDamagesList = async (damage_group, component) => {
//   Logger('url', REACT_APP_DAMAGE_URL(damage_group, component));
//   return new Promise((resolve, reject) => {
//     var myHeaders = new Headers();
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow',
//     };
//     fetch(REACT_APP_DAMAGE_URL(damage_group, component), requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         Logger(`'${damage_group} response ======>> '`, JSON.parse(result));
//         var damageTypesData = JSON.parse(result);
//         resolve(damageTypesData);
//       })
//       .catch((error) => {
//         Logger('error', error);
//         reject(error);
//       });
//   });
// };

// export const getDamageTypeListWithJsonData = async (
//   damage_group,
//   component,
// ) => {
//   Logger('url', REACT_APP_DAMAGE_URL(damage_group, component));
//   return new Promise((resolve, reject) => {
//     var myHeaders = new Headers();
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow',
//     };
//     var damages = [];
//     var typeSelectList = [];
//     fetch(REACT_APP_DAMAGE_URL(damage_group, component), requestOptions)
//       .then((response) => response.text())
//       .then((result) => {
//         Logger(`'${damage_group} response ======>> '`, JSON.parse(result));
//         var damageTypesData = JSON.parse(result);
//         for (let key in damageTypesData.damages) {
//           damages.push({
//             name: damageTypesData.damages[key].damage_name,
//             grade_score: damageTypesData.damages[key].grade_score,
//           });
//           // Logger('damages =======> ', damages);
//           let damageTypes = damages;
//           for (let j = 0; j < damageTypes.length; j++) {
//             const type = damageTypes[j];
//             // Logger(type);
//             typeSelectList.push({
//               value: type.name,
//               label: type.name,
//               grade_score: type.grade_score,
//             });
//           }
//         }
//         // Logger('typeSelectList', typeSelectList);
//         resolve(typeSelectList);
//       })
//       .catch((error) => {
//         Logger('error', error);
//         reject(error);
//       });
//   });
// };

// export const getDamageTypeListInDamagesList = (damages) => {
//   var typeSelectList = [];

//   for (let j = 0; j < damages.length; j++) {
//     const item = damages[j];

//     typeSelectList.push({
//       value: item.damage_name,
//       label: item.damage_name,
//       grade_score: item.grade_score,
//     });
//   }

//   Logger('typeSelectList', typeSelectList);
//   return typeSelectList;
// };
