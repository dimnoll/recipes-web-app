export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  links: string;
};

export function paginate<T>(
  items: readonly T[],
  page: number,
  perPage: number,
  hrefForPage: (page: number) => string,
): { slice: T[]; pagination: Pagination } {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(page, 1), totalPages);
  const start = (current - 1) * perPage;
  const slice = items.slice(start, start + perPage);

  const itemsHtml: string[] = [];
  const prevDisabled = current <= 1;
  const nextDisabled = current >= totalPages;
  itemsHtml.push(pageItem("Previous", hrefForPage(current - 1), prevDisabled, false, "Previous"));

  for (let n = 1; n <= totalPages; n += 1) {
    itemsHtml.push(pageItem(String(n), hrefForPage(n), false, n === current));
  }

  itemsHtml.push(pageItem("Next", hrefForPage(current + 1), nextDisabled, false, "Next"));

  const links = `<nav><ul class="pagination">${itemsHtml.join("")}</ul></nav>`;
  return {
    slice: [...slice],
    pagination: { page: current, perPage, total, totalPages, links },
  };
}

function pageItem(
  label: string,
  href: string,
  disabled: boolean,
  active: boolean,
  ariaLabel?: string,
): string {
  const classes = ["page-item"];
  if (disabled) {
    classes.push("disabled");
  }
  if (active) {
    classes.push("active");
  }
  const aria = ariaLabel === undefined ? "" : ` aria-label="${ariaLabel}"`;
  const body = disabled
    ? `<span class="page-link"${aria}>${label}</span>`
    : `<a class="page-link" href="${href}"${aria}>${label}</a>`;
  return `<li class="${classes.join(" ")}">${body}</li>`;
}
