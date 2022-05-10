import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TextInput,
} from 'react-native';

import NativeCall from '../../nativeCall/Native';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

import AppButton from '../../component/ui/appButton/AppButton';

const Header = (props) => (
  <View style={styles.containerHeader}>
    <Image
      style={{height: 50, width: 100, resizeMode: 'contain', left: 20}}
      source={require('../../assets/logo_dark.png')}
    />

    <TouchableOpacity onPress={() => _createAddSessionAlert({...props})}>
      <View>
        <Text style={{fontSize: 20, color: '#2F7AFF'}}>Add</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const _createDiscoverySessionAlert = (handleOKButton) =>
  Alert.alert(
    'Discovery Session',
    'Do you want to explore the session ?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleOKButton()},
    ],
    {cancelable: false},
  );

const _createAddSessionAlert = (props) =>
  Alert.alert(
    'Add New Session',
    'Do you want to create new session?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          props.actionAddSession();
        },
      },
    ],
    {cancelable: false},
  );

const _createGotoReportAlert = (handleOKButton) =>
  Alert.alert(
    'Report Session',
    'Do you want to view the report of session?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleOKButton()},
    ],
    {cancelable: false},
  );

const _createGotoUploadOptional = (handleOKButton) =>
  Alert.alert(
    'Upload Photo Vehicle',
    'Do you want to Upload Photo Vehicle?',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleOKButton()},
    ],
    {cancelable: false},
  );

const _createCaptureSessionAlert = (handleOKButton) =>
  Alert.alert(
    'Capture Session',
    'Do you want to capture vehicle of session?',
    [
      {
        text: 'Cancel',
        onPress: () => {
          // Logger('Cancel Pressed')
        },
        style: 'cancel',
      },
      {text: 'OK', onPress: handleOKButton},
    ],
    {cancelable: false},
  );

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingRight: 5,
    borderTopWidth: 0.3,
  },
  textIndex: {
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.7,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  captureButton: {
    height: 30,
    width: 30,
    backgroundColor: colors.greenButton,
    borderRadius: 5,
    tintColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {height: 30, width: 30, right: 0},
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    alignItems: 'center',
  },
});

