export class TextBoxMarkupTypeManager {

    constructor(viewer, useMarkupManager = true) {
        this._viewer = viewer;
        this._markups = [];
        this._useMarkupManager = useMarkupManager;
        this._markupUpdatedCallback = null;

        let _this = this;
        if (!this._useMarkupManager) {
            new ResizeObserver(function () {
                setTimeout(function () {
                    _this.refreshMarkup();
                    }, 250);
            }).observe(this._viewer.getViewElement());


            this._viewer.setCallbacks({
                camera: function () {
                    setTimeout(function () {
                    _this.refreshMarkup();
                    }, 0);
                }
            });
        }
    }

    setMarkupUpdatedCallback(callback) {
        this._markupUpdatedCallback = callback;
    }

    getMarkupUpdatedCallback() {
        return this._markupUpdatedCallback;
    }


    handleResize() {
        if (!this._useMarkupManager) {
        let _this = this;
        setTimeout(function () {
            _this.refreshMarkup();
            }, 0);
        }
    }

    setUseMarkupManager(use) {
        this._useMarkupManager = use;
    }

    getUseMarkupManager() {
        return this._useMarkupManager;
    }

    add(markup) {
        this._markups.push(markup);
        if (this._useMarkupManager) {
            let uuid = this._viewer.markupManager.registerMarkup(markup);
            markup.setMarkupId(uuid);        
        }

    }
    
    delete(uniqueid) {
        for (let i=0;i<this._markups.length;i++) {

            if (this._markups[i].getUniqueId() == uniqueid) {    
                if (this.getMarkupUpdatedCallback()) {
                    this.getMarkupUpdatedCallback()(this._markups[i], true);
                }        
                this._viewer.markupManager.unregisterMarkup(this._markups[i].getMarkupId());
                this._markups[i].destroy();
                this._markups.splice(i,1);
                break;
            }
        }      
    }

    getByID(uniqueid) {
        for (let i=0;i<this._markups.length;i++) {

            if (this._markups[i].getUniqueId() == uniqueid) {            
                return this._markups[i];                
            }
        }      
    }

    getSelected() {
        for (let i=0;i<this._markups.length;i++) {

            if (this._markups[i].getSelected()) {            
                return this._markups[i];                
            }
        }      

    }
    
    exportMarkup() {
        let json = [];
        for (let i=0;i<this._markups.length;i++) {
            json.push(this._markups[i].toJson());
        }
        return json;
    }

       
    refreshMarkup() {
        if (this._useMarkupManager) {
            this._viewer.markupManager.refreshMarkup();
        }
        else {
            for (let i=0;i<this._markups.length;i++) {
                this._markups[i].draw();
            }
        }
    }


    pickMarkupItem(position) {
        if (this._useMarkupManager) {
            return this._viewer.markupManager.pickMarkupItem(position);
        }
        else {

            for (let i = 0; i < this._markups.length; i++) {
                if (this._markups[i].hit(position)) {
                    return this._markups[i];
                }
            }
            return null;
        }
    }

    loadData(json) {
        for (let i=0;i<json.length;i++) {
            let markup = TextBoxMarkupItem.fromJson(this, json[i]);
            markup.setAllowEditing(false);
            this.add(markup);
        }

        this.refreshMarkup();

    }

}



export class TextBoxMarkupItem extends Communicator.Markup.MarkupItem {


    static fromJson(typeManager,json) {
        let markup = new TextBoxMarkupItem(typeManager, Communicator.Point3.fromJson(json.firstPoint), Communicator.Point3.fromJson(json.secondPoint), Communicator.Point3.fromJson(json.secondPointRel), 
        json.font, json.fontSize, Communicator.Color.fromJson(json.backgroundColor), Communicator.Color.fromJson(json.circleColor), json.circleRadius, 
        json.maxWidth, json.pinned,json.extraDivText ? json.extraDivText : null, json.uniqueid,json.userdata);
        markup.setText(decodeURIComponent(json.text));
        markup.deselect();
        return markup;
    }

