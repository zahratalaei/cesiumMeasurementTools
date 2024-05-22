export function createHighlightDiv() {
    const highlightDiv = document.createElement("div");
    highlightDiv.style.position = "absolute";
    highlightDiv.style.width = "3px";
    highlightDiv.style.height = "3px";
    highlightDiv.style.background = "red";
    highlightDiv.style.left = "0";
    highlightDiv.style.top = "0";
    highlightDiv.style.pointerEvents = "none";
    highlightDiv.style.display = "none";
    highlightDiv.style.zIndex = "1000";
    return highlightDiv;
  }