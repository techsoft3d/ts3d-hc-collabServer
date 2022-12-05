export class SpriteManager {

    constructor(viewer) {
        this._viewer = viewer;
        this._meshHash = [];
        this._spriteNode = this._viewer.model.createNode(this._viewer.model.getAbsoluteRootNode(), "sprites");  
        this._imageHash = [];
        this._sprites = [];
        this._alwaysInFront = true;
        this._lastCamPosition = new Communicator.Point3(0, 0, 0);
        this._lastCheckDate = new Date();
        this._updateVisibilities();
        this._nativeSpriteCounter = 1111111111;
        this._nativeSpriteContainer = "";
        this._wasDragged = false;
        this._spriteClickedEvent = null;

        let _this = this;
        this._viewer.setCallbacks({
            camera: function (camera) {
                _this._updateDOMSprites(camera);
            }               
        });

    }

    setSpriteClickedEvent(event) {
        this._spriteClickedEvent = event;
    }

    _updateDOMSprite(sprite, camera) {

        let ppoint = this._viewer.view.projectPoint(sprite.center, camera);
        let offsetx, offsety;
        if (sprite.offsetdata.x == undefined) {
            offsetx = -sprite.offsetdata.width / 2;
        }
        else {
            offsetx = sprite.offsetdata.x + sprite.offsetdata.width / 2 * (1 - sprite.scale);
        }

        if (sprite.offsetdata.y == undefined) {
            offsety = -sprite.offsetdata.height / 2;
        }
        else {
            offsety = sprite.offsetdata.y + sprite.offsetdata.height / 2 * (1 - sprite.scale);
        }

        $("#" + sprite.nodeid).css({ left: (ppoint.x + offsetx) + "px", top: (ppoint.y + offsety) + "px", position: 'absolute' });
    }

    _updateDOMSprites(camera) {
        for (let i in this._sprites) {
            if (this._sprites[i].isNative) {
                let sprite = this._sprites[i];
                this._updateDOMSprite(sprite, camera);
            }
        }
    }

  


    setNativeSpriteContainer(container) {
        this._nativeSpriteContainer = container;
        let _this = this;
        $("#" + this._nativeSpriteContainer).mousemove(function (e) {
            if (e.which == 1) {
                _this._wasDragged = true;
                if (_this._movedSprite && _this._movedSprite.allowDrag) {
                    let deltaDown = new Communicator.Point2(_this._startDown.x + (e.offsetX - _this._startDown.x),
                        _this._startDown.y + (e.offsetY - _this._startDown.y));
                    let c = _this._viewer.view.getCamera();
                    let pos = c.getPosition();
                    let tar = c.getTarget();
                    let vec = Communicator.Point3.subtract(tar, pos).normalize();
                    let cameraplane = Communicator.Plane.createFromPointAndNormal(_this._movedSprite.center, vec);

                    let out = new Communicator.Point3();
                    let ray = _this._viewer.view.raycastFromPoint(new Communicator.Point2(deltaDown.x, deltaDown.y));
                    let res = null;
                    res = cameraplane.intersectsRay(ray, out);
                    if (res) {
                        _this._movedSprite.center.x = out.x;
                        _this._movedSprite.center.y = out.y;
                        _this._movedSprite.center.z = out.z;
                    }
                    _this._updateDOMSprite(_this._movedSprite, _this._viewer.view.getCamera());
                }
            }
        });


        $(window).mouseup(function (e) {
            if (e.which == 1) {
                $("#" + _this._nativeSpriteContainer).css("pointer-events", "none");
                if (_this._movedSprite) {
                    if (!_this._wasDragged && _this._spriteClickedEvent) {
                        _this._spriteClickedEvent(_this._movedSprite);
                    }
                    $("#" + _this._movedSprite.nodeid).css("box-shadow", "");
                    _this._movedSprite = null;
                    for (let i in _this._sprites) {
                        if (_this._sprites[i].isNative) {
                            $("#" + i).css("pointer-events", "all");
                        }
                    }
                }
            }

        });

    }

    _getImage(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.crossOrigin="anonymous";
            img.addEventListener("load", function () {
                resolve({img:img,dims:new Communicator.Point2(this.naturalWidth,this.naturalHeight)});
            });
            img.src = url;
        });
    }

    _getDataUrl(img) {
    
        const canvas = document.createElement('canvas');    
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;     
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
    }

    async _updateDynamicImage(div) {
           
        let canvas = $("#" + div).find("canvas")[0];
        if (!canvas) {
        canvas =  await html2canvas(document.querySelector("#" + div),{
            onclone: function (clonedDoc) {
                clonedDoc.querySelector("#" + div).style.display = 'block';
            }});
        }
        return {durl: canvas.toDataURL('image/png'), dims :{x:canvas.width, y:canvas.height}};
    }


    _convertDataURIToBinary(dataURI) {
        var base64Index = dataURI.indexOf(";base64,") + 8;
        var raw = window.atob(dataURI.substring(base64Index));
        return Uint8Array.from(Array.prototype.map.call(raw, function(c) {
            return c.charCodeAt(0);
        }));
    }

    async addImage(type, url_in, offsetx, offsety) {
        var url;

        if (url_in == undefined)
            url = type;
        else
            url = url_in;

        var res = await this._getImage(url);
        var imgBinary = this._convertDataURIToBinary(this._getDataUrl(res.img));

        var imageOptions = {
            format: Communicator.ImageFormat.Png,
            data: imgBinary,
        };
        let of = "none";
        if (offsetx != undefined || offsety != undefined) {
            of = offsetx + "@" + offsety;
        }
        else {
            of = "none";
        }
        if (offsetx == undefined) {
            offsetx = 0;
        }
        if (offsety == undefined) {
            offsety = 0;
        }


        var mesh = this._meshHash[of];
        if (mesh == undefined) {
            mesh = await this._createSpriteMesh(-offsetx / res.dims.x, -offsety / res.dims.y);
            this._meshHash[of] = mesh;
        }

        var imageid = await this._viewer.model.createImage(imageOptions);
        this._imageHash[type] = {id: imageid, mesh:mesh, dims: {width:res.dims.x, height:res.dims.y}, offsetx:offsetx, offsety:offsety};
    }

    async updateDynamicSprites(div) {

      //  this._viewer.pauseRendering();
        let image = this._imageHash[div];
        let oldid = image.id;

        let res = await this._updateDynamicImage(div);
        let imgBinary  = this._convertDataURIToBinary(res.durl);
        
        var imageOptions = {
            format: Communicator.ImageFormat.Png,
            data: imgBinary,
        };

        let imageid = await this._viewer.model.createImage(imageOptions);
        
        
        let nodeids = [];
        for (let i in this._sprites) {
            if (this._sprites[i].type == div) {
                let children = this._viewer.model.getNodeChildren(parseInt(i));
                if (this._sprites[i].flip == 0) {
                    nodeids.push(children[1]);
                    this._sprites[i].flip = 1;
                    setTimeout(() => {
                        this._viewer.model.setNodesVisibility([children[0]], false);
                        this._viewer.model.setNodesVisibility([children[1]], true);
                    }, 100);
                }
                else
                {
                    nodeids.push(children[0]);
                    this._sprites[i].flip = 0;
                    setTimeout(() => {
                        this._viewer.model.setNodesVisibility([children[1]], false);
                        this._viewer.model.setNodesVisibility([children[0]], true);
                    }, 100);
                }                
               
            }
        }


        await this._viewer.model.setNodesTexture(nodeids, { imageId: imageid});

        await this._viewer.model.deleteImages([oldid]);
        
        image.id = imageid;
       // this._viewer.resumeRendering();

    }

    async _addDOMImage(url, offsetdata) {

        if (!this._imageHash[url]) {
    
            let res = await this._getImage(url);

            offsetdata.width = res.dims.x;
            offsetdata.height = res.dims.y;
            this._imageHash[url] = { id: null, mesh: null, dims: offsetdata };
        }
        else {
            offsetdata.width = this._imageHash[url].dims.width;
            offsetdata.height = this._imageHash[url].dims.height;
        }

        let nn = ('image-' + this._nativeSpriteCounter++);

        let text = '<div id="' + nn + '" style="position:absolute"><img src="' + url + '"></div>';
        $("#" + this._nativeSpriteContainer).append(text);

        $("#" + nn).css("display", "block");
        $("#" + nn).css("z-index", "20000");
        $("#" + nn).css("pointer-events", "all");
        
        return nn;
    }
    

    _addDOMDiv(div, dynamic, width, height)    {
      
       
        let nn = (div + '-clone-' + this._nativeSpriteCounter++);
        let html = '<div id="' + nn + '"></div>';

        $("#" +  this._nativeSpriteContainer).append(html);

                  
      
        let res = $("#" + nn);

        res.css("display", "block");
        res.css("z-index", "20000");
        res.css("pointer-events", "all");
        res.css("width", width +  "px");
        res.css("height", height + "px");

        if (dynamic) {

            $("#" + div).appendTo(res);
            return nn;
        }

        let clone = $("#" + div).clone();
        clone.removeAttr("id");
       
        let canvas =$("#" + div).find("canvas")[0];
        if (canvas) {
            let canvas2  =clone.find("canvas")[0];
            var context = canvas2.getContext('2d');
            context.drawImage(canvas,0,0);
        }
        res.append(clone);
        return nn;
    }


    async _addDynamicImage(div, offsetx, offsety)    {
      

        let res = await this._updateDynamicImage(div);
        let imgBinary  = this._convertDataURIToBinary(res.durl);

     
        var imageOptions = {
            format: Communicator.ImageFormat.Png,
            data: imgBinary,
        };
        var of = "none";
        if (offsetx != undefined || offsety != undefined) {
            if (offsetx == undefined) {
                offsetx = 0;
            }
            if (offsety == undefined) {
                offsety = 0;
            }
            of = offsetx +"@" + offsety;
        }
        var mesh = this._meshHash[of];

        if (mesh == undefined)
        {
            mesh = await this._createSpriteMesh(offsetx, offsety);
            this._meshHash[of] = mesh;
        }

        var imageid = await this._viewer.model.createImage(imageOptions);
        this._imageHash[div] = {id: imageid, mesh:mesh, dims: {width:res.dims.x, height:res.dims.y}};
    }

    async _createSpriteMesh (offsetx, offsety) {
        var meshData = new Communicator.MeshData();
        meshData.setFaceWinding(Communicator.FaceWinding.Clockwise);
     
        var sizex = 1, sizey=  1;

        var xoffset=0,yoffset=0;
        if (offsetx != undefined) {
            xoffset = offsetx;
        }
        if (offsety != undefined) {
            yoffset = offsety;
        }
       
      
        meshData.addFaces(
            [
                -sizex + xoffset, -sizey  + yoffset, 0,
                -sizex + xoffset, sizey + yoffset, 0,
                sizex + xoffset, sizey + yoffset, 0,
                -sizex + xoffset, -sizey + yoffset, 0,
                sizex + xoffset, sizey + yoffset, 0,
                sizex + xoffset, -sizey + yoffset, 0
            ],
            null,
            null,
            [
                0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0,
            ]

        );

        return await this._viewer.model.createMesh(meshData);
    }


    async _setupInstance(mesh, lnode,is3D) {
        let myMeshInstanceData = new Communicator.MeshInstanceData(mesh);
        let mi = await this._viewer.model.createMeshInstance(myMeshInstanceData, lnode);

        this._viewer.model.setInstanceModifier(Communicator.InstanceModifier.AlwaysDraw, [mi], true);
        if (!is3D) {
            this._viewer.model.setInstanceModifier(Communicator.InstanceModifier.ScreenOriented, [mi], true);
        }

        this._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotLight, [mi], true);
        this._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotCut, [mi], true);
        this._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotXRay, [mi], true);
        if (!is3D) {
            this._viewer.model.setInstanceModifier(Communicator.InstanceModifier.SuppressCameraScale, [mi], true);
            this._viewer.model.setDepthRange([mi], 0, 0.1);
        }
        return mi;
    }

    async _createSpriteInstance(mesh, lnodein, is3D,dynamic) {
        let lnode;
        if (lnodein) {
            lnode = parseInt(lnodein);
            let children = this._viewer.model.getNodeChildren(lnode);
            for (let i=0;i<children.length;i++) {
                hwv.model.deleteNode(children[i]);
            }
        }
        else {
            lnode = this._viewer.model.createNode(this._spriteNode);
        }

        await this._setupInstance(mesh,lnode,is3D);

        if (dynamic) {
            let node = await this._setupInstance(mesh,lnode,is3D);
            this._viewer.model.setNodesVisibility([node], false);

        }
        return lnode;
    }


    async createDOMSprite(div,pos,scale = 1.0, dynamic = false,isImage = false,visibilityRange = null,payload = null, offsetx = undefined,offsety = undefined) {
        let offsetdata = {};
        let lnode;
        if (!isImage) {
            offsetdata = {};
            offsetdata.width = $("#" + div).width();
            offsetdata.height = $("#" + div).height();

            lnode = this._addDOMDiv(div, dynamic, offsetdata.width, offsetdata.height);
        }
        else {
            lnode = await this._addDOMImage(div, offsetdata);
        }

        let _this = this;
        $("#" + lnode).mousedown(function (e) {
            if (e.which == 1) {
                _this._wasDragged = false;
                $("#" + _this._nativeSpriteContainer).css("pointer-events", "auto");
                _this._movedSprite = _this._sprites[lnode];
                _this._startDown = new Communicator.Point2(e.offsetX, e.offsetY, 0);
                let pos = $("#" + lnode).position();
                _this._initialPos = new Communicator.Point2(pos.left, pos.top);

                $("#" + _this._movedSprite.nodeid).css("box-shadow", "0 0 5px #ffff00, 0 0 10px #ffff00, 0 0 15px #ffff00, 0 0 20px #ffff00");

                for (let i in _this._sprites) {
                    if (_this._sprites[i].isNative) {
                        $("#" + i).css("pointer-events", "none");
                    }
                }
            }

        });


          if (visibilityRange != undefined) {

                $("#" + lnode).css("display","none");
          }

        if (this._imageHash[div] && this._imageHash[div].offsetx) {            
            offsetdata.x = this._imageHash[div].offsetx;
        }
        else {
            offsetdata.x = offsetx;
        }

        if (this._imageHash[div] && this._imageHash[div].offsety) {            
            offsetdata.y = this._imageHash[div].offsety;
        }
        else {
            offsetdata.x = offsety;
        }
       


        if (scale) {
            $("#" + lnode).css("transform", "scale(" + scale + ")");
        }
        this._sprites[lnode] = new Sprite(this,lnode,pos,scale,div, visibilityRange,payload,dynamic,true,offsetdata);    
        this._updateDOMSprites( this._viewer.view.getCamera());
        return  this._sprites[lnode];
    }


    async createSprite(type, pos, scale = 1.0, dynamic = false,visibilityRange = null, payload = null, is3D = false, matrix = null, offsetx = undefined, offsety = undefined) {

        let lnode;
        if (!dynamic) {
            if (this._imageHash[type] == undefined) {
                await this.addImage(type,undefined,offsetx,offsety);
            }
        }
        else {
            if (this._imageHash[type] == undefined) {
                await this._addDynamicImage(type,offsetx,offsety);
            }
        }


        lnode = await this._createSpriteInstance(this._imageHash[type].mesh, undefined, is3D, dynamic);

        if (visibilityRange != undefined) {
            this._viewer.model.setNodesVisibility([lnode], false);
        }
        
        if (!matrix) {
            var tmatrix = new Communicator.Matrix();
            var smatrix = new Communicator.Matrix();
            let scalex = scale;
            let scaley = scale;
            var ar = this._imageHash[type].dims.width / this._imageHash[type].dims.height;
            if (ar > 1) {
                scaley = scale;
                scalex = scale * ar;
            }
            if (ar < 1) {
                scalex = scale * ar;
                scaley = scale;
            }

            smatrix.setScaleComponent(scalex, scaley, 1);
            tmatrix.setTranslationComponent(pos.x, pos.y, pos.z);

            var mat = Communicator.Matrix.multiply(smatrix, tmatrix);
            this._viewer.model.setNodeMatrix(lnode, mat);
        }
        else {
            this._viewer.model.setNodeMatrix(lnode, matrix);
        }

        if (!dynamic) {
            await this._viewer.model.setNodesTexture([lnode], { imageId: this._imageHash[type].id });
        }
        else {
            let children = this._viewer.model.getNodeChildren(lnode);
            await this._viewer.model.setNodesTexture([children[0]], { imageId: this._imageHash[type].id });
        }

        this._sprites[lnode] = new Sprite(this,lnode, pos, scale,type, visibilityRange,payload,dynamic, false);
        this._sprites[lnode].set3D(matrix);

        return this._sprites[lnode];
    }
       
    flushAll() {

        for (let i in this._sprites) {
            this._sprites[i].flush();
        }

        this._sprites = [];
    }          

    flush(i) {
        this._sprites[i].flush();
        delete this._sprites[i];
    }          

    hideAll() {
        for (var i in this._sprites) {
            this._sprites[i].hide();
        }
    }


    showAll() {
        for (var i in this._sprites) {
            this._sprites[i].show();
        }

    }

    handleResize() {
        for (let i in this._sprites) {
            this._sprites[i].redraw();
        }
    }

   
    findFromNodeId(nodeid)
    {
        var res = this._sprites[nodeid];
        if (res == undefined)
        {
            var parent = hwv.model.getNodeParent(nodeid);
            res = this._sprites[parent];
        }
        return res;
    }

    getAlwaysInFront()
    {
        return this._alwaysInFront;
    }

    setAlwaysInFront(infront)
    {
        this._alwaysInFront = infront;
        for (let i in this._sprites) 
        {
            if (infront || this._sprites[i].range != undefined)
                this._viewer.model.setDepthRange([parseInt(i)], 0, 0.1);
            else
                this._viewer.model.unsetDepthRange([parseInt(i)]);
        }

    }

    _updateVisibilities() {
        var _this = this;
        setInterval(function () {
            var currentTime = new Date();
            var pos = _this._viewer.view.getCamera().getPosition();
        //    if (!pos.equals(_this._lastCamPosition)) {
                _this._lastCamPosition = pos.copy();
//                _this._lastCheckDate = new Date();
       //     }
             {
          //      if (_this._lastCheckDate != undefined && currentTime - _this._lastCheckDate > 0.3) {
                    _this._lastCheckDate = new Date();
                    _this._lastCheckDate = undefined;
                    for (let i in _this._sprites) {
                     
                        let s = _this._sprites[i];
                        if (s.range != undefined && !s.hidden) {
                            var delta = Communicator.Point3.subtract(pos, s.center);
                            var l = delta.length();
                            var nodeid = parseInt(i);
                            if (!s.isNative) {
                                let children = _this._viewer.model.getNodeChildren(nodeid);
                                if (l < s.range) {
                                    if (!_this._viewer.model.getNodeVisibility(children[_this._sprites[i].flip]))
                                        _this._viewer.model.setNodesVisibility([children[_this._sprites[i].flip]], true);
                                }
                                else {
                                    if (_this._viewer.model.getNodeVisibility(children[_this._sprites[i].flip]))
                                    _this._viewer.model.setNodesVisibility([children[_this._sprites[i].flip]], false);
                                }
                            }
                            else {
                                if (l < s.range) {
                                    $("#" + i).css("display", "block");

                                }
                                else {
                                    $("#" + i).css("display", "none");
                                }
                            }

                        }
                    }
            //    }
            }
        }, 200);
    }
}


