'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Comment } from 'react-loader-spinner';
import { nextServer } from '@/lib/api/nextServerApi';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import s from './FileField.module.css';

export const FileField = () => {
  const [file, setFile] = useState(null);
  const [requestedFiles, setRequestedFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file) {
      const fetch = async () => {
        try {
          const formData = new FormData();
          formData.append('image', file);
          const intervalId = setTimeout(() => setIsLoading(true), 500);
          const { data } = await nextServer.post('/api', formData);
          clearTimeout(intervalId);
          setRequestedFiles(data);
        } catch (error) {
          toast.error('Invalid file');
        } finally {
          setIsLoading(false);
        }
      };
      fetch();
    }
  }, [file]);

  return (
    <div className={s.wrapper}>
      <label>
        Choose file:
        <div className={s.inputWrapper}>
          {isLoading && (
            <Comment
              visible={true}
              height="55"
              width="55"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass={s.loader}
              color="#fff"
              backgroundColor="#1010102e"
            />
          )}
          <input
            className={s.input}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </label>
      {requestedFiles && <ImageUploader requestedFiles={requestedFiles} />}
    </div>
  );
};
