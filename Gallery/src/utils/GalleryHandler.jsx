import { MeshBuilder, StandardMaterial, Texture, Vector4, Vector3, FreeCamera, HemisphericLight, Animation, Color3, Mesh } from "@babylonjs/core"
import { setMoverData, setIsFocus } from '../reducers/gallery'
import store from '../reducers/index'

class GalleryHandler{
    constructor(){
        this.faceUV = [];
        this.scene = undefined;
        this.camera = undefined;
        this.initData = {
            map_id:1,
            map_name:'gallery',
            camera_pos_x:-8.5,
            camera_pos_y:1,
            camera_pos_z:12,
            camera_target_x:-8.5,
            camera_target_y:0,
            camera_target_z:0
        }
        this.image = [
            {
                img_id : 1,
                img_name : 'test1',
                img_comment : 'test용 그림입니다.',
                img_src : 'image.png',
                painter : 'test',
                width: 600,
                height: 738,
                depth:0.1,
                price: 0.001,
                position_x:-1,
                position_y:0,
                position_z:0,
                rotation_x:0,
                rotation_y:0,
                roataion_z:0
            },
            {
                img_id : 2,
                img_name : 'test2',
                img_comment : 'test용 그림입니다.',
                img_src : 'test_image.jpeg',
                painter : 'test',
                width: 1200,
                height: 630,
                depth:0.1,
                price: 0.001,
                position_x:-5,
                position_y:0,
                position_z:-4,
                rotation_x:0,
                rotation_y:0,
                roataion_z:0
            },
            {
                img_id : 3,
                img_name : 'test3',
                img_comment : 'test용 그림입니다.',
                img_src : 'image_test2.jpg',
                painter : 'test',
                width: 728,
                height: 410,
                depth:0.1,
                price: 0.001,
                position_x:-3,
                position_y:0,
                position_z:-1.5,
                rotation_x:0,
                rotation_y:-Math.PI/2,
                roataion_z:0
            },
            {
                img_id : 4,
                img_name : 'test4',
                img_comment : 'test용 그림입니다.',
                img_src : 'image_test3.jpg',
                painter : 'test',
                width: 728,
                height: 486,
                depth:0.1,
                price: 0.001,
                position_x:-8,
                position_y:0,
                position_z:-4,
                rotation_x:0,
                rotation_y:0,
                roataion_z:0
            },
            {
                img_id : 5,
                img_name : 'test5',
                img_comment : 'test용 그림입니다.',
                img_src : 'image_test4.jpg',
                painter : 'test',
                width: 728,
                height: 486,
                depth:0.1,
                price: 0.001,
                position_x:-9.5,
                position_y:0,
                position_z:-4,
                rotation_x:0,
                rotation_y:0,
                roataion_z:0
            },
            {
                img_id : 6,
                img_name : 'test6',
                img_comment : 'test용 그림입니다.',
                img_src : 'image_test5.jpg',
                painter : 'test',
                width: 564,
                height: 1002,
                depth:0.1,
                price: 0.001,
                position_x:-10.93,
                position_y:0,
                position_z:-1.5,
                rotation_x:0,
                rotation_y:Math.PI/2,
                roataion_z:0
            },
            {
                img_id : 7,
                img_name : 'test7',
                img_comment : 'test용 그림입니다.',
                img_src : 'image_test6.jpg',
                painter : 'test',
                width: 1366,
                height: 768,
                depth:0.1,
                price: 0.001,
                position_x:-10.93,
                position_y:0,
                position_z:1.8,
                rotation_x:0,
                rotation_y:Math.PI/2,
                roataion_z:0
            }
        ];
        this.paintMeshes = [];
    }

    start(canvas, scene){
        this.scene = scene;
        this.scene.clearColor = new Color3(0.77, 0.75, 0.64);
        this.scene.collisionsEnabled = true;
        
        //scene events
        this.scene.onPointerDown = (e) => this.onMouseDown(e);
        this.scene.onPointerMove = (e) => this.onMouseMove(e);

        const {camera_pos_x, camera_pos_y, camera_pos_z, camera_target_x, camera_target_y, camera_target_z} = this.initData;
        const cameraPos = new Vector3(camera_pos_x, camera_pos_y, camera_pos_z);
        const cameraTarget = new Vector3(camera_target_x, camera_target_y, camera_target_z);

        this.camera = new FreeCamera("camera1", cameraPos, this.scene);
        this.camera.setTarget(cameraTarget);
        this.camera.attachControl(canvas, true);

        this.camera.speed = 0.2;
        this.camera.checkCollisions = true;
        this.camera.ellipsoid = new Vector3(1.5,1.5,1.5);

        this.setCameraInput();

        let u_light = new HemisphericLight('u_light', new Vector3(1,1,0), this.scene);
        let d_light = new HemisphericLight('d_light', new Vector3(-4, 3, 3), this.scene);
        u_light.intensity = 0.8;
        d_light.intensity = 0.7;
        u_light.specular = new Color3(0,0,0);
        d_light.specular = new Color3(0,0,0);

        this.setGallery();
    }

    setCameraInput(){
        // //allow zoom in and out
        this.camera.inputs.addMouseWheel();
        this.camera.inputs.attached.mousewheel.wheelPrecisionX = 0.05;
        this.camera.inputs.attached.mousewheel.wheelPrecisionY = 0.05;
        this.camera.inputs.attached.mousewheel.wheelPrecisionZ = 0.05;
    }

