import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const RoleBasedAccess = ({ userRole, children }) => {
  const { t } = useLanguage();

  const renderContent = () => {
    switch (userRole) {
      case "Citizen":
        return <div>{t('citizenAccess')}</div>;
      case "Officer":
        return <div>{t('officerAccess')}</div>;
      case "Auditor":
        return <div>{t('auditorAccess')}</div>;
      default:
        return <div>{t('noAccess')}</div>;
    }
  };

  return (
    <div>
      {renderContent()}
      {children}
    </div>
  );
};

export default RoleBasedAccess;
