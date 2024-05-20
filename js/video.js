const videoButton = document.getElementById('video-button');
const videoContainer = document.getElementById('video-container');

    videoButton.addEventListener('click', (event) => {
        if (videoContainer.style.display === 'none' || videoContainer.style.display === 'block') {
        videoContainer.style.top = '50%';
        videoContainer.style.left = '50%';
        videoContainer.style.transform = 'translate(-50%, -50%)';
        videoContainer.style.display = 'block';
        videoButton.style.display = 'none';
        }
    });
  
    document.body.addEventListener('click', (event) => {
    if (event.target!== videoButton && event.target!== videoContainer.firstChild) {
      videoContainer.style.display = 'none';
      videoButton.style.display = 'block';
    }
    });