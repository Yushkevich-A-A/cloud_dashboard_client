export default class DrawInstancesBlock {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  drawInstancesBlock() {
    this.instancesBlock = document.createElement('div');
    this.instancesBlock.classList.add('widget-block', 'block-instanses');
    this.instancesBlock.innerHTML = `<div class="widget-title-block">
                            <h2 class='widget-title'>Your micro instanses</h2>
                        </div>
                        <div class="content-block">
                            <ul class="instances-list">

                            </ul>
                            <div class="block-create-instance">
                                Create new instance
                            </div>
                        </div>`;
    this.wrapper.appendChild(this.instancesBlock);

    this.instancesList = this.instancesBlock.querySelector('.instances-list');
  }

  drawInstance(data) {
    this.instancesList.textContent = '';
    for (const i of data) {
      this.instance(i);
    }
  }

  instance(data) {
    const li = document.createElement('li');
    li.classList.add('instance-item-block');
    li.innerHTML = `<div class="block-instance-title">
                    <h3 class='instance-title'>12413512352-csqef-asdcv-sdfvsdfa</h3>
                </div>
                <div class="instance-information">
                    <div class="item-information instance-status">
                        <div class="item-information-title">
                            <h4 class="information-title">Status:</h4>
                        </div>
                        <div class="status-text-block">
                            <p class="status-text"></p>
                        </div>
                    </div>
                    <div class="item-information instance-action">
                        <div class="item-information-title">
                            <h4 class="information-title">Action:</h4>
                        </div>
                        <div class="action-block">
                            <div class="run-button"></div>
                            <div class="delete-button"></div>
                        </div>
                    </div>
                </div>`;
    li.dataset.id = data.id;
    this.instancesList.appendChild(li);

    const nameServer = li.querySelector('.instance-title');
    nameServer.textContent = data.id;

    if (data.state === 'stopped') {
      this.stopped(li);
    } else if (data.state === 'running') {
      this.started(li);
    }
  }

  started(element) {
    const statusTextBlock = element.querySelector('.status-text-block');
    statusTextBlock.classList.remove('stopped');
    statusTextBlock.classList.add('running');

    const statusText = element.querySelector('.status-text');
    statusText.textContent = 'Running';

    const runButton = element.querySelector('.run-button');
    runButton.classList.remove('start');
    runButton.classList.add('pause');
  }

  stopped(element) {
    const statusTextBlock = element.querySelector('.status-text-block');
    statusTextBlock.classList.remove('running');
    statusTextBlock.classList.add('stopped');

    const statusText = element.querySelector('.status-text');
    statusText.textContent = 'Stopped';

    const runButton = element.querySelector('.run-button');
    runButton.classList.remove('pause');
    runButton.classList.add('start');
  }
}
