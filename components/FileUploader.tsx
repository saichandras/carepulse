import React, { useCallback, useState, useEffect } from 'react';
import { FilePond, registerPlugin, FilePondFile } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
);

interface FileUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ files, onChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<FilePondFile[]>([]);

  useEffect(() => {
    // Ensure files is treated as an array
    const initialFiles = Array.isArray(files) ? files.map((file) => ({
      source: file,
      options: { type: 'local' },
    })) : [];
    
    setUploadedFiles(initialFiles);
  }, [files]);

  const handleUpdateFiles = useCallback(
    (fileItems: FilePondFile[]) => {
      const newFiles = fileItems.map((fileItem) => fileItem.file);
      setUploadedFiles(fileItems);
      onChange(newFiles);
    },
    [onChange],
  );

  return (
    <FilePond
      files={uploadedFiles}
      allowMultiple={true}
      maxFiles={3}
      onupdatefiles={handleUpdateFiles}
      acceptedFileTypes={['image/*']}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      credits={false}
    />
  );
};

export default FileUploader;
