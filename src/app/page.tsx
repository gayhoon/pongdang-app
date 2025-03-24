import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/intro');

  return (
    <div>
    </div>
  );
}

export default Home