    setGallery(){

        const cube = MeshBuilder.CreateBox(`box`, {size:4});
        cube.position.z-= 2.05;
        cube.position.x-= 0.95;

        const cube2 = cube.clone();
        cube2.position = cube.position.clone();
        cube2.position.z-= 4;
        cube2.position.x-= 4

        const cube3 = cube.clone();
        cube3.position = cube2.position.clone();
        cube3.position.x-= 4

        const cube4 = cube.clone();
        cube4.position = cube3.position.clone();
        cube4.position.z+= 4;
        cube4.position.x-= 4

        const cube5 = cube.clone();
        cube5.position = cube4.position.clone();
        cube5.position.z+= 4;

        const wall = Mesh.MergeMeshes([cube, cube2, cube3, cube4, cube5]);

        wall.checkCollisions = true;
    }

    setPaintObjects(){
        if(this.faceUV.length <= 0){
            for(let i=0;i<6;i++){
                this.faceUV[i] = new Vector4(0,0,0,0);
            }
            this.faceUV[0] = new Vector4(0,0,1,1);
        }

        this.paintMeshes = this.image.map((val) => {
            let width = val.width/600;
            let height = val.height/600;

            const position = new Vector3(val.position_x, val.position_y, val.position_z);
            const cube = MeshBuilder.CreateBox(`image_${val.img_id}`, {height: height, width: width, depth: 0.05, faceUV: this.faceUV});
            
            const material = new StandardMaterial('material', this.scene);
            const texture = new Texture(require(`../assets/imgs/${val.img_src}`), this.scene);
            material.diffuseTexture = texture;
            material.roughness = 1;
            material.metallic = 0;
    
            cube.material = material;
            cube.position = position;
            cube.checkCollisions = true;
            cube.isPickable = true;
            
            cube.rotation.x = val.rotation_x;
            cube.rotation.y = val.rotation_y;
            cube.rotation.z = Math.PI;
            cube._paintInfo = val; 

            return cube;
        })
        
    }

    onMouseDown(){
        let pickInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => {
            return mesh.isPickable;
        })
        if(pickInfo && pickInfo.pickedMesh){
            let mesh = pickInfo.pickedMesh;

            if(mesh.name.includes("image_")){
                this.cameraAction(10, mesh);
                store.dispatch(setIsFocus(true));
                console.log(store.getState());
            }
        }
    }

    //events
    onMouseMove(evt){
        const app = document.querySelector(".App")
        let pickInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh) => {
            return mesh.isPickable;
        })
        if(pickInfo && pickInfo.pickedMesh){
            let mesh = pickInfo.pickedMesh;
            if(mesh.name.includes("image_")){
                app.style.cursor = 'pointer';

                let info = mesh._paintInfo;
                let {pageX, pageY} = evt;
                store.dispatch(setMoverData({...info, pageX, pageY}));
            }else{
                app.style.cursor = 'default';
                
                store.dispatch(setMoverData({}));
            }
        }else{
            app.style.cursor = 'default';
        }
    }

    resetPosition(){
        const {camera_pos_x, camera_pos_y, camera_pos_z, camera_target_x, camera_target_y, camera_target_z} = this.initData;
        let cameraPos = this.camera.position.clone();
        let changePos = new Vector3(camera_pos_x,camera_pos_y,camera_pos_z);
        let cur_target = this.camera.target.clone();
        let chg_target = new Vector3(camera_target_x, camera_target_y, camera_target_z);

        let distance = Vector3.Distance(cameraPos, changePos);
        let frameRate = distance / 1 * 10000000;

        let move = new Animation('cam_animation', 'position', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        let target = new Animation('cam_target', 'target', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        let mKey = [
            {
                frame: 0,
                value: cameraPos
            },
            {
                frame:frameRate,
                value:changePos  
            }    
        ];

        let tKey = [
            {
                frame:0,
                value:cur_target
            },
            {
                frame:frameRate,
                value:chg_target
            }
        ]

        move.setKeys(mKey);
        target.setKeys(tKey);
        
        let finalAnimation = this.scene.beginDirectAnimation(this.camera, [target, move], 0, frameRate, false);

        return finalAnimation;
    }

    cameraAction(speedRatio, targetMesh){
        let cameraPos = this.camera.position.clone();
        let changePos = this.getChangePos(targetMesh);
        let cur_target = this.camera.target.clone();
        let chg_target = targetMesh.position.clone();

        let distance = Vector3.Distance(cameraPos, changePos);
        let frameRate = distance / speedRatio * 10000000;
        
        let move = new Animation('cam_animation', 'position', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        let target = new Animation('cam_target', 'target', frameRate, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);

        let mKey = [
            {
                frame: 0,
                value: cameraPos
            },
            {
                frame:frameRate,
                value:changePos  
            }
        ];
        let tKey = [
            {
                frame:0,
                value:cur_target
            },
            {
                frame:frameRate,
                value:chg_target
            }
        ]

        move.setKeys(mKey);
        target.setKeys(tKey);

        let finalAnimation = this.scene.beginDirectAnimation(this.camera, [target, move], 0, frameRate, false);

        return finalAnimation;
    }

    getChangePos(targetMesh){
        const rotationY = targetMesh.rotation.y;
        
        if(rotationY === 0){
            return new Vector3(targetMesh.position.x, 0, targetMesh.position.z + 2);
        }else if(rotationY < 0){
            return new Vector3(targetMesh.position.x - 2, 0, targetMesh.position.z);
        }else if(rotationY > 0){
            return new Vector3(targetMesh.position.x + 2, 0, targetMesh.position.z);
        }
    }
}

export default GalleryHandler;