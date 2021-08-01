export default class WidgetController {
    constructor(instances, workLog) {
        this.instances = instances;
        this.workLog = workLog;
        this.init();
    }

    init() {
        this.initInstancesBlock()
        this.workLog.drawWorkLog();
        this.listeners();
    }

    listeners() {
        document.addEventListener('click', async event => {
            event.preventDefault();
            if (event.target.closest('.block-create-instance')) {
                const response = await fetch('http://192.168.1.57:7070/instances', {
                    method: 'POST',
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                }
            }

            if (event.target.closest('.start')) {
                const instanceBlock = event.target.closest('.instance-item-block')
                const response = await fetch(`http://192.168.1.57:7070/instances/${instanceBlock.dataset.id}/running`, {
                    method: 'PUT',
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                }
            }

            if (event.target.closest('.pause')) {
                const instanceBlock = event.target.closest('.instance-item-block')
                const response = await fetch(`http://192.168.1.57:7070/instances/${instanceBlock.dataset.id}/stopped`, {
                    method: 'PUT',
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                }
            }

            if (event.target.closest('.delete-button')) {
                const instanceBlock = event.target.closest('.instance-item-block')
                const response = await fetch(`http://192.168.1.57:7070/instances/${instanceBlock.dataset.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                }
            }
        })
    }

    // connectToServerEvent() {

    // }

    async initInstancesBlock() {
        this.instances.drawInstancesBlock();
        const response = await fetch('http://192.168.1.57:7070/instances',);
        if (response.ok) {
            const json = await response.json();
            if (json.length === 0) {
                return;
            }
            this.instances.drawInstance(json);
            this.eventSource()
        }

    }

    eventSource() {
        const eventSource = new EventSource('http://192.168.1.57:7070/sse');
        eventSource.addEventListener('message', (event) => {
            const item = JSON.parse(event.data);
            this.workLog.drawLog(item.log)
             if (item.data === null) {
                 return;
             }

             if (item.data.status === 'created') {
                this.instances.instance(item.data.instance);
                return;
             }
             const instanceArr = [...document.querySelectorAll(`.instance-item-block`)];
             const instance = instanceArr.find( i => i.dataset.id === item.data.instanceId);

             if (item.data.status === 'stopped') {
                this.instances.stopped(instance);
                return;
             }

             if (item.data.status === 'running') {
                this.instances.started(instance);
                return;
             }

             if (item.data.status === 'delete') {
                instance.parentElement.removeChild(instance);
                return;
             }

        })
        eventSource.addEventListener('open', (event) => {
            console.log(event);
        })
        eventSource.addEventListener('error', (event) => {
            console.log(event);
        })
    }
}