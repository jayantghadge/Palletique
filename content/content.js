function applyColors(backgroundColor, fontColor) {
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    element.style.backgroundColor = backgroundColor;
  });

  document.body.style.color = fontColor;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "applyColor") {
    applyColors(request.color, request.fontColor);
  }
});
