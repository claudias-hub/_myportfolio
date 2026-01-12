const modal = document.getElementById('imgModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = modal.querySelector('.close-modal');
    let currentGroup = [];
    let currentIndex = 0;

    // open the slideshow for the clicked project
    document.querySelectorAll('.project-cover').forEach(cover => {
      cover.addEventListener('click', () => {
        // find the preview set inside the same project card
        const project = cover.closest('.grid-item');
        currentGroup = Array.from(project.querySelectorAll('.project-screenshot, .project-video'));
        currentIndex = 0;
        showCurrent();
        modal.classList.add('show');
      });
    });

    // next/prev only within that group
    document.getElementById('prevBtn').addEventListener('click', e => {
      e.stopPropagation();
      if (!currentGroup.length) return;
      if (currentIndex <= 0) {
        // we’re at the first slide → close
        closeModal();
        return;
      }
      currentIndex -= 1;
      showCurrent();
    });

    document.getElementById('nextBtn').addEventListener('click', e => {
      e.stopPropagation();
      if (!currentGroup.length) return;
      if (currentIndex >= currentGroup.length - 1) {
        // we’re at the last slide → close
        closeModal();
        return;
      }
      currentIndex += 1;
      showCurrent();
    });
    

    function showCurrent() {
      modalContent.innerHTML = ''; // Remove previous slide
      const el = currentGroup[currentIndex].cloneNode(true);
      el.removeAttribute('hidden');
      el.classList.remove('project-screenshot', 'project-video');
      el.style.maxHeight = '80vh';
      el.style.maxWidth = '90vw';
      modalContent.appendChild(el);
    } 

    // reusable close function
    function closeModal() {
      modal.classList.remove('show');
      modalContent.innerHTML = '';
      currentGroup = [];
    }

    // close by any method
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    window.addEventListener('keydown', e => { 
      // Only act when modal is open
      if (!modal.classList.contains('show') || !currentGroup.length) return;

      if (e.key === 'ArrowRight') {
        if (currentIndex >= currentGroup.length - 1) {
          closeModal();
        } else {
          currentIndex += 1;
          showCurrent();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex <= 0) {
          closeModal();
        } else {
          currentIndex -= 1;
          showCurrent();
        }
      } else if (e.key === 'Escape') {
        closeModal();
      }
    });