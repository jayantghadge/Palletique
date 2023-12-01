chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "applyColor") {
    applyColors(request.color, request.fontColor);
  }
});

function applyColors(backgroundColor, fontColor) {
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    element.style.backgroundColor = backgroundColor;
    element.style.color = fontColor;
  });
}
