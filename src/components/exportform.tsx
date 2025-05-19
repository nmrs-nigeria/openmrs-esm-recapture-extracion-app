import React from 'react';
import {
  DatePicker,
  DatePickerInput,
  Checkbox,
  TextInput,
  Button,
  InlineLoading,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import styles from '../forms/fingerprint-export.scss';

interface ExportFormProps {
  startDate: string;
  endDate: string;
  isCustom: boolean;
  patientIdentifiers: string;
  isLoading: boolean;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onCustomChange: (checked: boolean) => void;
  onPatientIdentifiersChange: (value: string) => void;
  onExport: () => void;
}

const ExportForm: React.FC<ExportFormProps> = ({
  startDate,
  endDate,
  isCustom,
  patientIdentifiers,
  isLoading,
  onStartDateChange,
  onEndDateChange,
  onCustomChange,
  onPatientIdentifiersChange,
  onExport,
}) => {
  const { t } = useTranslation();

  const handleStartDateChange = (dates: Date[]) => {
    if (dates && dates[0]) {
      const date = dates[0];
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      onStartDateChange(formattedDate);
    }
  };

  const handleEndDateChange = (dates: Date[]) => {
    if (dates && dates[0]) {
      const date = dates[0];
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      onEndDateChange(formattedDate);
    }
  };

  return (
    <div className={styles.exportForm}>
      <Checkbox
        id="custom"
        labelText={t('custom', 'Custom')}
        checked={isCustom}
        onChange={(_, { checked }) => onCustomChange(checked)}
      />

      {isCustom && (
        <TextInput
          id="identifiers"
          labelText={t('patientIdentifiers', 'Patient Identifiers')}
          placeholder={t('commaSeparatedIdentifiers', 'ART numbers separated by comma')}
          value={patientIdentifiers}
          onChange={(e) => onPatientIdentifiersChange(e.target.value)}
        />
      )}

      <div className={styles.dateRange}>
        <DatePicker
          dateFormat="Y-m-d"
          datePickerType="single"
          onChange={handleStartDateChange}
          value={startDate ? new Date(startDate) : undefined}
        >
          <DatePickerInput
            id="startdate"
            labelText={t('startDate', 'Start Date')}
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </DatePicker>

        <DatePicker
          dateFormat="Y-m-d"
          datePickerType="single"
          onChange={handleEndDateChange}
          value={endDate ? new Date(endDate) : undefined}
        >
          <DatePickerInput
            id="enddate"
            labelText={t('endDate', 'End Date')}
            placeholder="YYYY-MM-DD"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </DatePicker>
      </div>

      <Button onClick={onExport} disabled={isLoading}>
        {isLoading ? (
          <InlineLoading description={t('exporting', 'Exporting...')} />
        ) : (
          t('export', 'Export')
        )}
      </Button>
    </div>
  );
};

export default ExportForm;
