/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import PropTypes, {func} from 'prop-types';

import ButtonTypeView from '../ui/radioButtonType/RadioButtonType';

import CheckBoxListView from '../ui/checkListType/CheckListType';

import RadioListView from '../ui/radioListType/RadioListType';

import TextInputView from '../ui/textInputType/TextInputType';

import useScreenDimensions from '../../hook/UseScreenDimensions';

import SessionUploadManager from '../../model/SessionUpload';

import EventBus from '../../model/EventBus';
import {Logger} from '../../utils/AppLogger';
import {
  DataSubmitDisclosure,
  DataSubmitAnnouncement,
} from './ParserDataSendApi';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from '../ui/accordion-collapse';
import {REACT_APP_BASE_URL} from '../../constants/index';
import UserStepsView from '../ui/userStepsView/UserStepsView';
import {StatusBarHeight} from '../../component/addDamages/utils';
import {colors} from '../../styles/base';
const FooterButton = (props) => (
  <View
    style={{
      flexDirection: 'row',
      width: 170,
      justifyContent: 'space-between',
      alignSelf: 'center',
    }}>
    <TextButton
      backgroundColor={colors.purpleButton}
      title={'SKIP'}
      onPress={() => {
        props._onCLickSubmitOrSkipButton(false);
      }}
    />
    <TextButton
      backgroundColor={colors.greenButton}
      title={'SUBMIT'}
      onPress={() => {
        props._onCLickSubmitOrSkipButton(true);
      }}
    />
  </View>
);

const Header = (props) => {
  const screenData = useScreenDimensions();
  const {title, description} = props;
  return (
    <View>
      {screenData.isLandscape ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/logo_dark.png')}
          />
          <UserStepsView currentStepString={'2'} isSupportLandscape={true} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/logo_dark.png')}
          />
          <UserStepsView currentStepString={'2'} />
        </View>
      )}

      <View style={{height: 0.5, backgroundColor: '#DDDDDD'}}></View>
    </View>
  );
};

