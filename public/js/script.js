function openVideoInNewTab(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', function () {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoUrl = button.getAttribute('data-src');
            openVideoInNewTab(videoUrl);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach((accordion, index) => {
    const header = accordion.querySelector(".accordion__header");
    const content = accordion.querySelector(".accordion__content");
    const icon = accordion.querySelector("#accordion-icon");

    header.addEventListener("click", () => {
      const isOpen = content.style.height === `${content.scrollHeight}px`;

      accordions.forEach((a, i) => {
        const c = a.querySelector(".accordion__content");
        const ic = a.querySelector("#accordion-icon");

        c.style.height = i === index && !isOpen ? `${c.scrollHeight}px` : "0px";
        ic.classList.toggle("plus", i !== index || !isOpen);
      });
    });
  });
});
