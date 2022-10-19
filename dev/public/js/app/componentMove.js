class ComponentMoveOperator {

    constructor(viewer) {
        this._viewer = viewer;
        this._mouseDown = false;
        this._component = null;
        this._disabled = false;
    }

    disable()
    {
        KT.KinematicsManager.viewer.selectionManager.clear();
        this._disabled = true;
    }

    enable()
    {
        this._disabled = false;
    }

    onMouseDown(event) {

        if (this._component && !this._disabled) {
            this._mouseDown = true;
            this._startPosition = event.getPosition().copy();
            this._currentcpos = this._component.getCurrentValue();
            event.setHandled(true);
        }

    }

    async onMouseMove(event) {
        if (this._disabled)
            return;
        let position = event.getPosition();

        if (this._mouseDown) {
            var p = event.getPosition();
            let value = (this._currentcpos + (p.x - this._startPosition.x)/2);

            
            hcCollab.setSuspendSend(true);
            let componentId = this._component.getId();
            let hierachyIndex = KT.KinematicsManager.getHierachyIndex(this._component.getHierachy());
            hcCollab.sendCustomMessage({ customType:"componentSet",componentId: componentId, hierachyIndex:hierachyIndex, value: value });     
            componentSetHash[hierachyIndex + "@" + componentId] = value;       
            await this._component.set(value);
            await this._component.getHierachy().updateComponents();
            hcCollab.setSuspendSend(false);

        }
        else {

            if (event.getButtons() != Communicator.Buttons.None)
                return;
            let view = this._viewer.view;
            let config = new Communicator.PickConfig(Communicator.SelectionMask.Line);
            this._component = null;
            view.pickFromPoint(position, config).then((selectionItem) => {

                let nodeId = selectionItem.getNodeId();
                if (nodeId) {
                    let component = null;
                    while (1) {
                        component = KT.KinematicsManager.getComponentFromNodeId(nodeId);
                        if (component !== null)
                            break;
                        nodeId = this._viewer.model.getNodeParent(nodeId);
                        if (nodeId == this._viewer.model.getRootNode()) {
                            break;
                        }
                    }

                    if (component !== null) {
                        if ((component.getBehavior().getMovementType() === KT.componentType.revolute || component.getBehavior().getMovementType() === KT.componentType.prismatic)  && !component.getAnimationActive()) {                     
                            this._component = component;
                        }

                    }
                }
            });
        }
    }


    onMouseUp(event) {

        if (this._mouseDown && !this._disabled) {
            this._mouseDown = false;
            this._component = null;
            event.setHandled(true);
        }
    }


}


