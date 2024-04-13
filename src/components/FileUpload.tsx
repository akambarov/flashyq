import React, { useState } from 'react';
import '../styles/FileUpload.css';
import { FileUploadProps } from './types';
  
const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, errorMessage }) => {
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let selectedFile: File | null = null;
    if (e.type === 'change' && (e.target as HTMLInputElement).files) {
      selectedFile = (e.target as HTMLInputElement).files![0];
    } else if (e.type === 'drop' && (e as React.DragEvent<HTMLDivElement>).dataTransfer.files) {
      selectedFile = (e as React.DragEvent<HTMLDivElement>).dataTransfer.files![0];
    }

    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFileName(selectedFile.name);
      onFileChange(selectedFile);
    } else {
      onFileChange(null);  
    }
  };

  return (
    <>
      <div className="starter-btns">
        <div className="drop-zone" onDragOver={(e) => e.preventDefault()} onDragEnter={() => setIsDragging(true)} onDragLeave={() => setIsDragging(false)} onDrop={handleFileChange}>
          <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
          <button className={`upload-btn ${isDragging ? 'drag-hover' : ''}`} onClick={() => (document.querySelector('.drop-zone input[type=file]') as HTMLInputElement)?.click()}>
            <span className="material-symbols-outlined upload-icon">upload_file</span>
            {fileName ? (fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName) : 'Upload .csv file'}
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="error-box">
          <span className="error-message">{errorMessage}</span>
        </div>
      )}
    </>
  );
};

export default FileUpload;