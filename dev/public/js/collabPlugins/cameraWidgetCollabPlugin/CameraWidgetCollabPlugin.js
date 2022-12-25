class CameraWidgetCollabPlugin {
    constructor(viewer, div) {
        this._viewer = viewer;

        hcCollab.registerMessageReceivedCallback(function (message, send) { return _this.hcCollabMessageReceived(message,send); });
        let _this = this;
        this.myCameraWidgetManager = new CameraWidgetManager(viewer);
        this.mySpriteManager = new SpriteManager(viewer);
        $("#" + div).prepend('<div id="hcCollabSpriteOverlay" style="width: 100%; height: 100%; background: none;z-index:10000;position: absolute;pointer-events:none"></div>');

        this.mySpriteManager.setNativeSpriteContainer("hcCollabSpriteOverlay");
        this.mySpriteManager.setSpriteClickedEvent(function (sprite) { _this.spriteClickedEvent(sprite); });
        this.showCameraWidgets = false;
        this.setupMeasureCanvas();

        new ResizeObserver(function () {
            setTimeout(function () {
                _this.handleResize();
                }, 250);
        }).observe(this._viewer.getViewElement());


    }


    
    setShowCameraWidgets(show) {
        this.showCameraWidgets = show;
        if (!show) {
            this.flushCameraWidgets();       
        }
    }

    getShowCameraWidgets() {
        return showCameraWidgets;
    }
    
    setSyncCamera(sync) {
        hcCollab.setSyncCamera(sync);
        if (sync) {
            this.flushCameraWidgets();
        }
        else {
            this._viewer.view.setTransparencyMode(0);       
        }

    }

    handleResize() {
        if (this.mySpriteManager) {
            this.mySpriteManager.handleResize();
        }
    }
    


    async flushCameraWidgets(deleteManager) {
        let users = hcCollab.getUsers();
        let unsuspend = false;
        if (!hcCollab.getSuspendSend()) {
            hcCollab.setSuspendSend(true);
            unsuspend = true;
        }
        this.mySpriteManager.flushAll();
        for (let i in users) {
            let user = users[i];
            if (user.cameraWidget) {
                await user.cameraWidget.flush();
                user.cameraWidget = null;
                user.label = null;
            }
        }
        if (deleteManager) {
            this.myCameraWidgetManager.deactivate();
        }
        if (unsuspend) {
            hcCollab.setSuspendSend(false);
        }
    }


    setupMeasureCanvas() {
        $("body").append('<div style="display:none;position:absolute;background: white; z-index:1000"><canvas id="dummycanvas" width="420px" height="150px;"></canvas></div>');
        this.ctxd = document.getElementById("dummycanvas").getContext('2d');
        let font = '50px Arial';
        this.ctxd.font = font;
        let m = this.ctxd.measureText("Hello World Test");
        let w = m.width + 40;
        let actualHeight = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) + 20;

        $("body").append('<div style="display:none"><div id="' + "camlabel" + '" style="height:' + actualHeight + 'px;width:' + w + 'px;text-align:center;border-radius:20px;display:block;pointer-events:none;font-family:arial;font-size:50px;position:absolute;background-color:rgba(0,0,0,0.5);color:white;display:block">Hello World Test</div></div>');
        this.devdiv = $("#camlabel");
    }

    spriteClickedEvent(sprite) {
        let users = hcCollab.getUsers();
        for (let i in users) {
            if (users[i].label == sprite) {
                this._viewer.view.setCamera(users[i].cameraWidget.getCamera(), 1000);
                break;
            }
        }
    }

    createLabel(text, color) {
        let m = this.ctxd.measureText(text);
        let w = m.width + 40;
        let actualHeight = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) + 20;
        this.devdiv.css("width", w + "px");
        this.devdiv.css("background-color", 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
        this.devdiv.html(text);
        text = text.replace(/ /g,"_");
        this.devdiv.attr("id","dynamic0" + text);
        return "dynamic0" + text;
    }
    

    async hcCollabMessageReceived(message,send) {

        switch (message.type) {

            case "camera":      
            {
                let users = hcCollab.getUsers();
                if (this.showCameraWidgets && !hcCollab.getSyncCamera() && users[message.userid]) {
                    let cam = Communicator.Camera.fromJson(message.camera);
                    let user = users[message.userid];
                    if (!user.cameraWidget) {
                        if (!this.myCameraWidgetManager.isActive()) {
                            await this.myCameraWidgetManager.initialize();
                        }
                       user.cameraWidget = new CameraWidget(this.myCameraWidgetManager, new Communicator.Color(user.color[0], user.color[1], user.color[2]), new Communicator.Color(user.color[0], user.color[1], user.color[2]),
                        0.4,true,false);
    
                    }
                    if (!user.label) {
                       let divid = this.createLabel(message.user, user.color);
                       user.label = await this.mySpriteManager.createDOMSprite(divid, cam.getPosition(), 0.4,false,false);
                    }
                    else {
                        await user.label.setPosition(cam.getPosition());
     
                     }

                        await user.cameraWidget.update(cam);

                    }
                }
                break;
            case "reset":
            case "isolate":
                {

                    await this.flushCameraWidgets();
                }
                break;
            case "clear":
                {

                    await this.flushCameraWidgets(true);
                }
                break;
            case "predelete": {
                let users = hcCollab.getUsers();
                for (let i in users) {
                    if (users[i].delete) {
                        let unsuspend = false;
                        if (!hcCollab.getSuspendSend()) {
                            hcCollab.setSuspendSend(true);
                            unsuspend = true;
                        }
                        if (users[i].cameraWidget) {
                            users[i].cameraWidget.flush();
                            this.mySpriteManager.flush(users[i].label.nodeid);
                        }
                        if (unsuspend) {    
                            hcCollab.setSuspendSend(false);
                        }
                    }
                }
        
            }
            break;
        }

        return true;
    }

}


