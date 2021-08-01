import WidgetController from './components/WidgetController';
import DrawInstancesBlock from './components/DrawInstancesBlock/DrawInstancesBlock';
import Widget from './components/DrawWidget/DrawWidget';
import DrawWorkLog from './components/DrawWorkLog/DrawWorkLog';

const widget = new Widget();
const instances = new DrawInstancesBlock(widget.wrapper);
const workLog = new DrawWorkLog(widget.wrapper);
const controller = new WidgetController(instances, workLog);
