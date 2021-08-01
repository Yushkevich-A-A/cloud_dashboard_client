export default class Controller {
    constructor(instances, workLog) {
        this.instances = instances;
        this.workLog = workLog;
        this.init();
    }

    init() {
        console.log(33)
        console.log(5555555555555555555555555555555)
        this.initInstancesBlock()
        this.workLog.drawWorkLog();
        this.listeners();
        // this.connectToServerEvent();
    }

    listeners() {
        document.addEventListener('click', async event => {
            event.preventDefault();
            // if (event.target.closest('.block-create-instance')) {
            //     const response = await fetch('http://192.168.1.57:7070/instances',);

            //     if (response.ok) {
            //         const json = await response.json();
            //         console.log(json);
            //       }

            // }
        })
    }

    // connectToServerEvent() {

    // }

    async initInstancesBlock() {
        console.log(5555555555555555555555555555555)
        this.instances.drawInstancesBlock();
        const response = await fetch('http://192.168.1.57:7070/instances',);

        if (response.ok) {
            const json = await response.json();
            if (json.length === 0) {
                return;
            }
            this.instances.drawInstance(json);
            console.log(5555555555555555555555555555555)
        }
    }


}