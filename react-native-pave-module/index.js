import {
  initializeWithKey,
  createNewSessionWithVehicle,
  uploadSessionPhoto,
  getInspectionProgress,
  getInspectionDetails,
  getInspectionResult,
  completeSession,
  createSession,
  startSession,
  getSessionFromLocal,
} from './nativeCall/Native';

import TableViewDeclarationView from './component/disclosureAnnouncement/DisclosureAnnouncement';

import PaveCapture from './screens/CaptureVehicle/CaptureVehicleScreen';

import ManagementSessionView from './component/managementSession/ManagementSessionTableView';

import {ReportDamagesView} from './component/reportDamages/ReportDamagesView';

import UploadPhotoOptional from './screens/UploadPhotoOptional/UploadPhoto';

import PaveSDKClassic from './screens/PaveDiscovery/PaveDiscovery';

export default PAVESDK = {
  initializeWithKey,
  createNewSessionWithVehicle,
  uploadSessionPhoto,
  getInspectionProgress,
  getInspectionDetails,
  getInspectionResult,
  completeSession,
  TableViewDeclarationView,
  PaveCapture,
  ManagementSessionView,
  ReportDamagesView,
  UploadPhotoOptional,
  createSession,
  startSession,
  getSessionFromLocal,
};
export {PaveSDKClassic};
