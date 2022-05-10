declare module "react-native-pave-module" {
  interface PaveSDKClassicViewProps {
    sessionID: string;
    cancelled: () => void;
    onBackWhenQCDone: () => void;
  }

  interface VehicleData {
    redirectUrl?: string;
    vehicle?: string;
    vin: string;
    year?: string;
    make?: string;
    model?: string;
    bodyType?: string;
    trim?: string;
    transmission?: string;
    extColor?: string;
    intColor?: string;
    odomReading?: string;
    odomUnit?: "KILOMETERS" | "MILES";
  }

  interface UpLoadPhotoSession {
    sessionID: string;
    photoCode: string;
    photo: string; //uri of file
  }

  export interface GetInspectionDetails {
    inspectionID: string;
    sessionID: string;
    status: string;
    cages: Cage[];
  }

  export interface Cage {
    name: string;
    photo: string;
    cage: string;
    label: string;
    outline: string;
  }

  export interface GetInspectionResult {
    session_key: string;
    inspection_id: string;
    license: string;
    response: Response;
    photo_status: PhotoStatus[];
    vehicle: Vehicle;
    vehicleThumbnailUrl: string;
    damageAreas: DamageArea[];
    grading: Grading;
  }

  export interface DamageArea {
    view: string;
    detectedDamages: DetectedDamage[];
    photoUrl: string;
  }

  export interface GetInspectionProgress {
    inspectionID: string;
    sessionID: string;
    status: string;
    ttw: number;
    isReported: boolean;
    photos: Photos;
  }

  export interface Photos {
    missing: string[];
    inspect: PhotoStatus[];
    qc: PhotoStatus[];
    rejected: PhotoStatus[];
    finished: PhotoStatus[];
  }

  export interface PhotoStatus {
    name: string;
    photoCode: string;
    status: string;
    message: string;
    rejectedCount: number;
  }
  export interface DetectedDamage {
    damage_group: string;
    component: string;
    damage_name: string;
    source: string;
    label: string;
    description: string;
    tolerance: string;
    repair_method: string;
    repair_type: string;
    unit_measure: string;
    grade_score: number;
    uuid: string;
    cropped_url: string;
    cropped_code: string;
    aasc_damage_code: number;
    aasc_severity_code: number;
    component_label: string;
    aasc_item: string;
    aasc_item_code: number;
  }

  export interface PhotoStatus {
    url: string;
    photoType: string;
    photoCode: number;
    approved: boolean;
    reason: string;
  }

  export interface Response {
    status: string;
    inspection_start: string;
    inspection_end: string;
    inspection_partner: string;
  }

  export interface Grading {
    standard_A: number;
    standard_B: string;
    standard_C: string;
    autograde: number;
    autograde_B: string;
    component_damages: { [key: string]: ComponentDamage };
  }

  export interface ComponentDamage {
    score_by_component: boolean;
    item_score: number;
    component_score: number;
  }

  export interface Vehicle {
    vin: string;
    year: number;
    make: string;
    model: string;
    body_type: string;
    odom_reading: string;
    odom_unit: string;
    trim: string;
    transmission: string;
    ext_col_name: string;
    int_col_name: string;
  }

  export interface Session {
    id: String;
    session_key: String;
    inspection_id: String;
    status: String;
  }

  export interface SessionList {
    value: [Session];
  }

  function initializeWithKey(API_KEY: string): void;
  function createNewSession(data: VehicleData): Promise<any>;
  function uploadSessionPhoto(data: UpLoadPhotoSession): Promise<any>;
  function getInspectionProgress(
    sessionID: string
  ): Promise<GetInspectionProgress>;
  function getInspectionDetails(
    sessionID: string
  ): Promise<GetInspectionDetails>;
  function getInspectionResult(sessionID: string): Promise<GetInspectionResult>;
  function completeSession(sessionID: string): Promise<any>;
  function createSession(urlRequest: string): Promise<String>;
  function getSessionFromLocal(): Promise<SessionList>;

  export declare class PaveSDKClassic extends React.Component<
    PaveSDKClassicViewProps,
    any
  > {}
  export default PAVESDK = {
    initializeWithKey,
    createNewSession,
    uploadSessionPhoto,
    getInspectionProgress,
    getInspectionDetails,
    getInspectionResult,
    completeSession,
    createSession,
  };
}
