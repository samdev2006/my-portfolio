/** Copie un texte dans le presse-papiers, avec repli pour les contextes sans API Clipboard. */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(temp);
    }
  }
}
