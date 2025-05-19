import React from 'react';
import { Loading } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import styles from '../forms/fingerprint-export.scss';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const { t } = useTranslation();

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.loadingOverlay}>
      <Loading description={t('pleaseWait', 'Please wait, operation in progress...')} />
    </div>
  );
};

export default LoadingOverlay;
