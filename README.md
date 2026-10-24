# 🔎 LOST & FOUND HUB — Community-Powered Recovery Network

> **"Don't just report what's missing. Help it find its way home."**

Lost & Found Hub is a production-ready, autonomous frontend web application built with **React**, **Vite**, **Tailwind CSS**, **React Router**, **Lucide React**, **Context API**, and **LocalStorage**.

---

## ⭐ Core Unique Selling Propositions (USPs)

### 1. 📍 The Missing Trail Lifecycle
Every missing item gets an interactive, timestamped timeline tracing its complete recovery journey:
```text
🔴 LOST → 🟡 SPOTTED → 🟢 FOUND → ✨ MATCHED → 🔐 VERIFIED → 🤝 HANDOVER → 🔵 RETURNED
```
For pets:
```text
🔴 LOST → 🟡 SPOTTED → 🟢 FOUND → 🔐 VERIFIED → 🐾 REUNITED
```

### 2. 👀 Community Sightings System ("I Saw This")
Neighbors, commuters, and travelers can report sightings (photo, date, time, location spot, notes) without taking physical possession of an item. Every sighting appends a 🟡 **SPOTTED** node directly onto the item's Missing Trail.

### 3. 🤖 Smart Matching Engine (`matchingAlgorithm.js`)
Calculates confidence match percentages (% score + breakdown) by comparing category (30%), item name & brand (35%), location proximity (25%), time proximity (15%), and description similarity.

### 4. 🔐 Secure Ownership Verification & Safe Handover
Claimants prove identity by answering a private secret detail (e.g. unique scratch mark, internal card name) set during report creation. Private details are **never displayed publicly**. Once verified, finder and owner coordinate a safe public meetup using the simulated private messenger, culminating in the "Did the owner receive the item?" resolution flow.

### 5. 🐕 Dedicated Pet Recovery Mode
Specialized pet fields (Breed, Species, Age, Gender, Collar tags) with 🐾 **REUNITED** status milestones.

### 6. 🔎 Mystery Items Crowd-Sourcing
Allows users to upload unidentified items with community guessing and upvoting.

---

## 🛠️ Technology Stack

- **Framework**: React 18 (Vite 5)
- **Styling**: Tailwind CSS (with custom tokens, glassmorphism, responsive navigation, dark mode)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State & Persistence**: React Context API (`AuthContext`, `LostFoundContext`, `NotificationContext`, `ThemeContext`) + LocalStorage
- **Data**: 22+ realistic seed reports pre-populated

---

## 🚀 Running Locally

1. Open terminal in the project directory:
   ```bash
   cd C:\Users\shado\.gemini\antigravity\scratch\lost-and-found-hub
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

4. To build for production:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Accounts

Use the **One-Click Quick Demo Login** buttons on the Login page (`/login`) or enter:
- **Demo User**: `rohan.sharma@example.com` / `demo123`
- **Demo Admin**: `admin@lafhub.org` / `admin123`

---

## 🧭 Complete Route Index

- `/` — Landing Page (Hero, Search, Category Grid, Trail Showcase, Stats Counter, Workflow)
- `/explore` — Search & Multi-Filter Engine (Grid, List, and Map Pin Visualizer view modes)
- `/report-lost` — 7-Step Lost Report Multi-Step Wizard
- `/report-found` — 7-Step Found Report Multi-Step Wizard
- `/item/:id` & `/trail/:id` — Missing Trail Detail View, Sightings, Verification, Claims & Handover Messenger
- `/pets` — Specialized Pet Recovery Hub
- `/mystery-items` — Crowd-sourced Mystery Item Identification
- `/dashboard` — User Activity Dashboard & Helper Reputation Badges
- `/my-reports` — Report Management (All, Lost, Found, Spotted, Returned tabs; View, Edit, Delete, View Trail, Close Report actions)
- `/notifications` — System Activity Feed
- `/admin` — Moderation Portal (Reports Moderation, Flagged Content, User Management)
- `/about` & `/how-it-works` — Platform Guides
- `*` — Custom 404 Page
