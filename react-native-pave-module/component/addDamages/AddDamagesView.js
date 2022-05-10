/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {
  AUTHORIZATION_TOKEN,
  REACT_APP_AGENT_BASE_TASK_URL,
  CAPTURE_BASE_URL,
} from '../../constants/index';
import PropTypes from 'prop-types';
import AppButton from '../ui/appButton/AppButton';
import {
  StatusBarHeight,
  callApiGetDamagesList,
  getDamageTypeListInDamagesList,
  getDamageTypeList,
} from './utils.js';
import {Svg, G, Path} from 'react-native-svg';
import RNPickerSelect from 'react-native-picker-select';
import {Logger} from '../../utils/AppLogger';
import Loader from './loader.js';
import {colors} from '../../styles/base';

var screenWidth = Math.round(Dimensions.get('window').width);
var screenHeight = Math.round(Dimensions.get('window').height);

var originalImageRatio = 1920 / 1080;

var parseString = require('react-native-xml2js').parseString;

const AddDamagesView = forwardRef((props, ref) => {
  const childRef = useRef();
  Logger('AddDamagesView props', props);
  screenWidth = Math.round(Dimensions.get('window').width);
  screenHeight = Math.round(Dimensions.get('window').height);

  AddDamagesView.propTypes = {
    vehicleSeriesNme: PropTypes.string.isRequired,
    sessionKey: PropTypes.string.isRequired,
    taskId: PropTypes.string.isRequired,
    cageX: PropTypes.number.isRequired,
    cageY: PropTypes.number.isRequired,
    cageHeight: PropTypes.number.isRequired,
    cageWidth: PropTypes.number.isRequired,
    actualImageHeight: PropTypes.number.isRequired,
    actualImageWidth: PropTypes.number.isRequired,
    originalImageWidth: PropTypes.number.isRequired,
    originalImageHeight: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    svgUrl: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  AddDamagesView.defaultProps = {
    sessionKey: () => Logger('sessionKey is missing!'),
    taskId: () => Logger('taskId is missing!'),
    cageX: 0,
    cageY: 0,
    cageHeight: 0,
    cageWidth: 0,
    actualImageWidth: 0,
    actualImageHeight: 0,
    originalImageWidth: 0,
    originalImageHeight: 0,
    imgUrl: () => Logger('imgUrl is empty'),
    svgUrl: () => Logger('svgUrl is empty'),
  };

  var cageRatio = props.cageWidth / props.cageHeight;
  const [pathsValue, setPathsValue] = useState(null);
  const [containerWidthValue, setContainerWidthValue] = useState(0);
  const [containerHeightValue, setContainerHeightValue] = useState(0);
  const [numberOfDamages, setNumberOfDamagesValue] = useState(0);

  useEffect(() => {
    originalImageRatio = props.originalImageWidth / props.originalImageHeight;
    Dimensions.addEventListener('change', () => {
      screenWidth = Math.round(Dimensions.get('window').width);
      screenHeight = Math.round(Dimensions.get('window').height);
    });

    fetch(props?.svgUrl, {
      credentials: 'omit',
      headers: {
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      // referrer:
      //   'https://capture-dev.paveapi.com/TMV-AN2IZUAK8E/result/adddamages',
      method: 'GET',
      mode: 'cors',
    })
      .then((response) => response.text())
      .then((result) => {
        parseString(result, function (_err, result) {
          setPathsValue(result); // svg object
        });
      });
    return () => {};
  }, []);

  // Logger({screenWidth, screenHeight});
  var unixTimeString = Math.round(new Date().getTime() / 1000);
  return (
    <View>
      <ScrollView vertical>
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            // alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              aspectRatio: originalImageRatio,
            }}>
            <Image
              onLayout={(event) => {
                setContainerWidthValue(event.nativeEvent.layout.width);
                setContainerHeightValue(event.nativeEvent.layout.height);
              }}
              style={{
                aspectRatio: originalImageRatio,
                width: screenWidth,
                height: screenHeight,
                // resizeMode: 'cover',
              }}
              source={{
                uri: props.imgUrl + '?' + unixTimeString,
              }}
              // onLoadStart={() => childRef?.current?.toggleLoading()}
              // onLoadEnd={() => childRef?.current?.toggleLoading()}
            />
          </View>

          <View
            style={{
              width: containerWidthValue,
              height: containerHeightValue,
              position: 'absolute',
            }}>
            <CageView
              {...props}
              ref={childRef}
              // taskId={props.taskId}
              // cageX={props.cageX}
              // cageY={props.cageY}
              // cageHeight={props.cageHeight}
              // cageWidth={props.cageWidth}
              // actualImageHeight={props.actualImageHeight}
              // actualImageWidth={props.actualImageWidth}
              containerWidthValue={containerWidthValue}
              containerHeightValue={containerHeightValue}
              // originalImageHeight={props.originalImageHeight}
              // originalImageWidth={props.originalImageWidth}
              cageRatio={cageRatio}
              svgObject={pathsValue}
              setNumberOfDamagesValue={(numbers) =>
                setNumberOfDamagesValue(numbers)
              }
              // closeModal={props.closeModal}
              // hideChooseDamageTypeModal={() => setEditModalVisible(false)}
              // showChooseDamageTypeModal={() => setEditModalVisible(true)}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 50,
          alignSelf: 'flex-end',
          flexDirection: 'row',
        }}>
        <AppButton
          backgroundColor={colors.purpleButton}
          label={'CANCEL'}
          onPress={() => {
            props?.closeModal();
          }}
        />
        <View style={{width: 10}} />
        <AppButton
          backgroundColor={colors.greenButton}
          label={'CONFIRM'}
          onPress={() => {
            childRef.current.callApiAddDamage();

            // props.closeModal();
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          // Logger(childRef.current.getNumbersOfDamages());
          if (childRef?.current?.getNumbersOfDamages() > 0) {
            childRef?.current?.setDamagesListModalVisible();
          }
        }}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            elevation: 4,
            height: 50,
            backgroundColor: colors.greenButton,
            borderRadius: 40,
            top: 30,
            right: 50,
            position: 'absolute',
          },
        ]}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {numberOfDamages ?? 0}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const CageView = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [chooseDamageTypeModalVisible, setEditModalVisible] = useState(false);
  const [damagesListModalVisible, setDamagesListModalVisible] = useState(false);
  const [selectedDamageType, setSelectedDamageType] = useState('');
  const [selectedGradeScore, setSelectedGradeScore] = useState(-1);
  const [selectedDamage, setSelectedDamage] = useState(null);

  const [newDetectedDamages, setNewDetectedDamages] = useState([
    {
      damage_group: '',
      component: '',
      damage_type: '',
      damage_location: {x: 0, y: 0},
      damage_location_render: {x: 0, y: 0},
      original_image: {
        width: 0,
        height: 0,
      },
      actual_image: {
        width: 0,
        height: 0,
      },
      grade_score: 0,
    },
  ]);
  const [selectedToDeleteArray, setSelectedToDeleteArray] = useState([]);
  const [chooseDamageTypeList, setChooseDamageTypeList] = useState([]);
  let selectedDamageDetail = {};
  let damageTypeList = [];
  const [allDamagesType, setAllDamagesType] = useState([]);

  useImperativeHandle(ref, () => ({
    callApiAddDamage() {
      setLoading(true);
      callApiAddDamage(newDetectedDamages);
      // alert(JSON.stringify({detected_damages: newDetectedDamages}));
    },

    showChooseDamageTypeDialog() {
      alert('show choose damges dialog');
    },

    getSelectedDamageComponent() {
      return selectedDamageComponent;
    },
    getNewDamagesList() {
      return newDetectedDamages;
    },

    getNumbersOfDamages() {
      return newDetectedDamages?.filter((item) => item?.component !== '')
        .length;
    },

    setDamagesListModalVisible() {
      setDamagesListModalVisible(!damagesListModalVisible);
    },

    toggleLoading() {
      setLoading(!loading);
    },
  }));
  var widthRatio = screenWidth / props.actualImageWidth;
  var heightRatio = screenHeight / props.actualImageHeight;
  var emptySpace =
    (screenWidth - props.containerWidthValue - StatusBarHeight) * widthRatio;

  if (!props.svgObject) {
    return <View />;
  }
  var selectedDamageComponent = '';

  let svgPath = props.svgObject.svg.g[0].path;

  function callApiAddDamage(data) {
    setLoading(true);
    const requestData = data?.filter((item) => item.component !== '');
    Logger('callApiAddDamage request ====> ', requestData);
    Logger('props.taskId request ====> ', props.taskId);
    Logger(
      'callApiAddDamage JSON request ====> ',
      JSON.stringify({detected_damages: requestData, synchronize: true}),
    );
    Logger('requestData.length', requestData.length);
    fetch(REACT_APP_AGENT_BASE_TASK_URL(props.taskId), {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: AUTHORIZATION_TOKEN,
      },
      referrer: CAPTURE_BASE_URL + props.sessionKey + '/result/adddamages?=',
      body: JSON.stringify({detected_damages: requestData, synchronize: true}),
      method: 'PUT',
    })
      .then((response) => response.text())
      .then((result) => {
        Logger('callApiAddDamage result', JSON.parse(result));
        const res = JSON.parse(result);
        if (res.success) {
          props.closeModal();
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        Logger('error', err);
        setLoading(false);
      });
  }

  const paths = [...svgPath]
    .map((path) => {
      return path.$;
    })
    .map((path, index) => {
      return (
        <Path
          key={index}
          d={path.d}
          dataName={path['data-name']}
          fill={path.fill}
          group={path.group}
          id={path.id}
          stroke={path.stroke}
          strokeWidth={path['stroke-width']}
          transform={path.transform}
          onPress={(evt) => {
            if (path.group === 'TIRE') {
              return;
            }
            // setLoading(true);
            setAllDamagesType([]);
            setSelectedDamage(null);

            // CALCULATE FOR MOBILE
            let render_damageX =
              evt.nativeEvent.locationX +
              (props.cageX * widthRatio - emptySpace);
            let render_damageY =
              evt.nativeEvent.locationY + props.cageY * heightRatio;
            // CALCULATE FOR BACKEND
            var ratioX = props.originalImageWidth / props.containerWidthValue;
            var ratioY = props.originalImageHeight / props.containerHeightValue;

            let damageX = render_damageX * ratioX;
            let damageY = render_damageY * ratioY;

            // Logger('ratioX, ratioY, damageX, damageY');
            // Logger(`${ratioX} ${ratioY} ${damageX} ${damageY}`);

            const newDamage = {
              damage_group: path.group,
              component: path['data-name'],
              damage_type: '',
              damage_location: {
                x: damageX.toFixed(),
                y: damageY.toFixed(),
              },
              damage_location_render: {
                x: render_damageX.toFixed(),
                y: render_damageY.toFixed(),
              },
              original_image: {
                width: props.originalImageWidth,
                height: props.originalImageHeight,
              },
              actual_image: {
                width: props.originalImageWidth,
                height: props.originalImageHeight,
              },
              grade_score: -1,
              isSelected: false,
            };

            setSelectedDamage(newDamage);

            ////////////////////////////////////////////////////////////////
            /////////////////// GET DAMAGE TYPE LIST ///////////////////////
            ////////////////////////////////////////////////////////////////

            damageTypeList = getDamageTypeList(newDamage.damage_group);
            setChooseDamageTypeList(damageTypeList);
            setEditModalVisible(!chooseDamageTypeModalVisible);
          }}
        />
      );
    });

  searchFilterFunction = (text) => {
    // Logger(text);
    // Logger('allDamagesTypeeeee', allDamagesType);
    // FIND SELECTED DAMAGE BY DAMAGE
    const newData = allDamagesType.find((item) => {
      // Logger('item find', item);
      return text === item.damage_name;
    });
    selectedDamageDetail = newData;
    Logger('selectedDamageDetail', selectedDamageDetail);
    // MERGE DATA OF selectedDamageDetail and selectedDamage
    setSelectedDamage({...selectedDamage, ...selectedDamageDetail});
    // Logger('selectedDamage', selectedDamage);
  };

  const NewDamageItemView = ({item, index}) => {
    useEffect(() => {}, [item]);
    return (
      <TouchableOpacity
        onPress={() => {
          onPressNewDamageItem(item, index);
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            width: screenWidth / 1.6,
            marginBottom: 5,
            borderWidth: 1,
            padding: 4,
            backgroundColor: item.isSelected === true ? 'red' : 'white',
            borderColor: 'rgba(000, 000, 000, 0.25)',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              height: 30,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                padding: 5,
                fontWeight: 'bold',
              }}>
              {item?.component === '' ? 'Not yet defined' : item?.component}
            </Text>
          </View>
          <View style={{width: 10}} />
          <View
            style={{
              backgroundColor: 'red',
              height: 30,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                padding: 5,
                fontWeight: 'bold',
              }}>
              {item?.damage_type === '' ? 'Not yet defined' : item?.damage_type}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  function onPressNewDamageItem(item, index) {
    if (!item.isSelected) {
      newDetectedDamages[index].isSelected = true;
      item.isSelected = true;
      const items = [...newDetectedDamages];
      const indexx = items.findIndex((x) => x === item);
      items[indexx] = item;
      setNewDetectedDamages(items);
      setDamagesListModalVisible(true);
    } else {
      newDetectedDamages[index].isSelected = false;
      item.isSelected = false;
      const items = [...newDetectedDamages];
      const indexx = items.findIndex((x) => x === item);
      items[indexx] = item;

      setNewDetectedDamages(items);
      setDamagesListModalVisible(true);
    }
    props.setNumberOfDamagesValue(
      newDetectedDamages.filter((item) => item.component !== '').length,
    );
    Logger('onPressNewDamageItem', item.isSelected);
  }

  function onPressDeleteButton() {
    Logger('newDetectedDamages >>>>>>>>>>>>>>', newDetectedDamages);
    var list = [...newDetectedDamages];

    let newList = list.filter((item) => !item.isSelected);

    setNewDetectedDamages(newList);

    if (newList.length === 0) {
      setNewDetectedDamages([
        {
          damage_group: '',
          component: '',
          damage_type: '',
          damage_location: {x: 0, y: 0},
          original_image: {
            width: 0,
            height: 0,
          },
          actual_image: {
            width: 0,
            height: 0,
          },
          grade_score: 0,
        },
      ]);
    }

    setDamagesListModalVisible(!damagesListModalVisible);

    //set numbers of items to parent
    props.setNumberOfDamagesValue(newList.length);
  }

  return (
    <View>
      <Modal
        supportedOrientations={['landscape']}
        animationType="fade"
        transparent={true}
        visible={damagesListModalVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        onRequestClose={() => {
          // alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: screenHeight / 1.5,
              width: screenWidth / 1.5,
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 15,
              alignItems: 'flex-start',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderColor: 'gray',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  marginBottom: 14,
                  textAlign: 'left',
                }}>
                List Damages
              </Text>
            </View>

            <ScrollView vertical>
              <FlatList
                style={{paddingBottom: 5, paddingTop: 10}}
                data={newDetectedDamages}
                keyExtractor={(y, z) => z.toString()}
                renderItem={({item, index}) => (
                  <NewDamageItemView item={item} index={index} />
                )}
              />
              {/* {newDetectedDamages.map((item, index) => {
                return <NewDamageItemView item={item} index={index} />;
              })} */}
            </ScrollView>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <TouchableHighlight
                style={{
                  ...styles.cancelButton,
                  backgroundColor: colors.purpleButton,

                  margin: 5,
                }}
                onPress={() => {
                  //reset data
                  setDamagesListModalVisible(!damagesListModalVisible);
                  props.setNumberOfDamagesValue(
                    newDetectedDamages?.filter((item) => item.component !== '')
                      .length,
                  );
                }}>
                <Text
                  style={[
                    {paddingRight: 10, paddingLeft: 10},
                    styles.textStyle,
                  ]}>
                  CLOSE
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.cancelButton,
                  backgroundColor: 'red',
                  alignSelf: 'flex-end',

                  margin: 5,
                }}
                onPress={() => {
                  onPressDeleteButton();
                }}>
                <Text
                  style={[
                    {paddingRight: 10, paddingLeft: 10},
                    styles.textStyle,
                  ]}>
                  DELETE
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        supportedOrientations={['landscape']}
        animationType="fade"
        transparent={true}
        visible={chooseDamageTypeModalVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        onRequestClose={() => {
          // alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: screenHeight / 1.5,
              width: screenWidth / 1.5,
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 15,
              alignItems: 'flex-start',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                flexDirection: 'column',
                alignSelf: 'flex-start',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
              }}>
              <Text style={{fontSize: 24, margin: 20, textAlign: 'left'}}>
                Choose Damage
              </Text>
              <View
                style={{
                  backgroundColor: 'gray',
                  marginBottom: 20,
                  marginLeft: 20,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    padding: 5,
                    fontWeight: 'bold',
                  }}>
                  {selectedDamage?.component ?? ''}
                </Text>
              </View>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                value={selectedDamageType}
                onValueChange={(value, index) => {
                  if (value !== null) {
                    Logger(
                      'onValueChange ',
                      index + '---- ' + value.toUpperCase(),
                    );
                    setSelectedDamageType(value);
                    setSelectedGradeScore(
                      chooseDamageTypeList[index]?.grade_score ?? -1,
                    );
                    Logger(
                      'onValueChange grade_score ',
                      chooseDamageTypeList[index]?.grade_score ?? -1,
                    );

                    searchFilterFunction(value);
                  }
                }}
                items={chooseDamageTypeList}
                style={pickerSelectStyles}
                placeholder={placeholder}
                Icon={() => {
                  return (
                    <View
                      style={{
                        marginTop: 20,
                        marginEnd: 10,
                        backgroundColor: 'transparent',
                        borderTopWidth: 8,
                        borderTopColor: 'gray',
                        borderRightWidth: 8,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 8,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
              />
              <View style={{height: 20}} />
              <View style={{flexDirection: 'row', marginLeft: 100}}>
                <TouchableHighlight
                  style={{
                    ...styles.cancelButton,
                    backgroundColor: colors.purpleButton,
                    flex: 1,
                  }}
                  onPress={() => {
                    //reset data
                    setEditModalVisible(!chooseDamageTypeModalVisible);
                    setSelectedDamageType('');
                    setSelectedDamage(null);
                    setSelectedGradeScore(-1);
                    setEditModalVisible(!chooseDamageTypeModalVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                <View style={{width: 20}} />
                <TouchableHighlight
                  style={{
                    ...styles.cancelButton,
                    backgroundColor: colors.greenButton,
                    flex: 1,
                  }}
                  onPress={() => {
                    props.setNumberOfDamagesValue(
                      newDetectedDamages?.filter(
                        (item) => item.component !== '',
                      ).length,
                    );
                    if (selectedDamageType === '') {
                      return;
                    }
                    const selectedDamage2 = selectedDamage;
                    selectedDamage2.damage_type = selectedDamageType;
                    selectedDamage2.grade_score = selectedGradeScore;

                    // console.log('selectedDamage2', selectedDamage2);
                    const newArray2 = [...newDetectedDamages, selectedDamage2];
                    const newArray3 = newArray2?.filter(
                      (item) => item.component !== '',
                    );
                    //reset data
                    setNewDetectedDamages(newArray3);
                    setSelectedDamageType('');
                    setSelectedDamage(null);
                    setSelectedGradeScore(-1);

                    //set numbers of items to parent

                    setEditModalVisible(!chooseDamageTypeModalVisible);
                    props.setNumberOfDamagesValue(
                      newDetectedDamages?.filter(
                        (item) => item.component !== '',
                      ).length,
                    );
                  }}>
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Svg
        width={props.cageWidth * widthRatio}
        height={props.cageHeight * heightRatio}
        viewBox={props.svgObject.svg.$.viewBox}
        style={{
          // opacity: 0.7,
          opacity: 0.0,
          left: props.cageX * widthRatio - emptySpace,
          top: props.cageY * heightRatio,
        }}>
        <G children={paths} dataName="1-cage" id="1-cage" />
      </Svg>
      {newDetectedDamages
        ?.filter((item) => item != null)
        .map((item) => {
          Logger('newDetectedDamages', newDetectedDamages);
          props.setNumberOfDamagesValue(
            newDetectedDamages?.filter((_item) => _item.component !== '')
              .length,
          );
          return item?.component === '' ? (
            <View key={item} />
          ) : (
            <View
              key={item}
              style={{
                alignItems: 'center',
                top: item?.damage_location_render?.y - 11,
                left: item?.damage_location_render?.x - 11,
                position: 'absolute',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 111,
                  borderWidth: 6,
                  borderColor: item?.component === '' ? 'transparent' : 'red',
                }}
              />
              <View
                style={{
                  marginLeft: 0,
                  justifyContent: 'center',
                  height: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                }}>
                <Text
                  style={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  {item?.damage_type ?? ''}
                </Text>
              </View>
            </View>
          );
        })}
      <Loader loading={loading} />
    </View>
  );
});

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 0,
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    height: screenHeight / 1.6,
    width: screenWidth / 2,
    // margin: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'flex-start',
  },
  cancelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#9EA0A4',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginLeft: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#9EA0A4',
    borderRadius: 8,
    width: screenWidth / 1.7,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20,
  },
});
const placeholder = {
  label: 'Choose damage type ...',
  value: null,
  color: '#9EA0A4',
};
export default AddDamagesView;
