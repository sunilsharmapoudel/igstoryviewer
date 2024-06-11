    function openVideoInNewTab(url) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoUrl = button.getAttribute('data-src');
                openVideoInNewTab(videoUrl);
            });
        });
    });