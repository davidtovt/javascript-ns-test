class Modal {
  constructor(button, options) {
    this.button = button;
    this.data = options.data;
    this.duration = options.duration ?? 0;
    this.onOpen = options.onOpen;
    this.onClose = options.onClose;

    if (this.data) {
      this.open();
      this.close();
    }
  }

  formatDate(date) {
    return new Date(date).toLocaleString('default', {
      month: 'long',
      day: 'numeric',
    });
  }

  async fetchData() {
    const response = await fetch(this.data);
    return await response.json();
  }

  async getRandomContent() {
    const events = await this.fetchData();
    const randomId = Math.floor(Math.random() * events.length);

    return events[randomId];
  }

  createModal(content) {
    const { name, from, to, color, talent } = content;

    const talents = talent.reduce((acc, talentName) => {
      acc += `<li><span>${talentName}</span></li>`;
      return acc;
    }, '');

    return `
    <div class="modal">
      <div class="modal-wrapper">
        <div class="modal-content" style="background-color: ${color};" >
          <h4 class="modal-title">
            <span>${name}</span>
          </h4>

          <time>
            ${this.formatDate(from)} - ${this.formatDate(to)}
          </time>

          <ul>${talents}</ul>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"></div>`;
  }

  open() {
    document.querySelector(this.button).addEventListener('click', async () => {
      const content = await this.getRandomContent();
      const modal = this.createModal(content);

      document.body.insertAdjacentHTML('beforeend', modal);

      this.onOpen();
    });
  }

  close() {
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('.modal')) {
        this.onClose();

        setTimeout(() => {
          document.querySelector('.modal').remove();
          document.querySelector('.modal-backdrop').remove();
        }, this.duration);
      }
    });
  }
}

export default Modal;
