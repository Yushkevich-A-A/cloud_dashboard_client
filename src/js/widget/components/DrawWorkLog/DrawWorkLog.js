import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawWorkLog {
  constructor(wrapper) {
    this.wrapper = wrapper;
  }

  drawWorkLog() {
    this.worklog = document.createElement('div');
    this.worklog.classList.add('widget-block', 'block-worklog');
    this.worklog.innerHTML = `<div class="widget-title-block">
                        <h2 class='widget-title'>Worklog</h2>
                    </div>
                    <div class="content-block">
                        <ul class="log-list">
                        </ul>
                    </div>`;
    this.wrapper.appendChild(this.worklog);

    this.logList = this.worklog.querySelector('.log-list');
  }

  drawLog(data) {
    const li = document.createElement('li');
    li.classList.add('log-item');
    li.innerHTML = `<div class="log-date"></div>
    <div class="log-information">
        <div class="block-information server-name-information">
            Server: <span class="server-name-text"></span>
        </div>
        <div class="block-information server-information">
            INFO: <span class="server-info-text"></span>
        </div>
    </div>`;
    this.logList.appendChild(li);

    const date = li.querySelector('.log-date');
    date.textContent = moment(data.date).format('HH:mm:ss DD.MM.YYYY');
    const serverName = li.querySelector('.server-name-text');
    serverName.textContent = data.id;
    const serverInfo = li.querySelector('.server-info-text');
    serverInfo.textContent = data.text;
  }
}
