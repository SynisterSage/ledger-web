import '../../styles/notes-directory-artwork.css'

/** A field of loose observations gradually resolving into linked knowledge. */
export function NotesDirectoryArtwork() {
  return (
    <div className="notes-directory-artwork" aria-hidden="true">
      <svg viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <filter id="notes-directory-soften" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>

        <g className="notes-directory-artwork__distant" fill="none">
          <path d="M-20 62C203 116 353 59 523 101S841 204 1054 132S1418 62 1645 143" />
          <path d="M219 -22C328 57 410 121 541 152M1260 -16C1174 59 1117 131 1025 208M1498 21C1398 77 1335 141 1269 237" />
          <path d="M67 231l92 31M161 208l54 19M1378 267l98-20M1490 239l57-12" />
        </g>

        <g className="notes-directory-artwork__fragments notes-directory-artwork__fragments--loose">
          <path d="M122 219h82M126 235h49M177 302h95M184 319h61M302 176h58M305 191h89M348 341h76M348 358h42" />
          <path d="M69 273l12 7M292 250l13-5M419 272l9 10M287 383l-11 8" className="notes-directory-artwork__marks" />
        </g>

        <g className="notes-directory-artwork__connectors" fill="none">
          <path d="M242 304C342 260 398 277 479 319C564 363 617 346 699 279" />
          <path d="M375 190C453 220 496 232 562 213C624 195 676 175 743 204" />
          <path d="M514 357C593 379 657 376 731 333C798 294 839 260 920 271" />
          <path d="M733 204C807 212 848 254 917 271C1010 293 1074 267 1141 220" />
          <path d="M920 271C1004 320 1090 353 1175 311C1258 270 1320 250 1428 282" />
          <path d="M1087 173C1162 184 1203 217 1260 259C1313 298 1377 324 1463 315" />
        </g>

        <g className="notes-directory-artwork__fragments notes-directory-artwork__fragments--ordered">
          <path d="M584 201h102M584 217h63M748 187h114M748 203h83M941 245h125M941 261h92M1134 191h116M1134 207h76M1191 310h142M1191 326h100M1372 274h103M1372 290h64" />
          <path d="M808 356h107M808 372h66M1048 349h128M1048 365h94" />
        </g>

        <g className="notes-directory-artwork__nodes">
          <circle cx="242" cy="304" r="4" />
          <circle cx="479" cy="319" r="4" />
          <circle cx="699" cy="279" r="5" />
          <circle cx="743" cy="204" r="4" />
          <circle cx="920" cy="271" r="5" />
          <circle cx="1141" cy="220" r="4" />
          <circle cx="1175" cy="311" r="4" />
          <circle cx="1428" cy="282" r="4" />
        </g>

        <g className="notes-directory-artwork__index" fill="none">
          <path d="M1044 162v-24h32M1329 151v-20h-27M1488 338v26h-34" />
        </g>

        <g className="notes-directory-artwork__labels">
          <text x="541" y="174">CAPTURE</text>
          <text x="1010" y="142">LINK</text>
          <text x="1290" y="114">REFINE</text>
          <text x="1441" y="363">KEEP</text>
        </g>

        <g className="notes-directory-artwork__active">
          <circle className="notes-directory-artwork__active-halo" cx="699" cy="279" r="15" />
          <circle cx="699" cy="279" r="7" />
          <path d="M693 299h12" />
        </g>
      </svg>
    </div>
  )
}
