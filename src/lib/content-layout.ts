/** Site-wide max width for interior content (all pages, including project case studies). */
export const contentMaxWidthClass = "max-w-[900px]";

export const contentColumnClass =
  `mx-auto flex w-full ${contentMaxWidthClass} flex-col items-start text-left`;

/** Two-column card grid inside {@link contentColumnClass} (no extra max-width). */
export const contentInnerGridClass =
  "grid w-full gap-5 text-left md:grid-cols-2";

/** Vertical card stack inside {@link contentColumnClass}. */
export const contentInnerStackClass = "w-full space-y-6 text-left";

/** Case-study board image — same width as {@link contentColumnClass}. */
export const projectDetailImageWrapClass =
  `mx-auto mt-10 w-full ${contentMaxWidthClass}`;
