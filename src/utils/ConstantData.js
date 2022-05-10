import {Platform, StatusBar, Dimensions} from 'react-native';
import {colors, images, strings, fonts} from '../themes';
import {ConstantUtils} from '../utils';

export default class ConstantData {
  // Menu Data
  static HOME_MENU_DATA = [
    {
      id: ConstantUtils.MENU_FILTER_ID,
      title: ConstantUtils.MENU_FILTER,
      icon: images.filter,
    },
    {
      id: ConstantUtils.MENU_NOTIFICATION_ID,
      title: ConstantUtils.MENU_NOTIFICATION,
      icon: images.notification,
    },
  ];

  // Menu Data
  static HOME_MENU_DATA_FEED = [
    {
      id: ConstantUtils.MENU_FILTER_ID,
      title: ConstantUtils.MENU_FILTER,
      icon: images.plusIcon,
    },
  ];

  static HOME_FILTER_MENU_DATA = [
    {
      id: ConstantUtils.MENU_DONE_ID,
      title: ConstantUtils.MENU_DONE,
    },
  ];

  static DISTANCE_DROP_DOWN_DATA = [
    {
      value: '10',
      title: '10 miles',
    },
    {
      value: '20',
      title: '20 miles',
    },
    {
      value: '30',
      title: '30 miles',
    },
    {
      value: '40',
      title: '40 miles',
    },
    {
      value: '50',
      title: '50 miles',
    },
    {
      value: '60',
      title: '60 miles',
    },
    {
      value: '70',
      title: '70 miles',
    },
    {
      value: '80',
      title: '80 miles',
    },
    {
      value: '90',
      title: '90 miles',
    },
    {
      value: '100',
      title: '100 miles',
    },
    {
      value: '150',
      title: '150 miles',
    },
    {
      value: '200',
      title: '200 miles',
    },
    {
      value: '250',
      title: '250 miles',
    },
    {
      value: '300',
      title: '300 miles',
    },
    {
      value: '400',
      title: '400 miles',
    },
    {
      value: '500',
      title: '500 miles',
    },
    {
      value: '600',
      title: '600 miles',
    },
    {
      value: '700',
      title: '700 miles',
    },
    {
      value: '800',
      title: '800 miles',
    },
    {
      value: '900',
      title: '900 miles',
    },
    {
      value: '1000',
      title: '1000 miles',
    },
  ];

  //Profile Item Menu Data
  static PROFILE_MENU_DATA = [
    {
      id: ConstantUtils.ABOUT_US_ID,
      name: strings.about_us,
    },
    {
      id: ConstantUtils.MEMBERSHIP_ID,
      name: strings.membership,
    },
    // {
    //     id: ConstantUtils.CHANGE_PASSWORD_ID,
    //     name: strings.change_password
    // },
    {
      id: ConstantUtils.PRIVACY_SETTINGS_ID,
      name: strings.privacy_settings,
    },
    {
      id: ConstantUtils.TERMS_OF_USE_ID,
      name: strings.terms_of_use,
    },
    {
      id: ConstantUtils.PRIVACY_POLICY_ID,
      name: strings.privacy_policy,
    },
    {
      id: ConstantUtils.BLOCKED_ID,
      name: strings.blocked_friends,
    },
    {
      id: ConstantUtils.CONTACT_US_ID,
      name: strings.contact_us,
    },
  ];
}
