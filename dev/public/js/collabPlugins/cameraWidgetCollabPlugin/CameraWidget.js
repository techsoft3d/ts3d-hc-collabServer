class CameraWidget {

    constructor(manager, lineColor = new Communicator.Color(255,0,0), faceColor = new Communicator.Color(255,0,0),faceOpacity = 0.1, renderFaces = true, suppressScale = false, fixedLength = undefined) {
        this._manager = manager;    
        this._node = null;
        this._currentCamera = null;
        this._lineColor = lineColor;
        this._faceColor = faceColor;
        this._faceOpacity = faceOpacity;
        this._renderFaces = renderFaces;
        this._suppressScale = suppressScale;
        this._fixedLength = fixedLength;
    }

    async update(camera, canvasSize = this._manager._viewer.view.getCanvasSize()) {
        if (!this._node) {
            let myMeshInstanceData = new Communicator.MeshInstanceData(this._manager._frustumMesh);
            let myMeshInstanceDataLine = new Communicator.MeshInstanceData(this._manager._frustumMeshLines);

            this._node =  this._manager._viewer.model.createNode( this._manager.node);

            if (this._renderFaces) {
                let meshnode = await this._manager._viewer.model.createMeshInstance(myMeshInstanceData, this._node, true);
                await this._manager._viewer.model.setNodesOpacity([meshnode],this._faceOpacity);
                await this._manager._viewer.model.setNodesFaceColor([meshnode], this._faceColor);
            }

            let meshnodeLine = await this._manager._viewer.model.createMeshInstance(myMeshInstanceDataLine,  this._node,true);
            await this._manager._viewer.model.setNodesLineColor([meshnodeLine], this._lineColor);
            await this._manager._viewer.model.setNodesLinePattern([meshnodeLine], [1, 0], 0.05, Communicator.LinePatternLengthUnit.Object);
            this._manager._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotSelect, [this._node], true);
            this._manager._viewer.model.setInstanceModifier(Communicator.InstanceModifier.ExcludeBounding, [this._node], true);
            this._manager._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotCut, [this._node], true);
            this._manager._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotExplode, [this._node], true);
            this._manager._viewer.model.setInstanceModifier(Communicator.InstanceModifier.DoNotLight, [this._node], true);

            if (this._suppressScale) {
                this._manager._viewer.model.setInstanceModifier(Communicator.InstanceModifier.SuppressCameraScale, [this._node], true);
            }


        }

        let delta = Communicator.Point3.subtract(camera.getTarget(), camera.getPosition()).normalize();
        let l = Communicator.Point3.subtract(camera.getTarget(), camera.getPosition()).length();
        let scalemat = new Communicator.Matrix();
        let pos = camera.getPosition();
        let transmat = new Communicator.Matrix();


        let fixedLength;
        let camWidth, camHeight;
        if (!this._suppressScale) {
            camWidth = camera.getWidth();
            camHeight = camera.getHeight();

            if (this._fixedLength) {
                let r = l/this._fixedLength;
                camWidth /= r;
                camHeight /= r;
                l = this._fixedLength;
            }
        }
        else {
            if (this._fixedLength == undefined) {
                fixedLength = 0.2;
            }
            camWidth = fixedLength / 2;
            camHeight = fixedLength / 2;
            l = fixedLength;

        }

        let width,height;
        let ratio = canvasSize.x/canvasSize.y;
        if (ratio >=1) {
            width = camWidth*ratio;
            height = camHeight;
        }
        else {
            width = camWidth;
            height = camHeight / ratio;

        }

        transmat.setTranslationComponent(pos.x, pos.y, pos.z);
        scalemat.setScaleComponent(width,height,l);
        let rotmat = this.ComputeVectorToVectorRotationMatrix(new Communicator.Point3(0,0,1), delta);

        let tup = rotmat.transform(new Communicator.Point3(0,1,0));
        let rotmat2 = this.ComputeVectorToVectorRotationMatrix(tup, camera.getUp());


        let resmatrix = Communicator.Matrix.multiply(scalemat, rotmat);
        let resmatrix2 = Communicator.Matrix.multiply(resmatrix, rotmat2);
        let resmatrix3 = Communicator.Matrix.multiply(resmatrix2, transmat);        
       
        
        await this._manager._viewer.model.setNodeMatrix(this._node, resmatrix3);
        this._currentCamera = camera.copy();
        this._currentCanvasSize = canvasSize;


    }

    async flush() {
        this._manager._viewer.model.deleteNode(this._node);
        this._node = null;
    }

    getCamera() {
        return this._currentCamera;
    }

    ComputeVectorToVectorRotationMatrix(p1, p2) {
        var outmatrix;
        const EPSILON = 0.0000001;
        p1.normalize();
        p2.normalize();
        let p3 = Communicator.Point3.cross(p1, p2);

        let dprod = Communicator.Point3.dot(p1, p2);
        let l = p3.length();

        // Construct a perpendicular vector for anti-parallel case
        if (l > -EPSILON && l < EPSILON) {
            if (dprod < 0) {
                if (p1.x < -EPSILON || p1.x > EPSILON) {
                    p3.x = p1.y;
                    p3.y = -p1.x;
                    p3.z = 0;
                } else if (p1.y < -EPSILON || p1.y > EPSILON) {
                    p3.x = -p1.y;
                    p3.y = p1.x;
                    p3.z = 0;
                } else if (p1.z < -EPSILON || p1.z > EPSILON) {
                    p3.x = -p1.z;
                    p3.z = p1.x;
                    p3.y = 0;
                } else {
                    return new Communicator.Matrix();
                }
            } else {
                return new Communicator.Matrix();
            }
        }

        var ang = Math.atan2(l, dprod);
        ang *= (180 / Math.PI);

        return Communicator.Matrix.createFromOffAxisRotation(p3, ang);
    }
}


