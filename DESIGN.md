# Design Language

## Seamless composition
The portfolio should feel like one continuous, interactive environment. Graphics blend directly into the existing navy page background (`#110e2d` on Work; retain established colours elsewhere). A visitor should not be able to identify the edge of a newly inserted section.

- Do not use visible cards, boxed panels, tabs, contrasting section rectangles, framing borders, or drop shadows to separate content.
- Use spacing, scale, typography, depth, and the artwork itself to establish hierarchy.
- Let illustrations float within the page. Remove opaque art backplates and decorative frames; fade peripheral elements subtly into the shared background where needed.
- Semantic HTML sections are welcome; visual section boundaries are not.
- Preserve the shared navigation header. Intentional objects within an illustration may have their own geometry, but must not become a repeated container system around page content.

## Variety and interaction
Keep the opening and each role's distinct visual identity. Do not standardise the page into repeated rows, cards, or tables. Each experience should introduce a fresh composition while remaining part of the same environment.

- Tie movement meaningfully to pointer position, velocity, scrolling, or direct manipulation. Use inertia and restrained depth where appropriate.
- Bloomberg's artwork can be expansive and energetic: moving chart traces and terminal-style trade events should respond to the visitor. Generated feed activity is artwork rather than a live data service. Keep it free of visible status labels and instructional chrome.
- A terminal event table is part of the Bloomberg artwork, not a generic UI layout for every role.
- Keep copy readable and separate from dense visual activity. Avoid instructional clutter and implementation details in visible copy.

## Motion and access
Animate only visible artwork and pause when the document is hidden. Respect reduced-motion settings with a stable presentation. Provide keyboard and touch access for functional controls, retain visible focus, and keep graphics from covering text or creating horizontal overflow.

## Content
Keep current employment and historical internship claims distinct. Do not invent team assignments, dates, achievements, live market data, or investment returns. The trading-club content has been removed; retain the blockchain work.
