# 🦷 Application de Gestion de Cabinet Dentaire

## 📋 Description
Application complète pour la gestion d'un cabinet dentaire développée avec **Bun** (Backend) et **React + TypeScript** (Frontend).

---

## 🏗️ Structure du Projet

```
dental-app/
├─ backend/
│   ├─ models/
│   │   ├─ Patient.ts
│   │   ├─ Appointment.ts
│   │   ├─ Invoice.ts
│   │   ├─ Prescription.ts
│   │   ├─ Inventory.ts
│   │   ├─ Supplier.ts
│   │   ├─ MedicalFile.ts
│   │   ├─ Notification.ts
│   │   └─ User.ts
│   ├─ routes/
│   │   ├─ patient.route.ts
│   │   ├─ appointment.route.ts
│   │   ├─ invoice.route.ts
│   │   ├─ prescription.route.ts
│   │   ├─ inventory.route.ts
│   │   ├─ supplier.route.ts
│   │   ├─ medicalFile.route.ts
│   │   ├─ notification.routes.ts
│   │   └─ user.route.ts
│   ├─ controllers/
│   │   ├─ patient.controller.ts
│   │   ├─ appointment.controller.ts
│   │   └─ ... (autres contrôleurs)
│   ├─ middleware/
│   │   ├─ isAuthenticate.ts
│   │   └─ authorizeRoles.ts
│   ├─ libs/
│   │   ├─ connectDB.ts
│   │   ├─ token.ts
│   │   └─ role.enum.ts
│   ├─ index.ts
│   └─ package.json
│
├─ frontend/
│   ├─ src/
│   │   ├─ Pages/
│   │   │   ├─ Admin/
│   │   │   │   ├─ Dashboard.tsx ✨ (Nouveau design)
│   │   │   │   ├─ PatientForm.tsx ✨ (Nouveau)
│   │   │   │   └─ ... (autres créations)
│   │   │   ├─ Patients/
│   │   │   │   ├─ Patients.tsx ✨ (Redesigné)
│   │   │   │   └─ PatientsDetails.tsx
│   │   │   ├─ Appointments/
│   │   │   ├─ Invoices/
│   │   │   └─ ... (autres pages)
│   │   ├─ Components/
│   │   │   ├─ Navbar.tsx
│   │   │   ├─ ProtectedRoute.tsx
│   │   │   └─ LanguageSwitcher.tsx
│   │   ├─ i18n/
│   │   │   └─ config.ts (FR/AR)
│   │   ├─ App.tsx
│   │   └─ main.tsx
│   └─ package.json
```

---

## 🚀 Installation et Lancement

### **Backend (Bun)**

```bash
# Naviguer vers le dossier backend
cd backend

# Installer les dépendances avec Bun
bun install

# Créer un fichier .env avec vos configurations
# Exemple:
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dental_db
# JWT_SECRET=votre_secret_jwt
# PORT=5000

# Lancer le serveur
bun run start
```

Le backend démarre sur **http://localhost:5000**

### **Frontend (React + Vite)**

