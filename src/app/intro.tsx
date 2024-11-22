// 'use client';

// import { useEffect, useState } from 'react';

// export default function Intro() {

//     const styles = {
//         container: {
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//           backgroundColor: '#f9f9f9',
//         },
//         spinner: {
//           width: '50px',
//           height: '50px',
//           border: '5px solid #ddd',
//           borderTop: '5px solid #007bff',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite',
//         },
//         text: {
//           marginTop: '20px',
//           fontSize: '16px',
//           color: '#333',
//         },
//         content: {
//           padding: '20px',
//           textAlign: 'center',
//           fontSize: '18px',
//           color: '#333',
//         },
//       };
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {

//     // Keyframes for spinner animation
//     const globalStyle = document.createElement('style');
//     globalStyle.innerHTML = `
//     @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//     }
//     `;
//     document.head.appendChild(globalStyle);

//     // 5초간 로딩 상태 유지
//     const timer = setTimeout(() => {
//       // 데이터가 없는 상태로 테스트
//       setIsLoading(false);
//     }, 5000);

//     return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
//   }, []);

//   if (isLoading) {
//     return (
//       <div style={styles.container}>
//         <div style={styles.spinner}></div>
//         <p style={styles.text}>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.content}>
//       {data ? (
//         <p>데이터가 있습니다.</p>
//       ) : (
//         <p>데이터가 없습니다.</p>
//       )}
//     </div>
//   );
// }



