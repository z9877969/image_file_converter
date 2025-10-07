import s from './ImageUploader.module.css';

export const ImageUploader = ({ requestedFiles: images }) => {
  const handleDownload = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };

  return (
    <ul className={s.list}>
      {images.map(({ name, data }, idx) => {
        const k = idx + 1;
        return (
          <div className={s.item} key={name}>
            <img src={data} alt="1x preview" width={`${200 * k}`} />
            <button
              onClick={() => handleDownload(data, name)}
              className={s.downloadBtn}
            >
              Download {k}x
            </button>
          </div>
        );
      })}
    </ul>
  );
};
