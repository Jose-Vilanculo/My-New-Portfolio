export const navigateTo = (id, { offset = 0, updateHash = true } = {}) => {
  const target = document.getElementById(id.replace('#', ''));
  if (!target) {
    console.warn(`navigateTo: no element found with id "${id}"`);
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });

  if (updateHash) {
    window.history.replaceState(null, '', `#${target.id}`);
  }
};