function openVideoInNewTab(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.addEventListener("DOMContentLoaded", () => {
  const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            const videoUrl = button.getAttribute('data-src');
            openVideoInNewTab(videoUrl);
        });
    });

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
        if (i === index) {
          c.style.height = !isOpen ? `${c.scrollHeight}px` : "0px";
          ic.textContent = !isOpen ? "−" : "+";
        } else {
          c.style.height = "0px";
          ic.textContent = "+";
        }
      });
    });
  });

  const form = document.querySelector('form');
  const input = document.querySelector('input');
  console.log(form, input)
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (input.value.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Field',
        text: 'Enter username or userid or url',
        confirmButtonText: 'Okay'
      });
    } else {
      form.submit();
    }
  });
});
