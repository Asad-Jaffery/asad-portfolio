import ContributionGraph from './components/ContributionGraph';
import SpotifyRecent from './components/SpotifyRecent';
import { roles } from './data/experience';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.shell}>
      <header className={styles.top}>
        <h1 className={styles.name}>Asad Jaffery</h1>
        <nav className={styles.links}>
          <a href="https://github.com/Asad-Jaffery" aria-label="GitHub" title="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2V23c0 .4.2.7.8.6A12 12 0 0 0 12 .3Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/asad-jaffery/"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.5 3H3.5A.5.5 0 0 0 3 3.5v17c0 .3.2.5.5.5h17c.3 0 .5-.2.5-.5v-17a.5.5 0 0 0-.5-.5ZM8.3 18.3H5.6V9.7h2.7v8.6ZM7 8.5a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1Zm11.3 9.8h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H10V9.7h2.6v1.2c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2v4.6Z" />
            </svg>
          </a>
        </nav>
      </header>

      <section className={styles.bioPlaceholder} aria-label="Bio">
        <p>Bio coming soon.</p>
      </section>

      <section className={styles.section} id="github">
        <h2>GitHub</h2>
        <ContributionGraph />
      </section>

      <section className={styles.section} id="experience">
        <h2>Experience</h2>
        {roles.map((role) => (
          <article className={styles.role} key={role.org}>
            {role.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className={`${styles.logo} ${role.logoIcon ? styles.logoIcon : ''} ${role.logoBlend ? styles.logoBlend : ''}`}
                src={role.logo}
                alt=""
              />
            ) : (
              <span />
            )}
            <div>
              <h3>{role.title} at {role.org}</h3>
              <p className={styles.team}>{role.team}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.section} id="spotify">
        <h2>What I&apos;ve been listening to on Spotify</h2>
        <SpotifyRecent />
      </section>
    </main>
  );
}