function TableView(props) {
  const screenData = useScreenDimensions();

  const screenWidth = screenData.width;
  const screenHeight = screenData.height;

  const marginLeftRight = 50;

  const {
    data,
    onSkipOrSubmit = () => {},
    title,
    description,
    sessionID,
  } = props;
  const [dataTable, setDataTable] = useState({});

  const mode = {
    DISCLOSURES: 'DISCLOSURES',
    ANNOUNCEMENTS: 'ANNOUNCEMENTS',
  };

  const _callApiUpdateDisclosureAnnouncement = (isSubmit) => {
    const formData = new FormData();

    var rawData = isSubmit ? dataTable : {};

    formData.append('session_key', sessionID);

    if (!isSubmit) {
      formData.append('user_choice', 'skip');
    }

    var path = title.toLowerCase();

    switch (title) {
      case mode.DISCLOSURES: {
        let result = DataSubmitDisclosure(rawData);
        formData.append('disclosures', JSON.stringify(result));
        Logger(result);
        break;
      }

      case mode.ANNOUNCEMENTS: {
        Logger(rawData);
        let result = DataSubmitAnnouncement(rawData);

        Logger(result);

        formData.append('announcements', JSON.stringify(result));
        break;
      }
      default:
        break;
    }

    var requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    fetch(REACT_APP_BASE_URL + path, requestOptions)
      .then((response) => response.text())
      .then((result) => Logger('result', result))
      .catch((error) => Logger('error', error));
  };

  useEffect(() => {
    // Logger(dataTable);
  }, [dataTable]);

  const MainTitleView = (text) => {
    const styles = StyleSheet.create({
      MainTitle: {
        backgroundColor: '#F9FAFC',
        width: screenWidth - marginLeftRight,
        height: 45,
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        flexDirection: 'row',
        flex: 10,
      },
      TitleText: {
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'center',
      },
      iconDropDown: {
        height: 17,
        width: 17,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex: 1,
      },
    });

    return (
      <View style={styles.MainTitle}>
        <View style={{flex: 9, justifyContent: 'center'}}>
          <Text style={styles.TitleText}>{text.replace('_', ' ')}</Text>
        </View>
        <Image
          style={styles.iconDropDown}
          source={require('../../assets/ic_down_arrow.png')}
        />
      </View>
    );
  };

  const SecondTitleView = (value) => {
    let styles = StyleSheet.create({
      SecondTitleContainer: {
        backgroundColor: 'white',
        width: screenWidth - marginLeftRight,
        height: 40,
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
      },
      titleText: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 20,
      },
      description: {
        width: screenWidth - marginLeftRight,
        borderWidth: 0.5,
        borderColor: '#EBEBEB',
        padding: 10,
        backgroundColor: 'white',
      },
      iconDropDown: {
        height: 17,
        width: 17,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex: 1,
      },

      inputType: {},
    });

    const key = `${value.label}`
      .toUpperCase()
      .replace(/ /g, '_')
      .replace(/'/g, '')
      .replace(/\//g, '_')
      .replace(/-/g, '');

    // Logger(key);

    function onValueChange(keyDeclaration, val) {
      dataTable[keyDeclaration] = val;

      Logger(keyDeclaration, val);
    }

    return (
      <Collapse key={key}>
        <CollapseHeader>
          <View style={styles.SecondTitleContainer}>
            <View style={{flex: 9, justifyContent: 'center'}}>
              <Text style={styles.titleText}>{value.label}</Text>
            </View>
            <Image
              style={styles.iconDropDown}
              source={require('../../assets/ic_down_arrow.png')}
            />
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.description}>
            <Text>{value.description}</Text>
            {/* <Text>{value.input_type}</Text> */}

            {value.input_type === 'button' || value.input_type === 'boolean' ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                {ButtonTypeView(
                  key,
                  onValueChange,
                  title === mode.ANNOUNCEMENTS,
                )}
              </View>
            ) : null}

            {value.input_type === 'checkbox' ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                {CheckBoxListView(
                  value.list,
                  dataTable[key],
                  key,
                  onValueChange,
                )}
              </View>
            ) : null}

            {value.input_type === 'radio' ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                {RadioListView(value.list, dataTable[key], key, onValueChange)}
              </View>
            ) : null}

            {['text', 'date-number', 'number'].indexOf(value.input_type) >=
            0 ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                {TextInputView(value.input_type, key, onValueChange)}
              </View>
            ) : null}
          </View>
        </CollapseBody>
      </Collapse>
    );
  };

  function _rendingTable(dataShow) {
    return Object.entries(dataShow).map(([key, value]) => {
      return (
        <Collapse
          key={`_${key}`}
          onToggle={() => {
            // console.log(key);
          }}>
          <CollapseHeader>{MainTitleView(key)}</CollapseHeader>
          <CollapseBody>
            <View>{value.map(SecondTitleView)}</View>
          </CollapseBody>
        </Collapse>
      );
    });
  }

  return (
    <View
      style={{
        marginTop: screenData.isLandscape
          ? 10
          : Platform.OS === 'ios'
          ? StatusBarHeight
          : 10,
        paddingHorizontal: 22,
      }}>
      <Header
        style={{left: marginLeftRight}}
        title={title}
        description={description}
      />
      <View
        style={{
          height: !screenData.isLandscape
            ? Platform.OS === 'ios'
              ? screenData.height - StatusBarHeight - 140 - 50
              : screenData.height - StatusBarHeight - 140 - 100
            : screenData.height - 80 - 50,
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{height: 30, width: 200}}>
            <View
              style={{
                height: 5,
                backgroundColor: '#9EEACA',
                bottom: -15,
              }}></View>

            <Text
              style={{fontWeight: '700', fontSize: 20, position: 'absolute'}}>
              {title}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 13,
              color: 'gray',
              marginTop: 10,
              marginBottom: 15,
            }}>
            {description ?? ''}
          </Text>
          {_rendingTable(data)}
        </ScrollView>
      </View>
      <FooterButton
        style={{position: 'absolute'}}
        _onCLickSubmitOrSkipButton={(isSubmit) => {
          _callApiUpdateDisclosureAnnouncement(isSubmit);
          onSkipOrSubmit();
        }}
      />
    </View>
  );
}

