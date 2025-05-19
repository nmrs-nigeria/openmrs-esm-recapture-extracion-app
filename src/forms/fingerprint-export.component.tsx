import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showNotification, showToast } from '@openmrs/esm-framework';
import styles from './fingerprint-export.scss';
import ExportForm from '../components/exportform';
import ExportResults from './../components/export-result';
import LoadingOverlay from './../components/loading-overlay';
import { type ExportResult } from '../types';

const FingerprintExport: React.FC = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [patientIdentifiers, setPatientIdentifiers] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exportResults, setExportResults] = useState<ExportResult[]>([]);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      showNotification({
        title: t('error', 'Error'),
        kind: 'error',
        critical: true,
        description: t('pleaseProvideDates', 'Please provide both start date and end date'),
      });
      return;
    }

    if (isCustom && !patientIdentifiers) {
      showNotification({
        title: t('error', 'Error'),
        kind: 'error',
        critical: true,
        description: t('pleaseEnterIdentifiers', 'Please enter the patient identifiers separated with comma'),
      });
      return;
    }

    setIsLoading(true);

    try {
      // Build URL with query parameters for GET request
      let url = `/openmrs/ws/rest/v1/fpverification/biometrics?startdate=${encodeURIComponent(startDate)}&enddate=${encodeURIComponent(endDate)}`;

      if (isCustom && patientIdentifiers) {
        url += `&patientidentifiers=${encodeURIComponent(patientIdentifiers)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Handle error response
      if (typeof data === 'object' && data.error) {
        throw new Error(data.error);
      }

      // Handle "No record found" response
      if (data === "No record found") {
        showToast({
          title: t('noRecords', 'No Records'),
          kind: 'info',
          description: t('noRecordsFound', 'No records found for the selected criteria'),
        });
        setExportResults([]);
        return;
      }

      // Process successful response
      // The API returns an array with [fileName, date, date2, totalFiles, filePath]
      if (Array.isArray(data) && data.length >= 5) {
        setExportResults([
          {
            fileName: data[0],                   // Zip file name
            dateStarted: data[1] || new Date().toISOString().split('T')[0],  // Handle potentially null dates
            dateCompleted: data[1] || new Date().toISOString().split('T')[0],
            totalPatients: data[3],              // Number of XML files
            downloadUrl: data[4],                // File path
          },
        ]);

        showToast({
          title: t('exportSuccess', 'Export Successful'),
          kind: 'success',
          description: t('exportCompleted', 'Fingerprint data exported successfully'),
        });
      } else {
        // Unexpected response format
        console.error('Unexpected API response format:', data);
        throw new Error('Received unexpected response format from server');
      }
    } catch (error) {
      console.error('Export error:', error);
      showNotification({
        title: t('error', 'Error'),
        kind: 'error',
        critical: true,
        description: error instanceof Error ? error.message : t('exportFailed', 'Failed to export data'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a download handler
  const handleDownload = (filePath: string) => {
    // Extract just the filename from the path
    const fileName = filePath.split('\\').pop() || filePath.split('/').pop() || 'download.zip';

    // Use the direct file path returned by the API
    // This bypasses the REST API and accesses the file directly
    const downloadUrl = `/openmrs/FPdownloads/FingerPrintVerification/${fileName}`;

    // Create a hidden link and click it
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>

      <ExportForm
        startDate={startDate}
        endDate={endDate}
        isCustom={isCustom}
        patientIdentifiers={patientIdentifiers}
        isLoading={isLoading}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onCustomChange={setIsCustom}
        onPatientIdentifiersChange={setPatientIdentifiers}
        onExport={handleExport}
      />

      <ExportResults
        results={exportResults}
        onDownload={handleDownload} // Pass the download handler to the results component
      />
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default FingerprintExport;
