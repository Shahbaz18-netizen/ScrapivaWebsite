import React from 'react';
import styles from '../Input/Input.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className={`${styles.wrapper} ${className}`}>
        {label && <label htmlFor={textareaId} className={styles.label}>{label}</label>}
        <textarea
          ref={ref}
          id={textareaId}
          className={`${styles.input} ${error ? styles.hasError : ''}`}
          style={{ minHeight: '120px', resize: 'vertical' }}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