class CameraWidgetManager {

    constructor(viewer) {
        this._viewer = viewer;   
        this._widgets = [];
        this._node = null;
     
    }

    async initialize() {
        this._node =  this._viewer.model.createNode();
        await this._createFrustumMesh();
    }

    deactivate() {
        this._node = null;
    }

    isActive() {
        return this._node != null;
    }

    async _createFrustumMesh(viewer) {

        let vertices = [0,0,0,
                        -0.5,-0.5,1,
                        0.5,-0.5,1,

                        0,0,0,
                        0.5,-0.5,1,
                        0.5,0.5,1,

                        0,0,0,
                        -0.5,0.5,1,
                        0.5,0.5,1,

                        0,0,0,
                        -0.5,0.5,1,
                        -0.5,-0.5,1];

        let normals =  [];
        
        for (let i=0;i<4;i++) {
            let plane = Communicator.Plane.createFromPoints(new Communicator.Point3(vertices[i*9], vertices[i*9+1], vertices[i*9+2]), 
                new Communicator.Point3(vertices[i*9+3], vertices[i*9+4], vertices[i*9+5]),
                new Communicator.Point3(vertices[i*9+6], vertices[i*9+7], vertices[i*9+8]));
            for (let j=0;j<3;j++) {
                normals.push(-plane.normal.x);               
                normals.push(-plane.normal.y);               
                normals.push(-plane.normal.z);               
            }
        }

        var meshData = new Communicator.MeshData();
        meshData.setFaceWinding(Communicator.FaceWinding.Unknown);
        meshData.addFaces(vertices, normals);
        this._frustumMesh =  await this._viewer.model.createMesh(meshData);


        let polylines = [[0,0,0,
            -0.5,-0.5,1,
            0.5,-0.5,1],

            [0,0,0,
            0.5,-0.5,1,
            0.5,0.5,1],

            [0,0,0,
            -0.5,0.5,1,
            0.5,0.5,1],

            [0,0,0,
            -0.5,0.5,1,
            -0.5,-0.5,1],

            [0,0,0,
            0.5,0.5,1]

            ];

            var meshDataLines = new Communicator.MeshData();
            for (let i = 0; i < polylines.length; i++) {
                meshDataLines.addPolyline(polylines[i]);
            }
            this._frustumMeshLines =  await this._viewer.model.createMesh(meshDataLines);

     
    }
       
    add(widget) {
        this._widgets.push(widget);
        widget.update(this._viewer.view.getCamera());
    }
}