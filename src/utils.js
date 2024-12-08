function activeLinkSpecifier(isActive) {
  return ({ color: isActive ? 'var(--vividCyan)' : 'var(--lightTextColor)' });
}


function handleMouseMove(event, settingOffset) {
  if (window.innerWidth >= 768) {
    const { clientX, clientY, currentTarget } = event;

    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (clientX - centerX) / (width / 2);
    const offsetY = (clientY - centerY) / (height / 2);

    settingOffset({
      x: offsetX * 10,
      y: offsetY * 10,
    });
  }
};


export { activeLinkSpecifier, handleMouseMove };