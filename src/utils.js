function activeLinkSpecifier(isActive) {
  return ({ color: isActive ? 'var(--vividCyan)' : 'var(--light)' });
}


function handleMouseMove(event, /*settingOffset*/) {
  if (window.innerWidth >= 768) {
    const { clientX, clientY, currentTarget } = event;

    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (clientX - centerX) / (width / 2);
    const offsetY = (clientY - centerY) / (height / 2);

    // settingOffset({
    //   x: offsetX * 10,
    //   y: offsetY * 10,
    // });

    currentTarget.style.backgroundPosition = `${(offsetX * 10) + 50}% ${(offsetY * 10) + 50}%` ;
  }
};


export { activeLinkSpecifier, handleMouseMove };