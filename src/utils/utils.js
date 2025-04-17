import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';


// Distinguish active link from other links (link that is active in menu)
function activeLinkSpecifier(path, location, i18n) {
  return location.pathname === `/${i18n.language}${path}` ? {color: 'var(--vividCyan)'} : {color: 'var(--light)'}
}


function handleMouseMove(event) {
  if (window.innerWidth >= 768) {
    const { clientX, clientY, currentTarget } = event;

    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (clientX - centerX) / (width / 2);
    const offsetY = (clientY - centerY) / (height / 2);

    currentTarget.style.backgroundPosition = `${(offsetX * 10) + 50}% ${(offsetY * 10) + 50}%`;
  }
};


// Extract pure text from html data that recieved from backend
function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}


// Capitalize first letter of words in a sntence
function stringToTitle(str, delimiter=' ') {
  return str
    .split(delimiter)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


// Show Phone Number like International format
const formatPhoneNumber = (phoneNumber, country='IR') => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  try {
    // Parsing the phone number with the default country code (e.g. 'IR' for Iran)
    const number = phoneUtil.parse(phoneNumber, country);
    // Formatting the phone number in international format.
    const formatted = phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
    return formatted;
  } catch (error) {
    return phoneNumber;
  }
};


export { activeLinkSpecifier, handleMouseMove, extractTextFromHTML, stringToTitle, formatPhoneNumber };