'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Loading from '@/app/loading';
import style from './page.module.scss';
import SvgIntroLogo from '@/images/intro_logo.svg';

export default function IntroPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/fishingTrip'); // 메인 페이지로 이동
    }, 3000); // 3초 로딩

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [router]);

  return (
    <>
      <Head>
        <meta name="theme-color" content="#4CAF50" /> {/* 원하는 색상 */}
      </Head>
      <div className={style.intro_wrap}>
        {isLoading ? <><Loading /><SvgIntroLogo className={style.intro_logo} /></> : null}
      </div>
    </>
  );
}