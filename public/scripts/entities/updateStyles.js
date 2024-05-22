// // Function to update button style
// export function updateButtonStyle(buttonId, bgColor,textColor,shadowRoot) {
//   // console.log("shadowRoot in updateButtonStyle:", shadowRoot); 
//     const button = shadowRoot.getElementById(buttonId);
//     if(button){
//     button.style.backgroundColor = bgColor;
//     button.style.color = textColor;
//   }
//   }
  export function updateButtonStyle(buttonId, bgColor, textColor) {
		const button = document.getElementById(buttonId);
		button.style.backgroundColor = bgColor;
		button.style.color = textColor;
  }
  