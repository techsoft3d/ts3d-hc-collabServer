class TextBoxCollabPlugin {
    constructor(viewer) {
        this._viewer = viewer;
        this.textBoxMarkupTypeManager = null;
        this.textBoxMarkupOperator = null;
    }


    initialize() {

        let _this = this;

        hcCollab.registerMessageReceivedCallback(function (message) { return _this.hcCollabMessageReceived(message); });
        this.textBoxMarkupTypeManager = new TextBoxMarkupTypeManager(this._viewer, false);
        this.textBoxMarkupTypeManager.setMarkupUpdatedCallback(function (markup, deleted) { _this.textBoxMarkupUpdated(markup, deleted); });

        this.textBoxMarkupOperator = new TextBoxMarkupOperator(this._viewer, this.textBoxMarkupTypeManager);
        this.textBoxMarkupOperator.setAllowCreation(0);

        this.textBoxMarkupOperator.setCreateMarkupItemCallback(function (manager, pos) { return _this.createMarkupItemCallback(manager, pos); });
        const markupOperatorHandle = this._viewer.operatorManager.registerCustomOperator(this.textBoxMarkupOperator);
        this._viewer.operatorManager.push(markupOperatorHandle);
        return markupOperatorHandle;
    }

    createExtraDiv(text) {
        let html = "";
        html += '<div style="overflow:hidden;pointer-events:none;max-width:300px;position:absolute;left:0px;top:-18px;min-width:50px;width:inherit;height:15px;';
        html += 'outline-width:inherit;outline-style:solid;background-color:white;background: linear-gradient(90deg, #ada9d9, transparent);font-size:12px;font-weight:bold"><div style="overflow:hidden;width:calc(100% - 23px)">' + text + '</div>';
        html += '<div title = "Delete" style="pointer-events:all;position:absolute;right:0px;top:0px;width:10px;font-size:10px;outline-style:solid;outline-width:1px;padding-left:1px;height:inherit;cursor:pointer">&#x2715</div>;';
        html += '<div title = "Unpin" style="pointer-events:all;position:absolute;right:13px;top:0px;width:10px;font-size:10px;outline-style:solid;outline-width:1px;padding-left:1px;height:inherit;cursor:pointer"><span style="pointer-events:none;height:7px;width:7px;top:4px;left:2px;position:absolute;outline-color:black;outline-style:solid;outline-width:1px;border-radius:50%;display:inline-block;background-color:black"></span></div>;';
        html += '<div  title = "Activate Visiblity Test" title = "Unpin" style="opacity:0.3;pointer-events:all;position:absolute;right:26px;top:0px;width:10px;font-size:10px;outline-style:solid;outline-width:1px;padding-left:1px;height:inherit;cursor:pointer">';
        html += '<div style="pointer-events:none;position:absolute;width:3px;height:3px;border:solid 1px #000;border-radius:50%;left:3px;top:5px;"></div><div style="pointer-events:none;position:absolute;width:7px;height:7px;border:solid 1px #000;border-radius:75% 15%;transform:rotate(45deg);left:1px;top:3px"></div></div>;';
        html += '</div>';

        let _this = this;

        let test = $(html);
        $("body").append(test);
        let test2 = $(test).children()[1];
        $(test2).on("click", (e) => {
            _this.textBoxMarkupTypeManager.delete(e.target.parentElement.parentElement.id);
            _this.textBoxMarkupTypeManager.getByID(e.target.parentElement.parentElement.id);
        });


        let test3 = $(test).children()[2];
        $(test3).on("click", (e) => {
            let markup = _this.textBoxMarkupTypeManager.getByID(e.target.parentElement.parentElement.id);
            markup.setPinned(!markup.getPinned());
            _this.updatePinned(markup);
        });

        let test4= $(test).children()[3];
        $(test4).on("click", (e) => {
            let markup = _this.textBoxMarkupTypeManager.getByID(e.target.parentElement.parentElement.id);
            markup.setCheckVisibility(!markup.getCheckVisibility());
            _this.updateVisiblityTest(markup);
        });
        return test;
    }


    textBoxMarkupUpdated(markup, deleted) {

        if (hcCollab.getActive() && !hcCollab.getInternalSuspend()) {
            if (deleted) {
                hcCollab.sendCustomMessage({ customType: "textboxmarkupdeleted", uniqueid: markup.getUniqueId() });
                return;
            }
            let json = markup.toJson();
            hcCollab.sendCustomMessage({ customType: "textboxmarkupupdated", textboxdata: json });
        }
    }


    createMarkupItemCallback(manager, pos) {
        let user = hcCollab.getLocalUser();
        let extradiv = this.createExtraDiv(user.name + " (You)");
        let backgroundColor = new Communicator.Color(user.color[0], user.color[1], user.color[2]);
        let markup = new TextBoxMarkupItem(manager, pos, undefined, undefined, undefined, undefined, backgroundColor,
            undefined, undefined, undefined, true, extradiv, undefined, { username: user.name, userid: user.id },false);
        return markup;
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
            $(pinnedPart).css("opacity", "1.0");
            $(pinnedPart).prop('title', 'Deactivate Visiblity Test');
        }
        else {
            $(pinnedPart).css("opacity", "0.3");
            $(pinnedPart).prop('title', 'Activate Visiblity Test');
        }
    }


    setTextBoxMarkupAllowCreation(allow) {
        this.textBoxMarkupOperator.setAllowCreation(allow);
    }



    async hcCollabMessageReceived(msg) {

        switch (msg.type) {

            case "custommessage":
                {
                    switch (msg.customType) {
                        case "textboxmarkupupdated": {

                            let json = msg.textboxdata;
                            let markup = this.textBoxMarkupTypeManager.getByID(json.uniqueid);
                            if (!markup) {

                                json.extraDivText = this.createExtraDiv(msg.user);
                                let user = hcCollab.getUserInfo(msg.userid);
                                let backgroundColor = new Communicator.Color(user.color[0], user.color[1], user.color[2]);

                                json.backgroundColor = backgroundColor;
                                markup = TextBoxMarkupItem.fromJson(this.textBoxMarkupTypeManager, json);
                                if (markup.getCheckVisibility()) {
                                    markup.hide();
                                    this._viewer.redraw();
                                }        
                                this.textBoxMarkupTypeManager.add(markup);
                                
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
                            this.textBoxMarkupTypeManager.delete(msg.uniqueid);
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
                        let user = hcCollab.getUserInfo(json.userdata.userid);
                        if (user) {                          
                            backgroundColor = new Communicator.Color(user.color[0], user.color[1], user.color[2]);
                        }
                        else {
                            backgroundColor = new Communicator.Color(255, 255, 255);
                        }

                        json.backgroundColor = backgroundColor;
                        let markup = TextBoxMarkupItem.fromJson(this.textBoxMarkupTypeManager, json);
                        if (markup.getCheckVisibility()) {
                            markup.hide();
                            this._viewer.redraw();
                        }
                        this.textBoxMarkupTypeManager.add(markup);
                        this.updatePinned(markup);
                        this.updateVisiblityTest(markup);

                    }
                    let _this = this;
                    setTimeout(function () {
                        _this.textBoxMarkupTypeManager.refreshMarkup();
                    }, 100);
                }
            }
                break;
            case "sendInitialState": {
                msg.textBoxes = this.textBoxMarkupTypeManager.exportMarkup();
            }
                break;
        }

        return true;
    }


}