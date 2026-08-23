import React from 'react';
import styles from './AuroraBackground.module.css';

interface AuroraBackgroundProps {
  className?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.auroraContainer} ${className}`} aria-hidden="true">
      <div className={`${styles.auroraBlob} ${styles.aurora1}`}></div>
      <div className={`${styles.auroraBlob} ${styles.aurora2}`}></div>
      <div className={`${styles.auroraBlob} ${styles.aurora3}`}></div>
    </div>
  );
};
