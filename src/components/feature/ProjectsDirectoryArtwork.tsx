import '../../styles/projects-directory-artwork.css'

/**
 * An abstract roadmap: several project streams resolve into one paced path,
 * with milestones giving that path a deliberate rhythm.
 */
export function ProjectsDirectoryArtwork() {
  return (
    <div className="projects-directory-artwork" aria-hidden="true">
      <svg viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <filter id="projects-directory-soften" x="-10%" y="-20%" width="120%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <rect width="1600" height="700" className="projects-directory-artwork__ground" />

        <g className="projects-directory-artwork__distant" fill="none">
          <path d="M-48 32C177 58 373 162 595 157C828 152 1025 84 1307 110C1456 124 1548 170 1662 228" />
          <path d="M-70 98C175 124 342 226 568 237C796 248 1011 151 1290 172C1452 184 1556 234 1658 282" />
          <path d="M44 3L321 229M222 -8L427 236M1339 -3L1146 197M1488 23L1255 219" />
        </g>

        <g className="projects-directory-artwork__streams" fill="none">
          <path d="M-62 278C164 263 351 370 574 350C808 327 925 226 1164 222C1372 219 1498 291 1655 302" />
          <path d="M-45 329C188 313 343 426 604 395C844 367 955 269 1194 264C1394 261 1512 327 1646 341" />
          <path d="M-55 378C196 365 387 472 638 431C865 394 1000 305 1205 300C1381 297 1504 351 1652 373" />
        </g>

        <path className="projects-directory-artwork__spine-shadow" d="M278 474C449 444 562 467 700 420C930 340 1080 220 1317 220C1450 218 1550 240 1650 286" fill="none" filter="url(#projects-directory-soften)" />
        <path className="projects-directory-artwork__spine" d="M278 474C449 444 562 467 700 420C930 340 1080 220 1317 220C1450 218 1550 240 1650 286" fill="none" pathLength="100" />

        <g className="projects-directory-artwork__ticks">
          <path d="M653 415l-6 27M704 395l-5 23M748 377l-6 27M809 347l-4 22M854 320l-5 25M915 287l-4 21M962 265l-3 18M1042 236l-2 16M1093 222l-1 15M1166 215l1 16M1225 216l3 17M1288 219l4 18M1361 226l6 20M1446 241l7 22" />
        </g>

        <g className="projects-directory-artwork__milestones">
          <path d="M703 419L681 306" />
          <circle cx="703" cy="419" r="6.5" />
          <path d="M966 307L949 166" />
          <circle cx="966" cy="307" r="7" />
          <path d="M1220 227L1215 112" />
          <circle cx="1220" cy="227" r="6.5" />
          <path d="M1435 225L1459 144" />
          <circle cx="1435" cy="225" r="6.5" />
        </g>

        <g className="projects-directory-artwork__microcopy">
          <text x="653" y="289">01 / SCOPE</text>
          <text x="918" y="149">02 / PLAN</text>
          <text x="1181" y="96">03 / BUILD</text>
          <text x="1432" y="128">04 / SHIP</text>
        </g>

        <g className="projects-directory-artwork__accent">
          <circle className="projects-directory-artwork__accent-halo" cx="966" cy="307" r="15" />
          <circle cx="966" cy="307" r="10" />
          <path d="M960 307l5 5 10-12" />
        </g>
      </svg>
    </div>
  )
}