    static svgPointString(a) {
        let b = "";
        for (let c = 0; c < a.length; c++) 
            c && (b += " "),
            b += a[c].x + "," + a[c].y;
        return b;
    }


    

    constructor(typeManager, firstPoint, secondPoint = null,secondPointRel = null,fontStyle = "monospace", fontSize = "12px", backgroundColor =  new Communicator.Color(238,243,249),
         circleColor = new Communicator.Color(128,128,255), circleRadius = 4.0, maxWidth = 300, pinned = false, extraDiv = null,uniqueid = null, userdata = null) {
        super();
        this._textBoxMarkupTypeManager = typeManager;
        this._viewer = typeManager._viewer;
        this._font = fontStyle;
        this._fontSize = fontSize;
        if (uniqueid) {
            this._uniqueid = uniqueid;
        }
        else {
            this._uniqueid = this._generateGUID();
        }
        this._backgroundColor = backgroundColor;
        this._circleColor = circleColor;
        this._circleRadius = circleRadius;
        this._firstPoint = firstPoint.copy();
        this._allowEditing = true;
        this._extraDivText = extraDiv;
        this._userdata = userdata;

        this._selected = false;
        
        this._textHit = true;
        this._maxWidth = maxWidth;

        this._pinned = pinned;
        
        this._lineGeometryShape = new Communicator.Markup.Shape.Polyline();
        this._circleGeometryShape = new Communicator.Markup.Shape.Circle();

        if (secondPoint != null) {
            this._secondPoint = secondPoint.copy();
        }
        else {
            this.setSecondPoint(firstPoint.copy());
        }
        if (secondPointRel != null) {
            this._secondPointRel = secondPointRel.copy();
        }


        this._initialize();
    }

    getUserData() {
        return this._userdata;
    }

    getSelected() {
        return this._selected;
    }
    setAllowEditing(allow) {
        this._allowEditing = allow;
    }

    getAllowEditing() {
        return this._allowEditing;
    }

    destroy() {
        $(this._textBoxDiv).remove();
        if (!this._textBoxMarkupTypeManager.getUseMarkupManager()) {
            $(this._svgElement).remove();
        }
    }

    setText(text) {
        $(this._textBoxText).val(text);
        this._adjustTextBox();
        this._textBoxMarkupTypeManager.refreshMarkup();
    }

    setMarkupId(markupid) {
        this._markupId = markupid;
    }

    getMarkupId() {
        return this._markupId;
    }

    getUniqueId() {
        return this._uniqueid;
    }


    toJson() {
        let json = {
            "uniqueid": this._uniqueid,
            "font": this._font,
            "fontSize": this._fontSize,
            "backgroundColor": this._backgroundColor.toJson(),
            "circleColor": this._circleColor.toJson(),
            "circleRadius": this._circleRadius,
            "firstPoint": this._firstPoint.toJson(),
            "secondPoint": this._secondPoint.toJson(),
            "secondPointRel": this._secondPointRel.toJson(),
            "maxWidth": this._maxWidth,
            "pinned": this._pinned,
            "allowEditing": this._allowEditing,
            "text": this._textBoxText ? encodeURIComponent($(this._textBoxText).val()) : "",
            "userdata": this._userdata,

//            "extraDivText": encodeURIComponent($(this._extraDivText).val())
        };
        return json;
    }

    getExtraDiv() {
        return this._extraTextDiv;
    }

    setPinned(pinned) {
        this._pinned = pinned;
    }

    getPinned() {
        return this._pinned;
    }

    setBackgroundColor(color) {
        this._backgroundColor = color;
        $(this._textBoxDiv).css("background-color", "rgb(" + color.r + "," + color.g + "," + color.b + ")");
    }

    setCircleColor(color) {
        this._circleColor = color;
        this._textBoxMarkupTypeManager.refreshMarkup();

    }

