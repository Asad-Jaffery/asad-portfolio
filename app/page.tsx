import Experiences from './components/Experiences';
import Greetings from './components/Greeting';
import NavBar from './components/NavBar';

export default function Page() {
  return (
    <main className='relative'>
      <NavBar />

      <section className='min-h-screen flex items-center justify-center'>
        <Greetings />
      </section>
      <section
        className='min-h-screen flex items-center justify-center'
        id='experiences'
      >
        <Experiences />
      </section>
    </main>
  );
}
