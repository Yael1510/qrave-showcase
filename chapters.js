// Clickable chapter list for a video: chapters(videoId, listId, [[seconds, title, isPart], ...])
function chapters(videoId, listId, list) {
  const v = document.getElementById(videoId), box = document.getElementById(listId);
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const btns = list.map(([t, title, part]) => {
    const b = document.createElement('button');
    if (part) b.className = 'part';
    b.innerHTML = `<time>${fmt(t)}</time><span></span>`;
    b.querySelector('span').textContent = title;
    b.onclick = () => { v.currentTime = t; v.play(); };
    box.appendChild(b);
    return [t, b];
  });
  v.addEventListener('timeupdate', () => {
    let cur = null;
    btns.forEach(([t, b]) => { if (v.currentTime >= t) cur = b; });
    btns.forEach(([, b]) => b.classList.toggle('on', b === cur));
  });
}
