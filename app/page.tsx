import BackgroundEffect from './components/BackgroundEffect';
import Experiences from './components/Experiences';
import Greetings from './components/Greeting';

export default function Page() {
  return (
    <main className='relative'>
      <div className='fixed inset-0 -z-10'>
        <BackgroundEffect /> {/*this should not move*/}
      </div>

      <section className='min-h-screen flex items-center justify-center'>
        <Greetings />
      </section>
      <section className='min-h-screen flex items-center justify-center'>
        <Experiences />
      </section>
    </main>
  );
}
