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
          <a href="https://github.com/Asad-Jaffery">GitHub</a>
          <a href="https://www.linkedin.com/in/asad-jaffery/">LinkedIn</a>
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
