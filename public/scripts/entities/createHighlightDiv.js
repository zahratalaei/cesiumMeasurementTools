export function createHighlightDiv() {
    const highlightDiv = document.createElement("div");
    highlightDiv.style.position = "absolute";
    highlightDiv.style.width = "6px";
    highlightDiv.style.height = "6px";
    highlightDiv.style.background = "red";
    highlightDiv.style.left = "0";
    highlightDiv.style.top = "0";
    highlightDiv.style.pointerEvents = "none";
    highlightDiv.style.display = "none";
    return highlightDiv;
  }