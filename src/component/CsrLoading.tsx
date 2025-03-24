'use client';

import { useLoading } from '@/context/LoadingContext';

import styles from "./CsrLoading.module.scss";

export default function CsrLoading() {

  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}