document.addEventListener("DOMContentLoaded", function () {
  function getMorningColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50;
    const lightness = Math.floor(Math.random() * 20) + 80;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function getAfternoonColor() {
    const hue = Math.floor(Math.random() * 60) + 40;
    const saturation = Math.floor(Math.random() * 40) + 60;
    const lightness = Math.floor(Math.random() * 30) + 50;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function getEveningColor() {
    const hue = Math.floor(Math.random() * 240) + 210;
    const saturation = Math.floor(Math.random() * 20) + 50;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function getNightColor() {
    const hue = Math.floor(Math.random() * 240);
    const saturation = Math.floor(Math.random() * 10) + 20;
    const lightness = Math.floor(Math.random() * 20);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  function getTimeOfDay() {
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) {
      return "morning";
    } else if (currentTime >= 12 && currentTime < 17) {
      return "afternoon";
    } else if (currentTime >= 17 && currentTime < 20) {
      return "evening";
    } else {
      return "night";
    }
  }

  function applyColorsToContent(backgroundColor, fontColor) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "applyColor",
        color: backgroundColor,
        fontColor: fontColor,
      });
    });
  }

  function setTheme() {
    const timeOfDay = getTimeOfDay();
    const timeOfDayText = document.getElementById("timeOfDay");

    let backgroundColor;
    let fontColor;
    switch (timeOfDay) {
      case "morning":
        backgroundColor = getMorningColor();
        fontColor = "#000000";
        break;
      case "afternoon":
        backgroundColor = getAfternoonColor();
        fontColor = "#000000";
        break;
      case "evening":
        backgroundColor = getEveningColor();
        fontColor = "#333333";
        break;
      case "night":
        backgroundColor = getNightColor();
        fontColor = "#ffffff";
        break;
      default:
        backgroundColor = "#ffffff";
        fontColor = "#333333";
        break;
    }

    applyColorsToContent(backgroundColor, fontColor);

    timeOfDayText.textContent = `Time of Day: ${
      timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)
    }`;
  }

  function revertToOriginalColor() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
  }

  document
    .getElementById("changeColorBtn")
    .addEventListener("click", function () {
      setTheme();
    });

  document
    .getElementById("revertColorBtn")
    .addEventListener("click", function () {
      revertToOriginalColor();
    });
});
