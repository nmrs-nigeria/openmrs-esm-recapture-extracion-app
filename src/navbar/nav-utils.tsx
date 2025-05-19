import React from 'react';
import {
  ChartColumn,
  DocumentAdd,
  Home,
  Renew,
  User,
  VolumeFileStorage
} from '@carbon/react/icons';
import { useConfig } from '@openmrs/esm-framework';
import { type ConfigObject } from '../config-schema';
import { useTranslation } from 'react-i18next';
const openmrsSpaBase = window['getOpenmrsSpaBase']();

const handleClearCache = async () => {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
};

export const useModuleLinks = () => {
  const { t } = useTranslation();
  const config = useConfig<ConfigObject>();
  return [
    {
      label: 'System Info',
      url: `${openmrsSpaBase}about`,
      icon: <VolumeFileStorage size={24} />,
    },
    {
      label: 'NigeriaMRS 2.x Home',
      url: `/openmrs/referenceapplication/home.page?`,
      icon: <Home size={24} />,
    },
    {
      label: 'Clear Cache',
      icon: <Renew size={24} />,
      onClick: handleClearCache,
    },
    {
      label: 'Form Builder ',
      url: `${openmrsSpaBase}form-builder`,
      icon: <DocumentAdd size={24} />,
      privilege: 'o3: View Form Builder Dashboard',
    },
    {
      label: 'Legacy Admin ',
      url: `/openmrs/admin/index.htm`,
      icon: <User size={24} />,
      privilege: 'coreapps.systemAdministration',
    },
    {
      label: 'Recapture Extraction ',
      url: `${openmrsSpaBase}home/recapture-extraction`,
      icon: <VolumeFileStorage size={24} />
    },
  ];
};