const ManagementSessionView = (props) => {
  const screenData = useScreenDimensions();

  const [sessionList, setSessionList] = useState(['TSW-DRG1V1AQQR']);

  useEffect(() => {
    NativeCall.getSessionFromLocal().then((sessions) => {
      Logger(sessionList);
      const list = [...sessions.value].map((item) => item.sessionKey);

      // Logger(list);
      const merge = [...sessionList].concat(list);

      const set = new Set(merge);

      Logger(set);

      setSessionList(set);
    });
  }, []);

  const _createAndAddSession = () => {
    const _handleNewSession = (sessionKey) => {
      Logger(sessionKey);

      NativeCall.startSession(sessionKey).then((isSuccess) => {
        if (isSuccess) {
          setSessionList([...sessionList, sessionKey]);
        }
      });
    };

    NativeCall.createSession('abc').then((session) => {
      _handleNewSession(session.sessionKey);
      Logger(session);
    });
  };

  const [debugModalVisible, setDebugModalVisible] = useState({
    isVisible: false,
    sessionID: '',
  });

  const [inputSessionModalVisible, setInputSessionModalVisible] = useState(
    false,
  );

  const DebugInspectionResultModalView = (params) => {
    const {sessionID, isVisible} = params;

    const [response, setResponse] = useState('');

    const [responseText, setResponseText] = useState('');

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      if (isVisible) {
        NativeCall.getInspectionResult(sessionID).then((result) => {
          setResponse(JSON.stringify(result, null, 5));
          Logger(typeof result);
          let responseString = JSON.stringify(result);

          setResponseText(responseString);
        });
      }
    }, [sessionID]);
    return (
      <Modal visible={isVisible}>
        <View
          style={{
            width: screenData.width,
            height: screenData.height - 50,
            flexDirection: 'column',
          }}>
          <ScrollView>
            {editMode ? (
              <TextInput
                style={{
                  width: screenData.width - 50,
                  top: 100,
                  marginLeft: 10,
                }}
                value={responseText}
                multiline={true}
              />
            ) : (
              <Text
                style={{
                  width: screenData.width - 50,
                  top: 100,
                  marginLeft: 10,
                }}>
                {response}
              </Text>
            )}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <AppButton
              style={{bottom: 10, alignSelf: 'center'}}
              backgroundColor={colors.greenButton}
              label={!editMode ? 'EDIT' : 'VIEW'}
              onPress={() => {
                setEditMode(!editMode);
              }}
            />
            <AppButton
              style={{bottom: 10, alignSelf: 'center'}}
              backgroundColor={colors.purpleButton}
              label={'CLOSE'}
              onPress={() => {
                params.closeModal();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const InputSessionModelView = (props) => {
    const {isVisible, closeModal, addNewSession} = props;
    const [sessionIDInput, setSessionIDInput] = useState('');

    const _styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        margin: 0, // This is the important style you need to set full screen modal
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(1, 1, 1, 0.5)',
        height: screenData.height,
        width: screenData.width,
      },
    });

    return (
      <View style={{}}>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType="none"
          transparent={true}
          visible={isVisible}>
          <View style={_styles.centeredView}>
            <View
              style={{
                height: 200,
                width: screenData.width / 1.2,
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: 10,
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
                justifyContent: 'center',
              }}>
              <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 50}
                style={{}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    marginBottom: 14,
                    textAlign: 'center',
                  }}>
                  Please input your Session ID below
                </Text>

                <View style={{}}>
                  <View
                    style={{
                      backgroundColor: '#fafafa',
                      alignItems: 'center',
                      borderRadius: 5,
                      justifyContent: 'center',
                      height: 50,
                      width: screenData.width / 1.3,
                    }}>
                    <TextInput
                      style={{color: '#000', fontSize: 20}}
                      placeholderTextColor="gray"
                      autoCapitalize="characters"
                      numberOfLines={1}
                      onChangeText={(text) => {
                        setSessionIDInput(text);
                      }}
                      value={sessionIDInput}
                      placeholder={'XXX-xxxxxxx'}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: screenData.width / 1.3,
                }}>
                <AppButton
                  style={{marginRight: 10}}
                  backgroundColor={colors.purpleTransparent}
                  label={'CANCEL'}
                  onPress={() => {
                    closeModal();
                  }}
                />

                <AppButton
                  style={{marginLeft: 10}}
                  backgroundColor={colors.greenButton}
                  label={'OK'}
                  onPress={() => {
                    addNewSession(sessionIDInput);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Header actionAddSession={_createAndAddSession} />
      <DebugInspectionResultModalView
        isVisible={debugModalVisible.isVisible}
        sessionID={debugModalVisible.sessionID}
        closeModal={() => {
          setDebugModalVisible({
            isVisible: false,
            sessionID: '',
          });
        }}
      />
      <InputSessionModelView
        isVisible={inputSessionModalVisible}
        closeModal={() => {
          setInputSessionModalVisible(!inputSessionModalVisible);
        }}
        addNewSession={(session) => {
          setSessionList([...sessionList, session]);
          setInputSessionModalVisible(!inputSessionModalVisible);
        }}
      />
      <View>
        <ScrollView style={{height: screenData.height - 150}}>
          {sessionList.length === 0 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, marginTop: 100, opacity: 0.5}}>
                Click to add a new session
              </Text>
            </View>
          ) : (
            [...sessionList, ''].map((session, index) => {
              if (session === '') {
                return (
                  <View
                    style={{
                      padding: 10,
                      margin: 10,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderStyle: 'dashed',
                    }}
                    key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        setInputSessionModalVisible(!inputSessionModalVisible);
                      }}>
                      <Image
                        style={{height: 30, width: 30, alignSelf: 'center'}}
                        source={require('../../assets/icon-plus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                );
              } else
                return (
                  <View style={styles.container} key={index}>
                    <Text style={styles.textIndex}>{`#${index}`}</Text>
                    <TouchableOpacity
                      style={{height: 30, width: 150}}
                      onLongPress={() => {
                        setDebugModalVisible({
                          isVisible: true,
                          sessionID: session,
                        });
                      }}
                      onPress={() =>
                        _createDiscoverySessionAlert(() => {
                          props.navigation.navigate('Pave Discovery', {
                            session,
                          });
                        })
                      }>
                      <Text
                        style={{fontSize: 15, fontWeight: '500', opacity: 0.7}}>
                        {session}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.containerButton}>
                      <ImageButton
                        style={styles.captureButton}
                        onPress={() =>
                          _createCaptureSessionAlert(() => {
                            props.navigation.navigate('Pave Capture', {
                              session,
                            });
                          })
                        }
                        source={require('../../assets/icon-camera.png')}
                      />
                      <ImageButton
                        onPress={() =>
                          _createGotoReportAlert(() => {
                            props.navigation.navigate('Report Damage', {
                              session,
                            });
                          })
                        }
                        style={styles.button}
                        source={require('../../assets/icon-report.png')}
                      />

                      <ImageButton
                        onPress={() =>
                          _createGotoUploadOptional(() => {
                            props.navigation.navigate('Upload Photo Optional', {
                              session,
                            });
                          })
                        }
                        style={styles.button}
                        source={require('../../assets/icon-add-file.png')}
                      />
                    </View>
                  </View>
                );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const ImageButton = (props) => {
  return (
    <TouchableOpacity {...props}>
      <View {...props}>
        <Image {...props} />
      </View>
    </TouchableOpacity>
  );
};

export default ManagementSessionView;
