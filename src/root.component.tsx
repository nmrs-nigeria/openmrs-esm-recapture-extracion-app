/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LaboratoryPictogram, PageHeader, useDefineAppContext } from '@openmrs/esm-framework';
import styles from './root.scss';
import FingerprintExport from './forms/fingerprint-export.component';

const Root: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeader
        illustration={<LaboratoryPictogram />}
        title={t('recapture', 'NDR Export for fingerprint recapture')}
        className={styles.pageHeader}
      />
      <div className={styles.container}>
        <FingerprintExport />
      </div>
    </div>
  );
};

export default Root;
