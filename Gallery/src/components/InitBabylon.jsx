import React from 'react';
import SceneComponent from './SceneComponent';
import GalleryHandler from '../utils/GalleryHandler';
import "../App.css"

const gHandler = new GalleryHandler(); 

const onSceneReady = (scene) => {
    const canvas = scene.getEngine().getRenderingCanvas();

    gHandler.start(canvas, scene);

    gHandler.setPaintObjects();
}

const onRender = (scene) => {
    
}

export default () => {
    return (
        <div>
            <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} gHanlder={gHandler} id="my-canvas"/>
        </div>
    )
}