    draw() {

        $(this._svgElement).empty();
        const renderer = this._viewer.markupManager.getRenderer();
        const view = this._viewer.view;
        this._lineGeometryShape.clearPoints();
        let p1 = Communicator.Point2.fromPoint3(view.projectPoint(this._firstPoint));
        this._lineGeometryShape.pushPoint(p1);
        this._circleGeometryShape.setCenter(p1);

        let dims = this._getDivDimensions();

        let p2;
        if (this._pinned) {
            p2 = new Communicator.Point2(this._secondPointRel.x * dims.width,this._secondPointRel.y * dims.height);
        }
        else {
            p2 = Communicator.Point2.fromPoint3(view.projectPoint(this._secondPoint));         
            this._secondPointRel = new Communicator.Point2(p2.x / dims.width, p2.y / dims.height);
        }

        let w = parseInt($(this._textBoxDiv).css("width"));
        let h = parseInt($(this._textBoxDiv).css("height"));
        let fsecond = new Communicator.Point2(0,0);
        if (p1.x <= p2.x + w/2) {
            fsecond.x = p2.x;
        }
        else {
            fsecond.x = p2.x + w;
        }

        if (p1.y <= p2.y + h/2) {
            fsecond.y = p2.y;
        }
        else {
            fsecond.y = p2.y + h;
        }


        this._lineGeometryShape.pushPoint(fsecond);
        
        if (!this._textBoxMarkupTypeManager.getUseMarkupManager()) {
            this._addPolylineElement(this._lineGeometryShape);
            this._addCircleElement(this._circleGeometryShape);
        }
        else {
            renderer.drawPolyline(this._lineGeometryShape);
            renderer.drawCircle(this._circleGeometryShape);
        }


        $(this._textBoxDiv).css("top", p2.y + "px");
        $(this._textBoxDiv).css("left", p2.x + "px");
    }

    hit(point) {

        let minx =  parseInt($(this._textBoxDiv).css("left"));
        let miny =  parseInt($(this._textBoxDiv).css("top"));
        let maxx = parseInt(minx) + parseInt($(this._textBoxDiv).css("width"));
        let maxy = parseInt(miny) + parseInt($(this._textBoxDiv).css("height"));

   
        if (point.x >= minx && point.x <= maxx &&
            point.y >= miny && point.y <= maxy) {
                this._textHit = true;
                return true;
        }

        if (this._extraTextDiv) {
            let pos = $(this._extraTextDiv).position();
            minx = minx + pos.left;
            miny = miny + pos.top;
            let maxx = minx + parseInt($(this._extraTextDiv).css("width"));
            let maxy = miny + parseInt($(this._extraTextDiv).css("height"));


            if (point.x >= minx && point.x <= maxx &&
                point.y >= miny && point.y <= maxy) {
                this.deselect();
                this._textHit = true;
                return true;
            }
        }



        let p1 = Communicator.Point2.fromPoint3(this._viewer.view.projectPoint(this._firstPoint));
        minx =  p1.x - 7;
        miny =  p1.y - 7;
        maxx =  p1.x + 7;
        maxy =  p1.y + 7;
        if (point.x >= minx && point.x <= maxx &&
            point.y >= miny && point.y <= maxy) {
                this._textHit = false;
                return true;
        }
        this.deselect();
        return false;            
    }

    setSecondPoint(point) {
        this._secondPoint = point.copy();
        let dims = this._getDivDimensions();

        let p = this._viewer.view.projectPoint(this._secondPoint);
        this._secondPointRel = new Communicator.Point2(p.x / dims.width, p.y / dims.height);
        if (this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()) {
            this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()(this);
        }
        
    }

    setFirstPoint(point) {
        this._firstPoint = point.copy();
        if (this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()) {
            this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()(this);
        }
    }

    getSecondPoint() {
        return this._secondPoint.copy();
    }

    select() {
        if (this._allowEditing) {
            $(this._textBoxText).attr("disabled", false);
            $(this._textBoxText).focus();
            $(this._textBoxDiv).css("pointer-events", "auto");
        }
        $(this._textBoxDiv).css("outline-width", "2px");
        this._selected = true;
    }

