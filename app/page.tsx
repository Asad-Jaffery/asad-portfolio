import ContributionGraph from './components/ContributionGraph';
import SpotifyRecent from './components/SpotifyRecent';
import { education, roles } from './data/experience';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.shell}>
      <header className={styles.top}>
        <span>Asad Jaffery</span>
        <nav className={styles.links}>
          <a href="https://github.com/Asad-Jaffery">GitHub</a>
          <a href="https://www.linkedin.com/in/asad-jaffery/">LinkedIn</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <h1>
          Pipelines, products, and a few good songs<span className={styles.mark}>.</span>
        </h1>
        <p>
          Informatics student at the University of Washington iSchool. I intern
          on analytics and data engineering at Shopify, Tesla, and USAFacts, and
          I build tools like Recognize when school meets a real company.
        </p>
      </section>

      <section className={styles.section} id="work">
        <h2>Work</h2>
        {roles.map((role) => (
          <article className={styles.role} key={role.org}>
            {role.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.logo} src={role.logo} alt="" />
            ) : (
              <span />
            )}
            <div>
              <h3>
                {role.org} — {role.title}
              </h3>
              <div className={styles.meta}>
                <span>{role.dates}</span>
                <span>{role.place}</span>
              </div>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className={styles.edu}>
          <h3>{education.org}</h3>
          <div className={styles.meta}>
            <span>{education.title}</span>
            <span>{education.dates}</span>
            <span>{education.place}</span>
          </div>
          <p>{education.note}</p>
        </div>
      </section>

      <section className={styles.section} id="github">
        <h2>GitHub</h2>
        <ContributionGraph />
      </section>

      <section className={styles.section} id="spotify">
        <h2>What I&apos;ve been listening to on Spotify</h2>
        <SpotifyRecent />
      </section>
    </main>
  );
}
