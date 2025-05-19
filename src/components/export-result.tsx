// components/export-result.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import styles from './export-result.scss';
import { type ExportResult } from '../types';

interface ExportResultsProps {
  results: ExportResult[];
  onDownload: (filePath: string) => void;
}

const ExportResults: React.FC<ExportResultsProps> = ({ results, onDownload }) => {
  const { t } = useTranslation();

  if (!results.length) {
    return null;
  }

  return (
    <div className={styles.resultsContainer}>
      <h5>{t('exportResults', 'Export Results')}</h5>
      <table className={styles.resultsTable}>
        <thead>
        <tr>
          <th>{t('fileName', 'File Name')}</th>
          <th>{t('dateStarted', 'Date Started')}</th>
          <th>{t('dateCompleted', 'Date Completed')}</th>
          <th>{t('totalPatients', 'Total Patients')}</th>
          <th>{t('action', 'Action')}</th>
        </tr>
        </thead>
        <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.fileName}</td>
            <td>{result.dateStarted}</td>
            <td>{result.dateCompleted}</td>
            <td>{result.totalPatients}</td>
            <td>
              <Button
                kind="ghost"
                renderIcon={Download}
                iconDescription={t('download', 'Download')}
                hasIconOnly
                onClick={() => onDownload(result.downloadUrl)}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExportResults;