export class Sprite {

    constructor(manager,nodeid, center, scale, type,range, payload, dynamic, isNative,offsetdata) {
        this._manager = manager;
        this.nodeid = nodeid;
        this.range = range;
        this.center = center;
        this.scale = scale;
        this.type = type;
        this.payload = payload;
        this.dynamic = dynamic;
        this.isNative = isNative;
        this.offsetdata = offsetdata;

        this.hidden = false;
        this.flip = 0;
        this.matrix = null;
        this.allowDrag = false;
    }

    set3D(matrix) {
        this.matrix = matrix;
    }

    getIs3D() {
        return this.matrix != null;
    }

    setAllowDrag(allow) {
        this.allowDrag = allow;
    }

    hide()
    {
        this._manager._viewer.model.setNodesVisibility([this.nodeid], false);
    }
    
    flush() {
        if (this.isNative) {
            $("#" + this.nodeid).remove();
        }
        else {
            if (!this.dynamic) {
                this._manager._viewer.model.deleteNode(this.nodeid);
            }
        }
    }
   

    show()
    {     
        this._manager._viewer.model.setNodesVisibility([this.nodeid], true);
    }

    async setPosition(pos) {
        this.center = pos.copy();
        if (this.isNative) {
            await this._manager._updateDOMSprite(this, this._manager._viewer.view.getCamera());
        }
    }