const TableViewDeclaration = (props) => {
  // const [screenData, setsScreenData] = useState(useScreenDimensions());

  // const screenWidth = screenData.width;
  // const screenHeight = screenData.height;

  const {onDoneDeclaration, sessionID} = props;

  const sessionUpload = SessionUploadManager.getInstance().getSessionUpload(
    sessionID,
  );
  sessionUpload.setCheckDeclare(false);
  // console.log(sessionUpload);

  const dataDisclosure = require('../../assets/data/disclosures.json');

  function _parserDataAnnouncements() {
    const dataAnnouncement = require('../../assets/data/announcements.json');

    var result = {};

    Object.entries(dataAnnouncement).forEach(([key, value]) => {
      var keyValue = `${key}_PRESENT`;

      switch (key) {
        case 'OTHER': {
          keyValue = 'OTHER_ANNOUNCEMENTS';
          break;
        }

        case 'TYRES': {
          keyValue = 'RIMS_TYRES';
          break;
        }

        case 'KEYS': {
          keyValue = 'ALL_KEYS_PRESENT';
          break;
        }

        case 'REGISTRATION': {
          keyValue = 'TITLE_PRESENT';
          break;
        }
      }
      result[key] = [value[keyValue]];
    });

    return result;
  }

  const dataAnnouncement = _parserDataAnnouncements();

  const modeShow = {
    DISCLOSURES: 'DISCLOSURES',
    ANNOUNCEMENTS: 'ANNOUNCEMENTS',
  };

  const description = {
    DISCLOSURES:
      'In your jurisdiction you are responsible for the disclosure of any facts you may know about this vehicle, please select any of the following that apply.',
    ANNOUNCEMENTS:
      'Please fill out any of the following announcements that apply.',
  };

  const [modalVisibleAnnouncement, setModalVisibleAnnouncement] = useState(
    false,
  );

  function getModeData(mode) {
    switch (mode) {
      case modeShow.DISCLOSURES: {
        return (
          <TableView
            sessionID={sessionID}
            data={dataDisclosure}
            onSkipOrSubmit={() => {
              setModalVisibleAnnouncement(true);
            }}
            title={modeShow.DISCLOSURES}
            description={description.DISCLOSURES}
          />
        );
      }
      case modeShow.ANNOUNCEMENTS: {
        return (
          <TableView
            sessionID={sessionID}
            data={dataAnnouncement}
            title={modeShow.ANNOUNCEMENTS}
            description={description.ANNOUNCEMENTS}
            onSkipOrSubmit={() => {
              // setModalVisibleAnnouncement(true);

              const uploadChecker = SessionUploadManager.getInstance().getSessionUpload(
                sessionID,
              );
              uploadChecker.setCheckDeclare(true);

              EventBus.getInstance().fireEvent(
                'SESSION_UPLOAD_PHOTO',
                uploadChecker,
              );
              onDoneDeclaration();
            }}
          />
        );
      }

      default:
        null;
        break;
    }
  }

  return (
    <View>
      <Modal
        animationType="none"
        transparent={false}
        visible={!modalVisibleAnnouncement}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}>
        {getModeData(modeShow.DISCLOSURES)}
      </Modal>
      <Modal
        animationType="none"
        transparent={false}
        visible={modalVisibleAnnouncement}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}>
        {getModeData(modeShow.ANNOUNCEMENTS)}
      </Modal>
    </View>
  );
};

function TextButton(props) {
  const {title, backgroundColor} = props;

  return (
    <TouchableOpacity {...props} style={{}}>
      <View
        {...props}
        style={{
          height: 50,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 24,
          backgroundColor: backgroundColor,
          // flex: 2,
        }}>
        <Text style={{fontSize: 13, fontWeight: '400', color: 'white'}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageLogo: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
    marginLeft: 20,
    marginBottom: 10,
  },
});
export default TableViewDeclaration;
