import WidgetController from './components/WidgetController';
import DrawInstancesBlock from './Components/DrawInstancesBlock/DrawInstancesBlock';
import Widget from './Components/DrawWidget/DrawWidget';
import DrawWorkLog from './Components/DrawWorkLog/DrawWorkLog';

const widget = new Widget();
const instances = new DrawInstancesBlock(widget.wrapper);
const workLog = new DrawWorkLog(widget.wrapper);
const controller = new WidgetController(instances, workLog);
