export function formatDateString(dateString) {
  return dateString.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}