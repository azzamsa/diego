// Get all pre. But ignore line numbers section
const snippets = document.querySelectorAll("div.highlight pre");

snippets.forEach(snippet => {
    const parent = snippet.parentNode;
    const wrapper = document.createElement("div");

    // Wrap code inside div.codecopy
    wrapper.classList.add("codecopy");
    parent.replaceChild(wrapper, snippet);
    wrapper.appendChild(snippet);

    // Create button
    const button = document.createElement("button");
    button.title = "Copy to clipboard";
    button.className = "codecopy-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Copy to clipboard");

    const img = document.createElement("img");
    img.className = "codecopy-icon";
    img.setAttribute("src", "/theme/img/clippy.svg");
    button.appendChild(img);


    // Add button to div.codecopy
    wrapper.insertBefore(button, snippet);
});

// Add copy to clipboard functionality
const clipboard = new ClipboardJS(".codecopy-btn", {
    target: trigger => {
        return trigger.parentNode;
    }
});

// Show message on success
clipboard.on("success", e => {
    console.log(e.trigger.childNodes[0]);
    e.trigger.setAttribute("aria-label", "Copied!");

    img = e.trigger.childNodes[0];
    img.setAttribute("src", "/theme/img/check-all.svg");
    img.setAttribute("style", "color: red");
    e.clearSelection();

    // Reset button text
    setTimeout(() => {
        e.trigger.setAttribute("aria-label", "Copy to clipboard");
        img.setAttribute("src", "/theme/img/clippy.svg");
    }, 400);
});