    deselect() {
        $(this._textBoxText).attr("disabled", true);
        $(this._textBoxDiv).css("pointer-events", "none");
        $(this._textBoxDiv).css("outline-width", "1px");
        this._selected = false;
    }

    unprojectTextAnchor() {
        let dims = this._getDivDimensions();
        this._secondPoint = this._viewer.view.unprojectPoint(new Communicator.Point2(this._secondPointRel.x * dims.width, this._secondPointRel.y * dims.height), 0.5);
        if (this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()) {
            this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()(this);
        }
    }


    _addPolylineElement(a) {        
        
        let c = TextBoxMarkupItem.svgPointString(a.getPoints());
        let d = document.createElementNS('http://www.w3.org/2000/svg', "polyline");
        d.setAttributeNS(null, "points", c);
        d.setAttributeNS(null, "fill", "none");
        d.setAttributeNS(null, "stroke", 'rgb(0, 0, 0)');
        d.setAttributeNS(null, "stroke-width", "1");
        $(this._svgElement)[0].appendChild(d);
    }


    _addCircleElement(element) {
        let a = element.getCenter();
        let b = element.getRadius();
        let c = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        c.setAttributeNS(null, "cx", a.x.toString());
        c.setAttributeNS(null, "cy", a.y.toString());
        c.setAttributeNS(null, "r", b.toString());

        c.setAttributeNS(null, "fill", 'rgb(' + this._circleColor.r + ',' +  this._circleColor.g + ',' + this._circleColor.b + ')');
        c.setAttributeNS(null, "fill-opacity", "1");

        c.setAttributeNS(null, "stroke", 'rgb(0, 0, 0)');
        c.setAttributeNS(null, "stroke-width", "1");
        $(this._svgElement)[0].appendChild(c);
    }

    _initialize() {
        this._lineGeometryShape.setStrokeWidth(1);
        this._circleGeometryShape.setFillColor(this._circleColor);
        this._circleGeometryShape.setRadius(this._circleRadius);
      
        this._setupTextDiv();
    }

    _setupTextDiv() {
        let html = "";
        html += '<div id="' + this._uniqueid + '" style="z-index:1;max-width:' + this._maxWidth + 'px;display:flex;outline-style:solid;outline-width:2px;position: absolute;';
        html += 'top:0px; left: 0px;width:100px;outline-color: rgb(76, 135, 190);background-color: rgb(' + this._backgroundColor.r + ',' + this._backgroundColor.g + ',' + this._backgroundColor.b + ');">';
        html += '<textarea autofocus style="max-width:' + this._maxWidth + 'px;margin: 1px 0px 3px 3px; resize: none;font-family:' + this._font + ';font-size:' + this._fontSize + ';height:' + (parseInt(this._fontSize)+3) + 'px;position: relative;outline: none;border: none;word-break: break-word;padding: 0 0 0 0;background-color: transparent;width: 100px;flex-grow: 1;overflow: hidden;"></textarea>';
        html += '</div>';

        if (!$("#measurecanvas").length) {
            $("body").append('<div style="display:none;position:absolute;background: white; z-index:1000"><canvas id="measurecanvas" width="420px" height="150px;"></canvas></div>');
            let ctxd = document.getElementById("measurecanvas").getContext('2d');
            ctxd.font = this._fontSize + " " + this._font;
        }

        let _this = this;
        $(this._viewer.getViewElement().parentElement).append(html);

        this._textBoxDiv = $("#" + this._uniqueid);
        this._textBoxText = $( this._textBoxDiv).children()[0];

        if (this._extraDivText) {
            $(this._textBoxDiv).append(this._extraDivText);        
            this._extraTextDiv = $( this._textBoxDiv).children()[1];
        }

        if (!this._textBoxMarkupTypeManager.getUseMarkupManager()) {
            this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this._viewer.getViewElement().parentElement.appendChild(this._svgElement);
            $(this._svgElement).css("position", "absolute");
            $(this._svgElement).css("pointer-events", "none");
            $(this._svgElement).css("width", "100%");
            $(this._svgElement).css("height", "100%");
        }


        $(this._textBoxText).on('input', (event) => {
            
          this._adjustTextBox();
          if (this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()) {
            this._textBoxMarkupTypeManager.getMarkupUpdatedCallback()(this);
        }

        });
        this.select();

    }