```bash
# Naviguer vers le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le frontend démarre sur **http://localhost:5183** (ou un autre port disponible)

---

## 📦 Modèles de Données

### **Patient**
```typescript
{
  name: string
  dob: Date
  gender: "Male" | "Female" | "Other"
  address: string
  phone: number
  email: string (unique)
  medical_history?: string
  userId: ObjectId (ref: User)
  visits: ObjectId[] (ref: Appointment)
}
```

### **Appointment**
- Patient, date, heure, statut, notes

### **Invoice**
- Patient, montant, date, statut de paiement

### **Prescription**
- Patient, médicaments, dosage, instructions

### **Inventory**
- Nom, quantité, seuil, prix, fournisseur

### **Supplier**
- Nom, contact, adresse, produits fournis

---

## 🎨 Fonctionnalités Frontend

### **Dashboard** ✨
- **Sidebar collapsible** avec menu de navigation
- **Top bar** avec:
  - Widget météo (22°C - Ensoleillé)
  - Nom de l'utilisateur connecté
  - Dashboard icon
- **Statistiques en temps réel**:
  - Cards avec gradient (Patients, RDV, Factures, Prescriptions, Stock, Fournisseurs)
  - Tendances avec pourcentages
- **Actions Rapides**:
  - Créer patient, RDV, facture, inventaire
- **Activité du Jour**:
  - Consultations, Traitements, Revenus
- **Alertes**:
  - Stock faible, RDV à venir, Prescriptions actives

### **Gestion des Patients** ✨
- **Liste des Patients** (Patients.tsx):
  - Design moderne avec cards colorées
  - Barre de recherche (nom, email, téléphone)
  - Affichage: nom, date de naissance, genre, téléphone, email
  - Actions: Modifier, Supprimer
  - Responsive design

- **Formulaire Patient** (PatientForm.tsx):
  - Création et modification
  - Champs:
    - Informations personnelles (nom, date de naissance, genre, téléphone, email, adresse)
    - Informations médicales (historique, allergies, notes)
  - Validation des champs
  - Design avec icônes colorées
  - Messages d'aide

### **Multilingue** 🌍
- Support **Français** (par défaut) et **Arabe**
- Switcher de langue dans la navbar
- Direction LTR/RTL automatique
- Traductions pour toutes les pages

### **Authentification & Sécurité** 🔒
- JWT tokens
- Routes protégées par rôle (Admin, Dentist, Receptionist)
- Middleware d'authentification
- LocalStorage pour persistance

---

## 🎯 Routes API Principales

### **Patients**
```
GET    /api/patient           - Liste tous les patients
GET    /api/patient/:id       - Détails d'un patient
POST   /api/patient           - Créer un patient
PUT    /api/patient/:id       - Modifier un patient
DELETE /api/patient/:id       - Supprimer un patient
```

### **Authentication**
```
POST   /api/auth/register     - Inscription
POST   /api/auth/login        - Connexion
GET    /api/auth/profile      - Profil utilisateur
```

### **Autres Endpoints**
- `/api/appointment` - Gestion des rendez-vous
- `/api/invoice` - Gestion des factures
- `/api/prescription` - Gestion des prescriptions
- `/api/inventory` - Gestion du stock
- `/api/supplier` - Gestion des fournisseurs
- `/api/medicalFile` - Dossiers médicaux
- `/api/notification` - Notifications

---

## 🔧 Technologies Utilisées

### **Backend**
- **Bun** - Runtime JavaScript rapide
- **Express** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **TypeScript** - Typage statique

### **Frontend**
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **React Router** - Navigation
- **Axios** - Requêtes HTTP
- **i18next** - Internationalisation (FR/AR)
- **Tailwind CSS** - Styles utilitaires
- **React Icons** - Icônes (Font Awesome, Material Design)
- **React Hot Toast** - Notifications

---

## 🎨 Design System

### **Couleurs**
- **Bleu** (#3B82F6) - Primaire, Dashboard
- **Vert** (#10B981) - Patients, Succès
- **Violet** (#8B5CF6) - Rendez-vous
- **Jaune** (#F59E0B) - Factures, Alertes
- **Rose** (#EC4899) - Prescriptions
- **Rouge** (#EF4444) - Stock, Erreurs
- **Indigo** (#6366F1) - Fournisseurs

### **Composants**
- **StatCard** - Cartes statistiques avec gradients
- **QuickActionCard** - Actions rapides avec animations
- **Sidebar** - Menu de navigation collapsible
- **SearchBar** - Barre de recherche avec icône
- **Form Inputs** - Inputs avec validation et icônes

---

## 👤 Comptes de Test

```
Email: admin@admin.com
Mot de passe: admin1234567890
Rôle: Admin
```

---

## 📱 Responsive Design

- **Mobile** - Optimisé pour smartphones
- **Tablet** - Layout adaptatif pour tablettes
- **Desktop** - Pleine expérience sur écran large
- **Sidebar** - Collapsible sur petits écrans

---

## 🔜 Fonctionnalités Futures

- [ ] Notifications email/push
- [ ] Système de rappels automatiques
- [ ] Rapports et statistiques avancés
- [ ] Export PDF des factures
- [ ] Calendrier interactif pour RDV
- [ ] Gestion des paiements en ligne
- [ ] Historique des consultations
- [ ] Photos avant/après traitements
- [ ] Chat en temps réel

---

## 📝 Notes Importantes

1. **CORS** est configuré pour les ports 5173-5185 (frontend)
2. **MongoDB Atlas** est utilisé pour la base de données
3. Les **mots de passe** sont hachés avec bcrypt
4. Les **tokens JWT** expirent après 7 jours
5. Direction **LTR** par défaut (French)
6. **Validation** côté client et serveur

---

## 🐛 Dépannage

### Problème de CORS
Si vous obtenez une erreur CORS, vérifiez que le port frontend est ajouté dans `backend/index.ts`:
```typescript
cors({
  origin: ["http://localhost:5183", ...],
  credentials: true
})
```

### Erreur de connexion MongoDB
Vérifiez votre chaîne de connexion dans le fichier `.env`

### Port déjà utilisé
Le frontend changera automatiquement de port si 5173 est occupé

---

## 📄 Licence

Ce projet est développé pour un usage éducatif et professionnel.

---

## 👨‍💻 Développement

**Backend**: Bun + TypeScript + MongoDB  
**Frontend**: React + TypeScript + Tailwind CSS  
**Design**: Modern UI avec gradients et animations  
**i18n**: Support Français et Arabe

---

## 📞 Support

Pour toute question ou problème, consultez la documentation ou créez une issue.

🦷 **Dental Clinic Management System** - Gestion moderne et intuitive de votre cabinet dentaire!
