import { ContentRecord, siteConfig, siteData } from "./content";
import { PdfSlideViewer } from "./pdf-slide-viewer";
import { ThemeToggle } from "./theme-toggle";

export { siteConfig, siteData } from "./content";

const socialIconClasses = new Set(["email", "github", "linkedin", "x"]);
const newTabLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;
const siteHostname = new URL(siteConfig.url).hostname.toLowerCase();

function linkTargetProps(href: string) {
  try {
    const url = new URL(href, siteConfig.url);
    if ((url.protocol === "http:" || url.protocol === "https:") && url.hostname.toLowerCase() === siteHostname) return {};
  } catch {
    return {};
  }
  return newTabLinkProps;
}

export function sorted(items: ContentRecord[]) {
  return [...items].sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
}

export function year(date: string | null) {
  return date ? date.slice(0, 4) : "";
}

export function displayDate(date: string | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function robotExcerptParts(excerpt: unknown) {
  const html = String(excerpt ?? "");
  const video = html.match(/<video\b[\s\S]*?<\/video>/i)?.[0];
  const image = html.match(/<img\b[^>]*>/i)?.[0];
  const media = video ?? image ?? "";
  const description = html
    .replace(/<video\b[\s\S]*?<\/video>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<br\s*\/?\s*>/gi, " ")
    .trim();

  return { media, description };
}

export function normalizePath(path: string | null) {
  if (!path) return "";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function findRecord(path: string) {
  const target = normalizePath(path);
  return [...Object.values(siteData.pages), ...Object.values(siteData.collections).flat()]
    .find((item) => normalizePath(item.permalink) === target);
}

export function recordImage(record: ContentRecord) {
  const direct = record.metadata.pub_image;
  if (typeof direct === "string" && direct.startsWith("/")) return direct;
  const match = record.source.match(/(?:src|href)\s*=\s*["'](\/images\/[^"']+)["']/i)
    ?? record.source.match(/\]\((\/images\/[^)]+)\)/);
  return match?.[1] ?? null;
}