    _adjustTextBox() {

        let maxvalues = this._calculateMaxTextWidth();
        $(this._textBoxDiv).css("width", maxvalues.width + "px");

        $(this._textBoxText).css("height", "0px");
        $(this._textBoxText).css("height",  $(this._textBoxText)[0].scrollHeight + "px");

        this._textBoxMarkupTypeManager.refreshMarkup();

    }


    _calculateMaxTextWidth() {
        let ctxd = document.getElementById("measurecanvas").getContext('2d');
        let text = $(this._textBoxText).val();
      
        let textArray = text.split("\n");
        let rows = 0;
        let maxTextWidth = 0;
        
        for (let i = 0; i < textArray.length; i++) {

            let m = ctxd.measureText(textArray[i]);
           if (m.width >  maxTextWidth) {
                maxTextWidth = m.width;
            }
        }

        if (maxTextWidth  < 90) {
            maxTextWidth = 90;
        }
       
        return {width: maxTextWidth + 10};
    }

    _getDivDimensions() {
        
        return ({width:$(this._viewer.getViewElement()).outerWidth(),height:$(this._viewer.getViewElement()).outerHeight()});
    }

    _generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}


export class TextBoxMarkupOperator {
    constructor(viewer, textBoxMarkupTypeManager = null) {
        
        this._viewer = viewer;
        if (!textBoxMarkupTypeManager) {
            this._textBoxMarkupTypeManager = new TextBoxMarkupTypeManager(this._viewer);
            this._viewer.markupManager.registerMarkupTypeManager("TextBox",  this._textBoxMarkupTypeManager);
        }
        else {
            this._textBoxMarkupTypeManager = textBoxMarkupTypeManager;
        }

        this._allowCreation = 2;
        this._createMarkupItemCallback = null;

        this._mouseActivationCallback = null;

        // this._mouseActivationCallback = function(event) {
        //     return (event.getButton() == Communicator.Button.Left && event.shiftDown());
        // };
    }

    setAllowCreation(allowCreation) {
        this._allowCreation = allowCreation;
    }

    getTextBoxTypeManager() {
        return this._textBoxMarkupTypeManager;
    }


    setCreateMarkupItemCallback(callback) {
        this._createMarkupItemCallback = callback;
    }

    setMouseActivationCallback(callback) {
        this._mouseActivationCallback = callback;
    }

    onMouseDown(event) {

        this._handled = false;
        if ((!this._mouseActivationCallback && event.getButton() == Communicator.Button.Left) ||
            (this._mouseActivationCallback && this._mouseActivationCallback(event))) {
            const markup = this._textBoxMarkupTypeManager.pickMarkupItem(event.getPosition());
            if (markup && markup instanceof TextBoxMarkupItem) {
                if (markup.getPinned()) {
                    markup.unprojectTextAnchor();                    
                }
                this._offset = Communicator.Point2.subtract(event.getPosition(), this._viewer.view.projectPoint(markup.getSecondPoint()));
                this._dClickTime = new Date();
                this._activeMarkupItem = markup;
                this._handled = true;


            }
            else {
                if (this._allowCreation) {
                    this._addMarkupItem(event.getPosition());
                    if (this._allowCreation == 1) {
                        this._allowCreation = 0;
                    }

                }
            }
        }
        event.setHandled(this._handled);

    }
    onMouseMove(event) {
        this._dClickTime = null;

        event.setHandled(this._handled);
        if (this._activeMarkupItem !== null && this._handled) {
            this._updateActiveMarkupItem(event.getPosition());
        }
    }

