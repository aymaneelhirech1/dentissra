import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import PatientForm from "./Pages/Admin/PatientForm";
import Patients from "./Pages/Patients/Patients";
import PatientDetails from "./Pages/Patients/PatientsDetails";
import AppointmentCreate from "./Pages/Admin/AppointmentCreate";
import Appointments from "./Pages/Appointments/Appointments";
import AppointmentsDetails from "./Pages/Appointments/AppointmentsDetails";
import AppointmentsList from "./Pages/Appointments/AppointmentsList";
import AppointmentForm from "./Pages/Appointments/AppointmentForm";
import InvoicesCreate from "./Pages/Admin/InvoicesCreate";
import Invoices from "./Pages/Invoices/Invoices";
import InvoiceDetails from "./Pages/Invoices/InvoiceDetails";
import SupplierCreate from "./Pages/Admin/SupplierCreate";
import SuppliersList from "./Pages/Suppliers/SuppliersList";
import SupplierForm from "./Pages/Suppliers/SupplierForm";
import SupplierDetails from "./Pages/Suppliers/SupplierDetails";
import InventoryList from "./Pages/Inventory/InventoryList";
import InventoryForm from "./Pages/Inventory/InventoryForm";
import PrescriptionCreate from "./Pages/Admin/PrescriptionCreate";
import Prescription from "./Pages/Prescription/Prescription";
import PrescriptionDetails from "./Pages/Prescription/PrescriptionDetails";
import MedicalFileCreate from "./Pages/Admin/MedicalFileCreate";
import MedicalFile from "./Pages/MedicalFile/MedicalFile";
import MedicalFileDetails from "./Pages/MedicalFile/MedicalFileDetails";
import FeuillesList from "./Pages/FeuilleSoin/FeuillesList";
import FeuilleFormNew from "./Pages/FeuilleSoin/FeuilleFormNew";
import FeuilleView from "./Pages/FeuilleSoin/FeuilleView";
import OrdonnancesList from "./Pages/Ordonnances/OrdonnancesList";
import OrdonnanceForm from "./Pages/Ordonnances/OrdonnanceForm";
import OrdonnanceView from "./Pages/Ordonnances/OrdonnanceView";
import FacturesList from "./Pages/Factures/FacturesList";
import FactureForm from "./Pages/Factures/FactureForm";
import FactureView from "./Pages/Factures/FactureView";
import Settings from "./Pages/Settings/Settings";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import SMM from "./Pages/SMM/SMM";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Admin/Dashboard";
import SecretaryDashboard from "./Pages/Secretary/SecretaryDashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PersonnelCreate from "./Pages/Admin/PersonnelCreate";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#ddd",
            padding: "14px",
            borderRadius: "5px",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["Admin", "Dentist", "Receptionist", "user"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Patients */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="patients">
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="patients">
              <PatientDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/create"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <PatientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <PatientForm />
            </ProtectedRoute>
          }
        />

        {/* Appointments */}
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="appointments">
              <AppointmentsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="appointments">
              <AppointmentsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]} requiredPermission="appointments">
              <AppointmentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]} requiredPermission="appointments">
              <AppointmentForm />
            </ProtectedRoute>
          }
        />

        {/* Invoices */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]}>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]}>
              <InvoiceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoices/create"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <InvoicesCreate />
            </ProtectedRoute>
          }
        />

        {/* Suppliers */}
        <Route path="/suppliers" element={<Navigate to="/supplier" replace />} />
        <Route
          path="/supplier"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <SuppliersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <SupplierForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <SupplierForm />
            </ProtectedRoute>
          }
        />

        {/* Personnel */}
        <Route
          path="/personnel/create"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <PersonnelCreate />
            </ProtectedRoute>
          }
        />

        {/* Inventory */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]}>
              <InventoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <InventoryForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]}>
              <InventoryForm />
            </ProtectedRoute>
          }
        />

        {/* Prescription */}
        <Route
          path="/prescription"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="prescriptions">
              <Prescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prescription/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="prescriptions">
              <PrescriptionDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prescription/create"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <PrescriptionCreate />
            </ProtectedRoute>
          }
        />

        {/* Medical Files */}
        <Route
          path="/medicalfile"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]} requiredPermission="medicalFiles">
              <MedicalFile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical-files"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]} requiredPermission="medicalFiles">
              <MedicalFile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicalfile/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]} requiredPermission="medicalFiles">
              <MedicalFileDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicalfile/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist"]} requiredPermission="medicalFiles">
              <MedicalFileCreate />
            </ProtectedRoute>
          }
        />

        {/* Feuilles de Soin */}
        <Route
          path="/feuilles"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FeuillesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feuilles/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FeuilleFormNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feuilles/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FeuilleFormNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feuilles/view/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FeuilleView />
            </ProtectedRoute>
          }
        />

        {/* Ordonnances */}
        <Route
          path="/ordonnances"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="prescriptions">
              <OrdonnancesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordonnances/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <OrdonnanceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordonnances/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <OrdonnanceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordonnances/view/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]}>
              <OrdonnanceView />
            </ProtectedRoute>
          }
        />

        {/* Factures */}
        <Route
          path="/factures"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist", "Receptionist"]} requiredPermission="invoices">
              <FacturesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/factures/create"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FactureForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/factures/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FactureForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/factures/view/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Dentist"]}>
              <FactureView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/secretary-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Receptionist", "Admin"]}>
              <SecretaryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Dentist"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/theme-settings"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Receptionist", "Dentist"]}>
              <ThemeSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/smm"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <SMM />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