export function SiteHeader() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <a className="site-name" href="/" aria-label={`${siteConfig.name} home`} {...linkTargetProps("/")}>
          <span>{siteConfig.name}</span><small>{siteConfig.name_zh}</small>
        </a>
        <div className="header-actions">
          <nav className="main-nav" aria-label="Primary navigation">
            {siteConfig.navigation.map(({ label, href }) => <a href={href} key={href} {...linkTargetProps(href)}>{label}</a>)}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function ProfileSidebar() {
  return (
    <aside className="profile" aria-label="Author profile">
      <img className="profile-photo" src={siteConfig.photo} alt={siteConfig.name} />
      <div className="profile-intro">
        <h2>{siteConfig.name} <span>{siteConfig.name_zh}</span></h2>
        <p>{siteConfig.role_lines.map((line) => <span key={line}>{line}</span>)}</p>
      </div>
      <dl className="profile-facts">
        <div><dt>Based in</dt><dd>{siteConfig.location}</dd></div>
        <div><dt>At</dt><dd>{siteConfig.organization}</dd></div>
      </dl>
      <div className="profile-links">
        {siteConfig.social_links.map((link) => (
          <a href={link.href} key={link.id} {...linkTargetProps(link.href)}>
            <span className="link-icon-wrap" aria-hidden="true"><img className={`link-icon${socialIconClasses.has(link.id) ? " icon-dark-adapt" : ""}`} src={`/icons/yiyuan-${link.id}.svg`} alt="" /></span>
            <span className="link-label">{link.label}</span><span className="link-arrow">↗</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><span>© 2026 {siteConfig.name}</span></div>
      <a href="#top" {...linkTargetProps("#top")}>Back to top ↑</a>
    </footer>
  );
}

export function SiteFrame({ title, children, variant }: { title: string; children: React.ReactNode; variant?: "publication-detail" }) {
  return (
    <div id="top" className={variant}>
      <SiteHeader />
      <div className="page-shell">
        <ProfileSidebar />
        <main className="page-main">
          <header className="page-heading">
            <h1>{title}</h1>
          </header>
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

export function RichContent({ html }: { html: string }) {
  return <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function TalkDetail({ record }: { record: ContentRecord }) {
  const slidesHref = typeof record.metadata.slides === "string" ? record.metadata.slides : null;
  const explicitPreviewHref = typeof record.metadata.slides_preview === "string" ? record.metadata.slides_preview : null;
  const slidesPreviewHref = explicitPreviewHref
    ?? (slidesHref?.startsWith("/") && /\.pdf(?:[?#]|$)/i.test(slidesHref) ? slidesHref : null);
  const slidesPreviewSize = typeof record.metadata.slides_preview_size === "string" ? record.metadata.slides_preview_size : null;
  const posterPreviewHref = typeof record.metadata.poster_preview === "string" ? record.metadata.poster_preview : null;
  const posterPreviewSize = typeof record.metadata.poster_preview_size === "string" ? record.metadata.poster_preview_size : null;
  const materialLinks = [
    { href: record.metadata.slides, label: record.metadata.slides_label ?? (explicitPreviewHref ? "Download original slides" : "View slides"), size: record.metadata.slides_size },
    { href: record.metadata.poster, label: record.metadata.poster_label ?? (posterPreviewHref ? "Download original poster" : "Download poster"), size: record.metadata.poster_size },
    { href: record.metadata.original_file, label: record.metadata.original_file_label ?? "Download original file", size: record.metadata.original_file_size },
  ].filter((resource): resource is { href: string; label: string; size: string | null } => typeof resource.href === "string" && Boolean(resource.href));

  return (
    <>
      <section className="talk-detail-meta" aria-label="Talk details">
        <span className="item-type">{String(record.metadata.type ?? "Talk")}</span>
        <dl>
          <div><dt>Date</dt><dd>{displayDate(record.date)}</dd></div>
          <div><dt>Venue</dt><dd>{String(record.metadata.venue ?? "")}</dd></div>
          {record.metadata.location ? <div><dt>Location</dt><dd>{String(record.metadata.location)}</dd></div> : null}
        </dl>
        {materialLinks.length > 0 ? (
          <div className="talk-detail-resources" aria-label="Talk materials">
            {materialLinks.map((resource) => (
              <a href={resource.href} key={resource.href} {...newTabLinkProps}>
                {resource.label}{resource.size ? ` · ${String(resource.size)}` : ""}<span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        ) : null}
      </section>
      {record.html.trim() ? <RichContent html={record.html} /> : null}
      {posterPreviewHref ? (
        <section className="talk-slides talk-poster" aria-labelledby="talk-poster-heading">
          <div className="talk-slides-header">
            <div>
              <p>Presentation</p>
              <h2 id="talk-poster-heading">Poster</h2>
            </div>
            <div className="talk-slides-actions">
              <a href={posterPreviewHref} {...newTabLinkProps}>Open preview full size ↗</a>
              <a href={posterPreviewHref} download>Download preview image{posterPreviewSize ? ` · ${posterPreviewSize}` : ""} ↓</a>
            </div>
          </div>
          <a className="talk-poster-preview" href={posterPreviewHref} {...newTabLinkProps} aria-label={`Open ${record.title} poster preview full size`}>
            <img src={posterPreviewHref} alt={`${record.title} poster preview`} loading="lazy" />
          </a>
        </section>
      ) : null}
      {slidesPreviewHref ? (
        <section className="talk-slides" aria-labelledby="talk-slides-heading">
          <div className="talk-slides-header">
            <div>
              <p>Presentation</p>
              <h2 id="talk-slides-heading">Slides</h2>
            </div>
            <div className="talk-slides-actions">
              <a href={slidesPreviewHref} {...newTabLinkProps}>Open preview full screen ↗</a>
              <a href={slidesPreviewHref} download>Download preview PDF{slidesPreviewSize ? ` · ${slidesPreviewSize}` : ""} ↓</a>
            </div>
          </div>
          <PdfSlideViewer src={slidesPreviewHref} title={`${record.title} slides`} />
          <p className="talk-slides-note">Use the controls above to move between pages. On phones, opening the slides full screen usually gives the best reading experience.</p>
        </section>
      ) : null}
    </>
  );
}

export function PublicationsPage() {
  const items = sorted(siteData.collections.publications);
  return (
    <SiteFrame title="Publications">
      <p className="page-intro">You can also find my articles on <a href="https://scholar.google.com/citations?user=OeaxVcEAAAAJ&hl=en" {...linkTargetProps("https://scholar.google.com/citations?user=OeaxVcEAAAAJ&hl=en")}>my Google Scholar profile</a>.</p>
      <div className="publication-list">
        {items.map((item) => (
          <article className="publication-item" key={item.permalink}>
            <a className="publication-thumb" href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")}>
              {item.metadata.pub_image ? <img src={String(item.metadata.pub_image)} alt={`${item.title} cover`} /> : null}
            </a>
            <div className="publication-body">
              <div className="publication-year">{year(item.date)}</div>
              <h2><a href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")}>{item.title}</a></h2>
              {item.metadata.authors ? <p className="publication-authors" dangerouslySetInnerHTML={{ __html: String(item.metadata.authors) }} /> : null}
              <p className="publication-venue"><em>{String(item.metadata.publication ?? "")}</em></p>
              {item.resources.length > 0 ? (
                <div className="publication-resources" aria-label="Publication resources">
                  {item.resources.map((resource) => (
                    <a href={resource.href} key={`${resource.label}-${resource.href}`} {...linkTargetProps(resource.href)}>{`[${resource.label}]`}</a>
                  ))}
                </div>
              ) : null}
              {item.metadata.highlight ? <p className="publication-highlight" dangerouslySetInnerHTML={{ __html: String(item.metadata.highlight) }} /> : null}
            </div>
          </article>
        ))}
      </div>
    </SiteFrame>
  );
}

export function TalksPage() {
  const items = sorted(siteData.collections.talks);
  return (
    <SiteFrame title="Talks and Presentations">
      <div className="talk-list">
        {items.map((item) => (
          <article className="talk-item" key={item.permalink}>
            <time>{displayDate(item.date)}</time>
            <div>
              <span className="item-type">{String(item.metadata.type ?? "Talk")}</span>
              <h2><a href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")}>{item.title}</a></h2>
              <p><strong>{String(item.metadata.venue ?? "")}</strong>{item.metadata.location ? ` · ${String(item.metadata.location)}` : ""}</p>
            </div>
          </article>
        ))}
      </div>
    </SiteFrame>
  );
}

export function TeachingPage() {
  return (
    <SiteFrame title="Teaching">
      <div className="archive-list">
        {sorted(siteData.collections.teaching).map((item) => (
          <article className="archive-item" key={item.permalink}>
            <p className="item-type">{String(item.metadata.type ?? "Course")}</p>
            <h2><a href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")}>{item.title}</a></h2>
            <p>{String(item.metadata.venue ?? "")} · {String(item.metadata.location ?? "")} · {year(item.date)}</p>
          </article>
        ))}
      </div>
    </SiteFrame>
  );
}

export function RobotsPage() {
  return (
    <SiteFrame title="Robots">
      <div className="robot-list">
        {sorted(siteData.collections.robots).map((item) => {
          const { media, description } = robotExcerptParts(item.metadata.excerpt);
          return (
            <article className="robot-item" key={item.permalink}>
              <a className="robot-media" href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")} dangerouslySetInnerHTML={{ __html: media }} />
              <div className="robot-summary">
                <span className="item-type">{year(item.date)}</span>
                <h2><a href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")}>{item.title}</a></h2>
                {description ? <p className="robot-description" dangerouslySetInnerHTML={{ __html: description }} /> : null}
              </div>
            </article>
          );
        })}
      </div>
    </SiteFrame>
  );
}

export function PostsPage() {
  const grouped = Object.groupBy(sorted(siteData.collections.posts), (item) => year(item.date));
  return (
    <SiteFrame title="Blog posts">
      <div className="post-archive">
        {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([postYear, items]) => (
          <section key={postYear}>
            <h2 className="archive-year">{postYear}</h2>
            {items?.map((item) => (
              <article className="post-item" key={item.permalink}>
                <time>{displayDate(item.date)}</time>
                <h3><a href={item.permalink ?? "#"} {...linkTargetProps(item.permalink ?? "#")}>{item.title}</a></h3>
                {Array.isArray(item.metadata.tags) ? <p>{item.metadata.tags.join(" · ")}</p> : null}
              </article>
            ))}
          </section>
        ))}
      </div>
    </SiteFrame>
  );
}

export function CVPage() {
  return (
    <SiteFrame title={siteData.pages.cv.title ?? "Curriculum Vitae"}>
      <RichContent html={siteData.pages.cv.html} />
    </SiteFrame>
  );
}