    onMouseUp(event) {

        if (this._dClickTime !== null) {
                this._activeMarkupItem.select();

        }
        this._dClickTime = null;
        event.setHandled(this._handled);
        this._activeMarkupItem = null;
    }

    async _addMarkupItem(position) {
        const model = this._viewer.model;
        const config = new Communicator.PickConfig(Communicator.SelectionMask.Face);
        const selectionItem = await this._viewer.view.pickFromPoint(position, config);
        if (selectionItem === null || !!selectionItem.overlayIndex()) {
            return;
        }
        const nodeId = selectionItem.getNodeId();
        const selectionPosition = selectionItem.getPosition();
        const faceEntity = selectionItem.getFaceEntity();
        if (nodeId === null || selectionPosition === null || faceEntity === null) {
            return;
        }
        const parentNodeId = model.getNodeParent(nodeId);
        if (parentNodeId === null) {
            return;
        }
        if (!this._createMarkupItemCallback) {
            this._activeMarkupItem = new TextBoxMarkupItem(this._textBoxMarkupTypeManager, selectionPosition);
        }
        else {
            this._activeMarkupItem = this._createMarkupItemCallback(this._textBoxMarkupTypeManager, selectionPosition);
        }
        this._textBoxMarkupTypeManager.add(this._activeMarkupItem);

      
        this._offset = new Communicator.Point2(0,0);
        this._updateActiveMarkupItem(position);

        this._handled = true;
    }

    async _updateActiveMarkupItem(position) {
        if (this._activeMarkupItem === null) {
            return;
        }

        if (!this._activeMarkupItem._textHit) {

            const model = this._viewer.model;
            const config = new Communicator.PickConfig(Communicator.SelectionMask.Face);
            const selectionItem = await this._viewer.view.pickFromPoint(position, config);
            if (selectionItem === null || !!selectionItem.overlayIndex()) {
                return;
            }
            const nodeId = selectionItem.getNodeId();
            const selectionPosition = selectionItem.getPosition();
            const faceEntity = selectionItem.getFaceEntity();
            let selectionSuccess = true;
            if (nodeId === null || selectionPosition === null || faceEntity === null) {
                selectionSuccess = false;
            }
            const parentNodeId = model.getNodeParent(nodeId);
            if (parentNodeId === null) {
                selectionSuccess = false;
            }

            if (!selectionSuccess) {
                let c = this._viewer.view.getCamera();
                let pos = c.getPosition();
                let tar = c.getTarget();
                let vec = Communicator.Point3.subtract(tar, pos).normalize();
                let cameraplane = Communicator.Plane.createFromPointAndNormal(this._activeMarkupItem.getSecondPoint(), vec);

                let out = new Communicator.Point3();
                let ray = this._viewer.view.raycastFromPoint(new Communicator.Point2(position.x, position.y));
                let res = null;
                res = cameraplane.intersectsRay(ray, out);
                if (res) {
                    this._activeMarkupItem.setFirstPoint(new Communicator.Point3(out.x, out.y, out.z));
                }
            }
            else {
                this._activeMarkupItem.setFirstPoint(selectionPosition);
            }
            this._textBoxMarkupTypeManager.refreshMarkup();

            return;
        }

        let c = this._viewer.view.getCamera();
        let pos = c.getPosition();
        let tar = c.getTarget();
        let vec = Communicator.Point3.subtract(tar, pos).normalize();
        let cameraplane = Communicator.Plane.createFromPointAndNormal(this._activeMarkupItem.getSecondPoint(), vec);

        let out = new Communicator.Point3();
        let ray = this._viewer.view.raycastFromPoint(new Communicator.Point2(position.x - this._offset.x, position.y - this._offset.y));
        let res = null;
        res = cameraplane.intersectsRay(ray, out);
        if (res) {
            this._activeMarkupItem.setSecondPoint(new Communicator.Point3(out.x, out.y, out.z));
            this._textBoxMarkupTypeManager.refreshMarkup();
        }
        
    }
}
