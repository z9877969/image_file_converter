import Image from 'next/image';
import styles from './page.module.css';
import { FileField } from '@/components/FileField/FileField';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>File converter</h1>
        <p>
          Convert images to <strong>WEBP</strong> with <strong>@1x</strong>,{' '}
          <strong>@2x</strong> retina displays
        </p>

        <FileField />
      </main>
    </div>
  );
}