    async redraw() {        
        if (this.isNative) {
            await this._manager._updateDOMSprite(this, this._manager._viewer.view.getCamera());
        }    
    }

    async setType( type, scale) {

        if (this.type != type) {

            this.type = type;
            if (this.isNative) {
                let offsetdata = {};
                offsetdata.width = this._manager._imageHash[type].dims.width;
                offsetdata.height = this._manager._imageHash[type].dims.height;
                this.offsetdata = offsetdata;
                          
                if (scale == undefined) {
                    scale = this.scale;
                }
                let image = $("#" + this.nodeid).children()[0];
               
                let _this = this;
                $(image).bind("load",function() {
                    $("#" + _this.nodeid).css("z-index", "20000");
                    $("#" + _this.nodeid).css("pointer-events", "all");
                    $("#" + _this.nodeid).css("transform", "scale(" + scale + ")");
                    _this._manager._updateDOMSprite(_this, _this._manager._viewer.view.getCamera());                
                    $("#" + _this.nodeid).css("display", "block");
                });
                $("#" + this.nodeid).css("display", "none");
                $(image).attr("src",type);
                return;
            }
       
            await this._manager._createSpriteInstance(this._manager._imageHash[type].mesh, this.nodeid, this.getIs3D(), this.dynamic);
            if (!this._manager._sprites.matrix) {
                if (scale) {
                    let pos = this._manager._sprites[this.nodeid].center;
                    var tmatrix = new Communicator.Matrix();
                    var smatrix = new Communicator.Matrix();

                    let scalex = scale;
                    let scaley = scale;

                    var ar = this._manager._imageHash[type].dims.width / this._manager._imageHash[type].dims.height;
                    if (ar > 1)
                        scaley *= (1 / ar);
                    if (ar < 1)
                        scalex *= ar;

                    smatrix.setScaleComponent(scalex, scaley, 1);
                    tmatrix.setTranslationComponent(pos.x, pos.y, pos.z);

                    var mat = Communicator.Matrix.multiply(smatrix, tmatrix);
                    this._manager._viewer.model.setNodeMatrix(this.nodeid, mat);
                }
            }
            else {
                this._manager._viewer.model.setNodeMatrix(this.nodeid, matrix);
            }

            await this._manager._viewer.model.setNodesTexture([this.nodeid], { imageId: this._manager._imageHash[type].id });
        }
    }
}