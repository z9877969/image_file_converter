'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { nextServer } from '@/lib/api/nextServerApi';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import s from './FileField.module.css';

export const FileField = () => {
  const [file, setFile] = useState(null);
  const [requestedFiles, setRequestedFiles] = useState(null);

  useEffect(() => {
    if (file) {
      const fetch = async () => {
        try {
          const formData = new FormData();
          formData.append('image', file);
          const { data } = await nextServer.post('/api', formData);
          setRequestedFiles(data);
        } catch (error) {
          toast.error('Invalid file');
        }
      };
      fetch();
    }
  }, [file]);

  return (
    <div className={s.wrapper}>
      <label>
        Choose file:
        <input
          className={s.input}
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      {requestedFiles && <ImageUploader requestedFiles={requestedFiles} />}
    </div>
  );
};
