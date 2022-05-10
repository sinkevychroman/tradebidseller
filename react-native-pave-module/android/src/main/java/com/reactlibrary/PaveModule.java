package com.reactlibrary;

import android.util.Log;


import com.discoveryloft.pavesdk.PaveSdkManager;
import com.discoveryloft.pavesdk.data.session.SessionDTO;
import com.discoveryloft.pavesdk.domain.entity.InspectionResult;
import com.discoveryloft.pavesdk.domain.entity.SessionInfo;
import com.discoveryloft.pavesdk.service.createNewSessionWithVehicle.CreateNewSessionWithVehicleRequest;
import com.discoveryloft.pavesdk.service.createNewSessionWithVehicle.CreateNewSessionWithVehicleResponse;
import com.discoveryloft.pavesdk.service.getInspectionDetails.GetInspectionDetailsResponse;
import com.discoveryloft.pavesdk.service.getInspectionProgress.GetInspectionProgressResponse;
import com.discoveryloft.pavesdk.service.getReportDamage.GetReportDamageResponse;
import com.discoveryloft.pavesdk.service.getSessionProgress.GetSessionProgressResponse;
import com.discoveryloft.pavesdk.service.inputOdom.InputOdomResponse;
import com.discoveryloft.pavesdk.service.inputVinCode.InputVinCodeResponse;
import com.discoveryloft.pavesdk.service.startSession.StartSessionResponse;
import com.discoveryloft.pavesdk.service.stopSession.StopSessionResponse;
import com.discoveryloft.pavesdk.service.uploadSessionPhoto.UploadSessionPhotoResponse;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.reactlibrary.data.CreateSessionWithVehicleRNO;
import com.reactlibrary.data.InspectionDetailRNO;
import com.reactlibrary.data.InspectionProgressRNO;
import com.reactlibrary.data.ReportDamageRNO;
import com.reactlibrary.data.SessionListRNO;
import com.reactlibrary.data.SessionRNO;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class PaveModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static final String TAG = "PaveModule";

    public PaveModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        PaveSdkManager.getInstance().setContext(reactContext);
        PaveSdkManager.getInstance().createDb();
    }

    @Override
    public String getName() {
        return "PaveModule";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }

    @ReactMethod
    public void initializeWithKey(String apiKey) {
        Log.d(TAG, "initializeWithKey");
        PaveSdkManager.getInstance().setApiKey(apiKey);
    }

    @ReactMethod
    public void generateSession(final Callback callBack) {
        Log.d(TAG, "generateSessionUseCase: ");
        PaveSdkManager.getInstance().generateSession(new PaveSdkManager.CallBack<SessionInfo>() {
            @Override
            public void onSuccess(SessionInfo sessionInfo) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(sessionInfo);
                    Log.d(TAG, "onResult: SessionInfo " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
                callBack.invoke("", true);
            }
        });
    }

    @ReactMethod
    public void createSession(String url, final Callback callback) {
        PaveSdkManager.getInstance().createSessionWithRedirectUrl(url, new PaveSdkManager.CallBack<SessionInfo>() {
            @Override
            public void onSuccess(SessionInfo sessionInfo) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(sessionInfo);
                    Log.d(TAG, "onResult: SessionInfo " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                callback.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
//                 callback.invoke("", true); //TODO check bug.
            }
        });
    }

    @ReactMethod
    public void createSessionWithVehicle(String vinCode, String modelYear, String vehicleMake, String vehicleModel,
                                         String vehicleBodyStyle, String vehicleTrim, String vehicleTransmission, String vehicleExteriorColor,
                                         String vehicleInteriorColor, String odomReading, String odomUnit, final Callback callback) {

        CreateNewSessionWithVehicleRequest.Vehicle vehicle = new CreateNewSessionWithVehicleRequest.Vehicle();
        vehicle.setVin(vinCode);
        vehicle.setModelYear(modelYear);
        vehicle.setVehicleMake(vehicleMake);
        vehicle.setVehicleModel(vehicleModel);
        vehicle.setVehicleBodystyle(vehicleBodyStyle);
        vehicle.setVehicleTrim(vehicleTrim);
        vehicle.setVehicleTransmission(vehicleTransmission);
        vehicle.setVehicleExteriorColor(vehicleExteriorColor);
        vehicle.setVehicleInteriorColor(vehicleInteriorColor);
        vehicle.setOdomReading(Integer.valueOf(odomReading));
        vehicle.setOdomUnit(odomUnit);

        PaveSdkManager.getInstance().createSessionWithVehicle(vehicle,
                new PaveSdkManager.CallBack<CreateNewSessionWithVehicleResponse>() {
                    @Override
                    public void onSuccess(CreateNewSessionWithVehicleResponse response) {
                        CreateSessionWithVehicleRNO createSessionWithVehicleRNO = new CreateSessionWithVehicleRNO();
                        createSessionWithVehicleRNO.setSessionKey(response.getSessionKey());
                        createSessionWithVehicleRNO.setId(String.valueOf(response.getId()));
                        createSessionWithVehicleRNO.setStatus(response.getStatus());
                        createSessionWithVehicleRNO.setActive(response.getActive());
                        createSessionWithVehicleRNO.setRedirectURL(response.getRedirectUrl());
                        createSessionWithVehicleRNO.setTheme(response.getTheme());

                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            String jsonInString = new Gson().toJson(createSessionWithVehicleRNO);
                            Log.d(TAG, "onResult: createNewSessionWithVehicleResponse " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callback.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callback.invoke("", true);
                    }
                });
    }

    /*************************
     * x********************************** START SESSION **********************
     **********************************************************/
    // @ReactMethod
    // public void startSession(final Callback callBack) {
    // Log.d(TAG, "startSessionBySessionKey: ");
    //
    // PaveSdkManager.getInstance().startSession(new
    // PaveSdkManager.CallBack<StartSessionResponse>() {
    // @Override
    // public void onSuccess(StartSessionResponse response) {
    // WritableMap writableMap = new WritableNativeMap();
    // try {
    // String jsonInString = new Gson().toJson(response);
    // Log.d(TAG, "onResult: StartSessionResponse " + jsonInString);
    // JSONObject mJSONObject = new JSONObject(jsonInString);
    // writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
    // } catch (JSONException e) {
    // e.printStackTrace();
    // }
    // callBack.invoke(writableMap, false);
    // }
    //
    // @Override
    // public void onFailure(String error) {
    // callBack.invoke("", true);
    // }
    // });
    // }
    @ReactMethod
    public void startSession(String sessionKey, final Callback callBack) {
        Log.d(TAG, "startSessionBySessionKey: " + sessionKey);

        PaveSdkManager.getInstance().startSessionBySessionKey(sessionKey,
                new PaveSdkManager.CallBack<StartSessionResponse>() {
                    @Override
                    public void onSuccess(StartSessionResponse response) {
                        callBack.invoke(true, false);
                    }

                    @Override
                    public void onFailure(String error) {
                        callBack.invoke(false, true);
                    }
                });
    }

    /***********************************************************
     ****************** GET INSPECTION PROGRESS ***************
     ***********************************************************/
    @ReactMethod
    public void getInspectionDetails(final Callback callBack) {
        Log.d(TAG, "getInspectionDetails: ");
        PaveSdkManager.getInstance().getInspectionDetails(new PaveSdkManager.CallBack<GetInspectionDetailsResponse>() {
            @Override
            public void onSuccess(GetInspectionDetailsResponse response) {
                InspectionDetailRNO inspectionDetailRNO = InspectionDetailRNO.parseResponseToDataRNO(response);
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(inspectionDetailRNO);
                    Log.d(TAG, "onResult: getInspectionDetailsResponse " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
                callBack.invoke("", true);
            }
        });
    }

    @ReactMethod
    public void getInspectionDetails(String sessionKey, final Callback callBack) {
        Log.d(TAG, "getInspectionDetails: ");
        PaveSdkManager.getInstance().getInspectionDetailsBySession(sessionKey,
                new PaveSdkManager.CallBack<GetInspectionDetailsResponse>() {
                    @Override
                    public void onSuccess(GetInspectionDetailsResponse response) {
                        if (response.getCages() == null) {
                            callBack.invoke(null, true);
                        } else {
                            InspectionDetailRNO inspectionDetailRNO = InspectionDetailRNO
                                    .parseResponseToDataRNO(response);
                            WritableMap writableMap = new WritableNativeMap();
                            try {
                                String jsonInString = new Gson().toJson(inspectionDetailRNO);
                                Log.d(TAG, "onResult: getInspectionDetailsResponse " + jsonInString);
                                JSONObject mJSONObject = new JSONObject(jsonInString);
                                writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                            callBack.invoke(writableMap, false);
                        }
                    }

                    @Override
                    public void onFailure(String error) {
                        callBack.invoke("", true);
                    }
                });
    }

    /***********************************************************
     ******************* GET REPORT DAMAGE ********************
     **********************************************************/
    @ReactMethod
    public void getReportDamage(final Callback callBack) {
        Log.d(TAG, "getReportDamage:");
        PaveSdkManager.getInstance().getReportDamage(new PaveSdkManager.CallBack<GetReportDamageResponse>() {
            @Override
            public void onSuccess(GetReportDamageResponse response) {
                Log.d(TAG, "getReportDamage:  " + response.toString());
                ReportDamageRNO reportDamageRNO = ReportDamageRNO.parseResponseToDataRNO(response);

                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(reportDamageRNO);
                    Log.d(TAG, "onResult: GetReportDamageResponse " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String s) {
                callBack.invoke(null, true);
            }
        });
    }

    @ReactMethod
    public void getReportDamage(String sessionKey, final Callback callBack) {
        Log.d(TAG, "getReportDamage:  ");
        PaveSdkManager.getInstance().getReportDamageBySessionKey(sessionKey,
                new PaveSdkManager.CallBack<GetReportDamageResponse>() {
                    @Override
                    public void onSuccess(GetReportDamageResponse response) {
                        ReportDamageRNO reportDamageRNO = ReportDamageRNO.parseResponseToDataRNO(response);

                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            String jsonInString = new Gson().toJson(reportDamageRNO);
                            Log.d(TAG, "onResult: GetReportDamageResponse " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callBack.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callBack.invoke(null, true);
                    }
                });
    }

    /***************************************************************
     ******************** GET INSPECTION RESULT ********************
     ***************************************************************/
    @ReactMethod
    public void getInspectionResult(final Callback callBack) {
        Log.d(TAG, "getInspectionResult:  ");
        PaveSdkManager.getInstance().getInspectionResult(new PaveSdkManager.CallBack<InspectionResult>() {
            @Override
            public void onSuccess(InspectionResult inspectionResult) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(inspectionResult);
                    Log.d(TAG, "onResult: InspectionResult " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
                callBack.invoke("", true);
            }
        });
    }

    @ReactMethod
    public void getInspectionResult(String sessionKey, final Callback callBack) {
        Log.d(TAG, "getInspectionResult:  ");
        PaveSdkManager.getInstance().getInspectionResultBySessionKey(sessionKey,
                new PaveSdkManager.CallBack<InspectionResult>() {
                    @Override
                    public void onSuccess(InspectionResult inspectionResult) {
                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            String jsonInString = new Gson().toJson(inspectionResult);
                            Log.d(TAG, "onResult: InspectionResult " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callBack.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String error) {
                        callBack.invoke("", true);
                    }
                });
    }

    /***********************************************************
     ****************** GET INSPECTION PROGRESS ***************
     **********************************************************/
    @ReactMethod
    public void getInspectionProgress(final Callback callBack) {
        Log.d(TAG, "getInspectionProgress: ");
        PaveSdkManager.getInstance()
                .getInspectionProgress(new PaveSdkManager.CallBack<GetInspectionProgressResponse>() {
                    @Override
                    public void onSuccess(GetInspectionProgressResponse response) {
                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            InspectionProgressRNO inspectionProgressRNO = InspectionProgressRNO
                                    .parseResponseToDataRNO(response);
                            String jsonInString = new Gson().toJson(inspectionProgressRNO);
                            Log.d(TAG, "onResult: inputOdomResponse " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callBack.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callBack.invoke("", true);
                    }
                });
    }

    @ReactMethod
    public void getInspectionProgress(String sessionKey, final Callback callBack) {
        Log.d(TAG, "getInspectionProgress: ");
        PaveSdkManager.getInstance().getInspectionProgressBySessionKey(sessionKey,
                new PaveSdkManager.CallBack<GetInspectionProgressResponse>() {
                    @Override
                    public void onSuccess(GetInspectionProgressResponse response) {
                        Log.d(TAG,
                                "onSuccess: GetInspectionProgressResponse GetInspectionProgressResponse GetInspectionProgressResponse"
                                        + response.toString());
                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            InspectionProgressRNO inspectionProgressRNO = InspectionProgressRNO
                                    .parseResponseToDataRNO(response);
                            String jsonInString = new Gson().toJson(inspectionProgressRNO);
                            Log.d(TAG, "onResult: GetInspectionProgressResponse " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callBack.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callBack.invoke("", true);
                    }
                });
    }

    /***********************************************************
     ****************** GET SESSION PROGRESS *******************
     **********************************************************/
    @ReactMethod
    public void getSessionProgress(final Callback callBack) {
        Log.d(TAG, "getInspectionProgress: ");
        PaveSdkManager.getInstance().getSessionProgress(new PaveSdkManager.CallBack<GetSessionProgressResponse>() {
            @Override
            public void onSuccess(GetSessionProgressResponse response) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(response);
                    Log.d(TAG, "onResult: GetSessionProgressResponse " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String s) {
                callBack.invoke("", true);
            }
        });
    }

    @ReactMethod
    public void getSessionProgress(String sessionKey, final Callback callBack) {
        Log.d(TAG, "getInspectionProgress: ");
        PaveSdkManager.getInstance().getSessionProgressBySessionKey(sessionKey,
                new PaveSdkManager.CallBack<GetSessionProgressResponse>() {
                    @Override
                    public void onSuccess(GetSessionProgressResponse response) {
                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            String jsonInString = new Gson().toJson(response);
                            Log.d(TAG, "onResult: GetSessionProgressResponse " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callBack.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callBack.invoke("", true);
                    }
                });
    }

    /***********************************************************
     ****************** INPUT ODOMETER *************************
     **********************************************************/
    @ReactMethod
    public void inputOdom(String odomUnit, String odomReading, final Callback callBack) {
        Log.d(TAG, "inputOdom:  " + odomUnit + odomReading);
        PaveSdkManager.getInstance().inputOdom(new PaveSdkManager.CallBack<InputOdomResponse>() {
            @Override
            public void onSuccess(InputOdomResponse response) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(response);
                    Log.d(TAG, "onResult: I nputOdomResponse " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
                callBack.invoke("", true);
            }
        }, odomUnit, odomReading);
    }

    @ReactMethod
    public void inputOdom(String sessionKey, String odomUnit, String odomReading, final Callback callBack) {
        Log.d(TAG, "inputOdom:  " + odomUnit + odomReading);
        PaveSdkManager.getInstance().inputOdomBySessionKey(new PaveSdkManager.CallBack<InputOdomResponse>() {
            @Override
            public void onSuccess(InputOdomResponse response) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(response);
                    Log.d(TAG, "onResult: InputOdomResponse " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
                callBack.invoke("", true);
            }
        }, odomUnit, odomReading, sessionKey);
    }

    /***********************************************************
     ****************** INPUT VIN CODE *************************
     **********************************************************/
    @ReactMethod
    public void inputVinCode(String vinCode, final Callback callBack) {
        Log.d(TAG, "inputVinCode:  " + vinCode);
        PaveSdkManager.getInstance().inputVinCode(new PaveSdkManager.CallBack<InputVinCodeResponse>() {
            @Override
            public void onSuccess(InputVinCodeResponse inputVinCodeResponse) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(inputVinCodeResponse);
                    Log.d(TAG, "onResult: inputOdomResponse " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callBack.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String error) {
                callBack.invoke("", true);
            }
        }, vinCode);
    }

    @ReactMethod
    public void inputVinCode(String sessionKey, String vinCode, final Callback callBack) {
        Log.d(TAG, "inputVinCode:  " + vinCode);
        PaveSdkManager.getInstance().inputVinCodeBySessionKey(vinCode, sessionKey,
                new PaveSdkManager.CallBack<InputVinCodeResponse>() {
                    @Override
                    public void onSuccess(InputVinCodeResponse inputVinCodeResponse) {
                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            String jsonInString = new Gson().toJson(inputVinCodeResponse);
                            Log.d(TAG, "onResult: inputOdomResponse " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        callBack.invoke(writableMap, false);
                    }

                    @Override
                    public void onFailure(String error) {
                        callBack.invoke("", true);
                    }
                });
    }

    /***********************************************************
     ****************** UPLOAD PHOTO ***************************
     **********************************************************/
    @ReactMethod
    public void uploadPhoto(String sessionKey, String photoCode, String photoUrl, final Callback callback) {
        Log.d(TAG, "uploadPhoto: ");
        PaveSdkManager.getInstance().uploadPhoto(sessionKey, photoCode, photoUrl,
                new PaveSdkManager.CallBack<UploadSessionPhotoResponse>() {
                    @Override
                    public void onSuccess(UploadSessionPhotoResponse uploadSessionPhotoResponse) {
                        callback.invoke(true, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callback.invoke(false, true);// [res,err]
                    }
                }, new PaveSdkManager.IUploadPhoto() {
                    @Override
                    public void onUploadProgress(int percent, String s, String s1) {
                        WritableMap map = Arguments.createMap();
                        map.putString("session_id", s);
                        map.putString("photo_code", s1);
                        map.putString("upload_progress", Integer.valueOf(percent).toString() );

                        reactContext
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("UPLOAD_PROGRESS_EVENT", map);
                    }
                });
    }

    /***********************************************************
     ******************** COMPLETE SESSION *********************
     **********************************************************/
    @ReactMethod
    public void completeSession(final Callback callback) {
        PaveSdkManager.getInstance().stopSession(new PaveSdkManager.CallBack<StopSessionResponse>() {
            @Override
            public void onSuccess(StopSessionResponse response) {
                WritableMap writableMap = new WritableNativeMap();
                try {
                    String jsonInString = new Gson().toJson(response);
                    Log.d(TAG, "onResult: completeSession " + jsonInString);
                    JSONObject mJSONObject = new JSONObject(jsonInString);
                    writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                callback.invoke(writableMap, false);
            }

            @Override
            public void onFailure(String s) {
                callback.invoke("", true);
            }
        });
    }

    @ReactMethod
    public void completeSession(String sessionKey, final Callback callback) {
        PaveSdkManager.getInstance().stopSessionBySessionKey(sessionKey,
                new PaveSdkManager.CallBack<StopSessionResponse>() {
                    @Override
                    public void onSuccess(StopSessionResponse response) {
                        WritableMap writableMap = new WritableNativeMap();
                        try {
                            String jsonInString = new Gson().toJson(response);
                            Log.d(TAG, "onResult: completeSession " + jsonInString);
                            JSONObject mJSONObject = new JSONObject(jsonInString);
                            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
                            Log.d(TAG, "onSuccess: " + writableMap.toString());
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                        // callback.invoke(writableMap, false);
                        callback.invoke(true, false);
                    }

                    @Override
                    public void onFailure(String s) {
                        callback.invoke(false);
                    }
                });
    }

    @ReactMethod
    public void getSessionListFromLocal(final Callback callback) {

        List<SessionDTO> list = PaveSdkManager.getInstance().getSessionsFromLocal();
        Log.d(TAG, "PaveSdkManager.getInstance().getSessionsFromLocal() ==== " + list.toString());
        List<SessionRNO> listRNO = new ArrayList<>();
        SessionListRNO sessionListRNO = new SessionListRNO();

        for (SessionDTO item : list) {
            SessionRNO sessionRNO = new SessionRNO(item.getId(), item.getSessionKey(), item.getInspectionId(),
                    item.getStatus());
            listRNO.add(sessionRNO);
        }
        sessionListRNO.setValue(listRNO);
        WritableMap writableMap = new WritableNativeMap();
        try {
            String jsonInString = new Gson().toJson(sessionListRNO);
            Log.d(TAG, "onResult: List SessionRNO ==== " + jsonInString);
            JSONObject mJSONObject = new JSONObject(jsonInString);
            writableMap = ReactNativeJson.convertJsonToMap(mJSONObject);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        callback.invoke(writableMap, false);
    }

}
