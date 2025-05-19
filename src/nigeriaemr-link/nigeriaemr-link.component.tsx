import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function NigeriaEMRLink() {
  const { t } = useTranslation();
  return (
    <ConfigurableLink to={'/openmrs/referenceapplication/home.page?'}>{t('nigeriaMRSHome', 'NigeriaMRS 2.x Home')}</ConfigurableLink>
  );
}
