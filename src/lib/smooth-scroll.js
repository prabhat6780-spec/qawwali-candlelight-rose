// Shared handle to the page's smooth-scroll instance so nav links can use it.
export const smooth = { lenis: null };

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (smooth.lenis) smooth.lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}
