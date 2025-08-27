import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const translations = {
    en: {
      // Dashboard
      dashboard: 'Dashboard',
      monitorCases: 'Monitor and analyze land dispute cases',
      filters: 'Filters',
      county: 'County',
      allCounties: 'All Counties',
      status: 'Status',
      allStatus: 'All Status',
      startDate: 'Start Date',
      endDate: 'End Date',
      refresh: 'Refresh',
      generateReport: 'Generate Report',
      totalCases: 'Total Cases',
      pending: 'Pending',
      resolved: 'Resolved',
      inProgress: 'In Progress',
      caseStatusDistribution: 'Case Status Distribution',
      casesByCounty: 'Cases by County (Top 10)',
      
      // Profile
      userProfile: 'User Profile',
      manageAccount: 'Manage your account settings and preferences',
      personalInformation: 'Personal Information',
      fullName: 'Full Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      preferences: 'Preferences',
      languagePreference: 'Language Preference',
      notificationSettings: 'Notification Settings',
      enableNotifications: 'Enable notifications',
      theme: 'Theme',
      darkMode: 'Dark mode',
      roleInformation: 'Role Information',
      currentRole: 'Current Role',
      citizenDescription: 'You can submit and track land dispute cases.',
      officerDescription: 'You can review and process land dispute cases.',
      auditorDescription: 'You have full access to audit and monitor all system activities.',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',

      // Education
      education: 'Education',
      progress: 'Progress',
      modules: 'Modules',
      submitNewRecord: 'Submit New Record',
      recordSubmitted: 'Record submitted successfully!',
      submissionError: 'Error submitting record.',
      loading: 'Loading...',
      markComplete: 'Mark as Complete',
      completed: 'Completed',
      
      // Common
      saveSuccess: 'Profile updated successfully!',
      saveError: 'Failed to update profile. Please try again.',
    },
    sw: {
      // Dashboard
      dashboard: 'Dashibodi',
      monitorCases: 'Fuatilia na chambua kesi za ugomvi wa ardhi',
      filters: 'Vichujio',
      county: 'Kaunti',
      allCounties: 'Kaunti Zote',
      status: 'Hali',
      allStatus: 'Hali Zote',
      startDate: 'Tarehe ya Kuanzia',
      endDate: 'Tarehe ya Mwisho',
      refresh: 'Sasisha',
      generateReport: 'Tengeneza Ripoti',
      totalCases: 'Jumla ya Kesi',
      pending: 'Inasubiri',
      resolved: 'Imetatuliwa',
      inProgress: 'Inaendelea',
      caseStatusDistribution: 'Usambazaji wa Hali ya Kesi',
      casesByCounty: 'Kesi kwa Kaunti (Juu 10)',
      
      // Profile
      userProfile: 'Wasifu wa Mtumiaji',
      manageAccount: 'Dhibiti mipangilio na mapendeleo ya akaunti yako',
      personalInformation: 'Taarifa Binafsi',
      fullName: 'Jina Kamili',
      email: 'Barua Pepe',
      phoneNumber: 'Nambari ya Simu',
      preferences: 'Mapendeleo',
      languagePreference: 'Lugha Unayopendelea',
      notificationSettings: 'Mipangilio ya Arifa',
      enableNotifications: 'Washa arifa',
      theme: 'Mandhari',
      darkMode: 'Mandhari ya Giza',
      roleInformation: 'Taarifa ya Wajibu',
      currentRole: 'Wajibu wa Sasa',
      citizenDescription: 'Unaweza kuwasilisha na kufuatilia kesi za ugomvi wa ardhi.',
      officerDescription: 'Unaweza kukagua na kushughulikia kesi za ugomvi wa ardhi.',
      auditorDescription: 'Una ufikiaji kamili wa kukagua na kufuatilia shughuli zote za mfumo.',
      editProfile: 'Hariri Wasifu',
      saveChanges: 'Hifadhi Mabadiliko',
      cancel: 'Futa',

      // Education
      education: 'Elimu',
      progress: 'Maendeleo',
      modules: 'Moduli',
      submitNewRecord: 'Wasilisha Rekodi Mpya',
      recordSubmitted: 'Rekodi imeshindwa kuwasilishwa!',
      submissionError: 'Kosa la kuwasilisha rekodi.',
      loading: 'Inapakia...',
      markComplete: 'Weka kama Kamili',
      completed: 'Imekamilika',
      
      // Common
      saveSuccess: 'Wasifu umehakikishiwa kwa mafanikio!',
      saveError: 'Imeshindwa kuhakikisha wasifu. Tafadhali jaribu tena.',
      loading: 'Inapakia...',
    },
    kik: {
      // Dashboard
      dashboard: 'Dashibodi',
      monitorCases: 'Thutha na ühoro wa mbeca cia ügurani',
      filters: 'Mütürüko',
      county: 'Kaunti',
      allCounties: 'Kaunti Ciothe',
      status: 'Ühoro',
      allStatus: 'Ühoro Wothe',
      startDate: 'Mümotho wa Kürümîrîra',
      endDate: 'Mümotho wa Gütangîra',
      refresh: 'Hingia',
      generateReport: 'Tümira Ripoti',
      totalCases: 'Mbeca Ciothe',
      pending: 'Iri Mbere',
      resolved: 'Iratetekete',
      inProgress: 'Iri Müno',
      caseStatusDistribution: 'Ühoro wa Mbeca',
      casesByCounty: 'Mbeca Kaunti (Iciarü 10)',
      
      // Profile
      userProfile: 'Ühoro wa Mütumia',
      manageAccount: 'Thibita mîtürüko na maitü ma akaunti yaku',
      personalInformation: 'Ühoro Mwenyewe',
      fullName: 'Rïtwa Rïothe',
      email: 'Barua Pepe',
      phoneNumber: 'Nambari ya Thimu',
      preferences: 'Maitü',
      languagePreference: 'Rüthiomi Rwa Kwenda',
      notificationSettings: 'Mîtürüko ya Matangazo',
      enableNotifications: 'Cokia matangazo',
      theme: 'Mütünü',
      darkMode: 'Mütünü wa Kîrîru',
      roleInformation: 'Ühoro wa Wîra',
      currentRole: 'Wîra wa Rïnene',
      citizenDescription: 'Üngïkünyïrïra na güthutha mbeca cia ügurani.',
      officerDescription: 'Üngïkünyïrïra na gücokoroa mbeca cia ügurani.',
      auditorDescription: 'Ürï na ügïkünyïrïra kürïa güthekania na güthutha mawîra mothe ma mütüngati.',
      editProfile: 'Hariri Ühoro',
      saveChanges: 'Hifadhi Mîtürüko',
      cancel: 'Thukia',

      // Education
      education: 'Elimu',
      progress: 'Maendeleo',
      modules: 'Moduli',
      submitNewRecord: 'Wasilisha Rekodi Mpya',
      recordSubmitted: 'Rekodi imeshindwa kuwasilishwa!',
      submissionError: 'Kosa la kuwasilisha rekodi.',
      loading: 'Inapakia...',
      markComplete: 'Weka kama Kamili',
      completed: 'Imekamilika',
      
      // Common
      saveSuccess: 'Ühoro ühakikiitwo!',
      saveError: 'Tügücitwo güthibita ühoro. Tafadhali ügerie ringi.',
      loading: 'Ükinyïrïra...',
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
