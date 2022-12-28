class TextBoxCollabPlugin {
    constructor(viewer, collab = null) {
        this._viewer = viewer;
        this._collab = collab;
        this.textBoxManager = null;
        this.textBoxOperator = null;
        this._markupItemcallback = null;
    }


    initialize() {

        let _this = this;

        if (this._collab) {
            this._collab.registerMessageReceivedCallback(function (message) { return _this.hcCollabMessageReceived(message); });
        }
        this.textBoxManager = new hcTextBox.TextBoxManager(this._viewer, false);
        this.textBoxManager.setMarkupUpdatedCallback(function (markup, deleted) { _this.textBoxMarkupUpdated(markup, deleted); });

        this.textBoxOperator = new hcTextBox.TextBoxOperator(this._viewer, this.textBoxManager);
        this.textBoxOperator.setAllowCreation(0);

        this.textBoxOperator.setCreateMarkupItemCallback(function (manager, pos) { return _this.createMarkupItemCallback(manager, pos); });
        const markupOperatorHandle = this._viewer.operatorManager.registerCustomOperator(this.textBoxOperator);
        this._viewer.operatorManager.push(markupOperatorHandle);
        return markupOperatorHandle;
    }

    setMarkupItemCallback(callback) {
        this._markupItemcallback = callback;

    }
    
    createExtraDiv(text) {
        let html = "";
        html += '<div style="white-space: nowrap;overflow:hidden;pointer-events:none;position:absolute;left:0px;top:-18px;min-width:50px;width:100%;height:15px;';
        html += 'outline-width:inherit;outline-style:solid;background-color:white;background: white;font-size:12px;font-weight:bold"><div style="overflow:hidden;width:calc(100% - 38px)">' + text + '</div>';
        html += '<div title = "Delete" style="pointer-events:all;position:absolute;right:0px;top:0px;width:10px;font-size:10px;outline-style:solid;outline-width:1px;padding-left:1px;height:inherit;cursor:pointer">&#x2715</div>';
        html += '<div title = "Unpin" style="pointer-events:all;position:absolute;right:12px;top:0px;width:10px;font-size:10px;outline-style:solid;outline-width:1px;padding-left:1px;height:inherit;cursor:pointer"><span style="pointer-events:none;height:7px;width:7px;top:4px;left:2px;position:absolute;outline-color:black;outline-style:solid;outline-width:1px;border-radius:50%;display:inline-block;background-color:black"></span></div>';
        html += '<div  title = "Activate Visiblity Test" title = "Unpin" style="pointer-events:all;position:absolute;right:24px;top:0px;width:10px;font-size:10px;outline-style:solid;outline-width:1px;padding-left:1px;height:inherit;cursor:pointer">';
        html += '<div style="opacity:0.3;pointer-events:none;position:absolute;width:3px;height:3px;border:solid 1px #000;border-radius:50%;left:3px;top:5px;"></div><div style="opacity:0.3;pointer-events:none;position:absolute;width:7px;height:7px;border:solid 1px #000;border-radius:75% 15%;transform:rotate(45deg);left:1px;top:3px"></div></div>';
        html += '</div>';

        let _this = this;

        let titlediv = $(html);
        $("body").append(titlediv);
        let deleteButton = $(titlediv).children()[1];
        $(deleteButton).on("click", (e) => {
            _this.textBoxManager.delete(e.target.parentElement.parentElement.id);
        });


        let pinnedButton = $(titlediv).children()[2];
        $(pinnedButton).on("click", (e) => {
            let markup = _this.textBoxManager.getByID(e.target.parentElement.parentElement.id);
            markup.setPinned(!markup.getPinned());
            _this.updatePinned(markup);
        });

        let visibilityButton= $(titlediv).children()[3];
        $(visibilityButton).on("click", (e) => {
            let markup = _this.textBoxManager.getByID(e.target.parentElement.parentElement.id);
            markup.setCheckVisibility(!markup.getCheckVisibility());
            _this.updateVisiblityTest(markup);
        });


        $([deleteButton, pinnedButton, visibilityButton]).hover(
            function() { $( this).css("background-color", "lightgrey" ); }, function() { $( this).css("background-color", "white" );}
        );

        return titlediv;
    }


    textBoxMarkupUpdated(markup, deleted) {

        if (this._collab && this._collab.getActive() && !this._collab.getInternalSuspend()) {
            if (deleted) {
                this._collab.sendCustomMessage({ customType: "textboxmarkupdeleted", uniqueid: markup.getUniqueId() });
                return;
            }
            let json = markup.toJson();
            this._collab.sendCustomMessage({ customType: "textboxmarkupupdated", textboxdata: json });
        }
    }


    createMarkupItemCallback(manager, pos) {
        if (this._markupItemcallback) {
            return this._markupItemcallback(manager, pos);
        }
        else {
            if (this._collab) {
                let user = this._collab.getLocalUser();
                let extradiv = this.createExtraDiv(user.name);
                let backgroundColor = new Communicator.Color(user.color[0], user.color[1], user.color[2]);
                let markup = new hcTextBox.TextBoxMarkupItem(manager, pos, undefined, undefined, undefined, undefined, backgroundColor,
                    undefined, undefined, undefined, true, extradiv, undefined, { username: user.name, userid: user.id },false);
                return markup;
            }
            else {
               
                let extradiv = this.createExtraDiv("");
                let backgroundColor = new Communicator.Color(200,200,200);
                let markup = new hcTextBox.TextBoxMarkupItem(manager, pos, undefined, undefined, undefined, undefined, backgroundColor,
                    undefined, undefined, undefined, true, extradiv, undefined, null,false);
                return markup;
            }
        }
    }


    updatePinned(markup) {

        let pinnedPart = $(markup.getExtraDiv()).children()[2];
        if (markup.getPinned()) {
            $($(pinnedPart).children()[0]).css("background-color", "black");
            $(pinnedPart).prop('title', 'Unpin');
        }
        else {
            $($(pinnedPart).children()[0]).css("background-color", "white");
            $(pinnedPart).prop('title', 'Pin');
        }
    }


    updateVisiblityTest(markup) {

        let pinnedPart = $(markup.getExtraDiv()).children()[3];
        if (markup.getCheckVisibility()) {
            $($(pinnedPart).children()[0]).css("opacity", "1.0");
            $($(pinnedPart).children()[1]).css("opacity", "1.0");
            $(pinnedPart).prop('title', 'Deactivate Visiblity Test');
        }
        else {
            $($(pinnedPart).children()[0]).css("opacity", "0.3");
            $($(pinnedPart).children()[1]).css("opacity", "0.3");
            $(pinnedPart).prop('title', 'Activate Visiblity Test');
        }
    }


    setTextBoxMarkupAllowCreation(allow) {
        this.textBoxOperator.setAllowCreation(allow);
    }



    async hcCollabMessageReceived(msg) {

        switch (msg.type) {

            case "custommessage":
                {
                    switch (msg.customType) {
                        case "textboxmarkupupdated": {

                            let json = msg.textboxdata;
                            let markup = this.textBoxManager.getByID(json.uniqueid);
                            if (!markup) {

                                json.extraDivText = this.createExtraDiv(msg.user);
                                let user = this._collab.getUserInfo(msg.userid);
                                let backgroundColor = new Communicator.Color(user.color[0], user.color[1], user.color[2]);

                                json.backgroundColor = backgroundColor;
                                markup = hcTextBox.TextBoxMarkupItem.fromJson(this.textBoxManager, json);
                                if (markup.getCheckVisibility()) {
                                    markup.hide();
                                    this._viewer.redraw();
                                }        
                                this.textBoxManager.add(markup);
                                
                            }
                            else {
                                markup.setFirstPoint(Communicator.Point3.fromJson(json.firstPoint));
                                markup.setSecondPoint(Communicator.Point3.fromJson(json.secondPoint));
                                markup._secondPointRel = Communicator.Point2.fromJson(json.secondPointRel);
                                markup.setText(decodeURIComponent(json.text));
                                markup.setPinned(json.pinned);
                                markup.setCheckVisibility(json.checkVisibility);
                            }

                            this.updatePinned(markup);
                            this.updateVisiblityTest(markup);

                        }
                            break;
                        case "textboxmarkupdeleted": {
                            this.textBoxManager.delete(msg.uniqueid);
                        }
                            break;

                    }
                    break;
                }
                break;
            case "initialState": {

                if (msg.textBoxes) {
                    for (let i = 0; i < msg.textBoxes.length; i++) {
                        let json = msg.textBoxes[i];
                        json.extraDivText = this.createExtraDiv(json.userdata.username);
                        let backgroundColor;
                        let user = this._collab.getUserInfo(json.userdata.userid);
                        if (user) {                          
                            backgroundColor = new Communicator.Color(user.color[0], user.color[1], user.color[2]);
                        }
                        else {
                            backgroundColor = new Communicator.Color(255, 255, 255);
                        }

                        json.backgroundColor = backgroundColor;
                        let markup = hcTextBox.TextBoxMarkupItem.fromJson(this.textBoxManager, json);
                        if (markup.getCheckVisibility()) {
                            markup.hide();
                            this._viewer.redraw();
                        }
                        this.textBoxManager.add(markup);
                        this.updatePinned(markup);
                        this.updateVisiblityTest(markup);

                    }
                    let _this = this;
                    setTimeout(function () {
                        _this.textBoxManager.refreshMarkup();
                    }, 100);
                }
            }
                break;
            case "sendInitialState": {
                msg.textBoxes = this.textBoxManager.exportMarkup();
            }
                break;
        }

        return true;
    }


}