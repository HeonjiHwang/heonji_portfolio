import { useEffect, useRef } from "react";
import { Engine, Scene } from '@babylonjs/core';
import { useSelector, useDispatch } from 'react-redux';
import { setIsFocus } from "../reducers/gallery";
import styled from 'styled-components';

const PopupWrapper = styled.div`
    position:absolute;
    top: ${props => props.top || '0px'};
    left: ${props => props.left || '0px'};
    background-color:#fff;
    padding:10 15px;
    border-radius:5px;
    z-index:10;
`;

// eslint-disable-next-line
export default ({antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, gHanlder, ...rest}) => {
    const reactCanvas = useRef(null);
    const dispatch = useDispatch();
    const mOverData = useSelector((state) => state.mOverData);
    const isFocus = useSelector((state) => state.isFocus);
    
    const onClickButton = () => {
        gHanlder.resetPosition();
        dispatch(setIsFocus(false));
    }

    useEffect(() => {
        const {current : canvas} = reactCanvas;

        if(!canvas) return;

        const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
        const scene = new Scene(engine, sceneOptions);

        if(scene.isReady()){
            onSceneReady(scene);
        }else{
            scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
        }

        engine.runRenderLoop(() => {
            if(typeof onRender === 'function') onRender(scene);
            scene.render();
        })

        const resize = () => {
            scene.getEngine().resize();
        }

        if(window){
            window.addEventListener('resize', resize);
        }

        return () => {
            scene.getEngine().dispose();

            if(window){
                window.removeEventListener('resize', resize);
            }
        };
        
    }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

    return (
        <>
            <canvas ref={reactCanvas} {...rest}/>
            {
                (!!mOverData.img_id && isFocus) ?
                    <PopupWrapper top={`${mOverData.pageY+15}px`} left={`${mOverData.pageX + 15}px`}>
                        hihi
                    </PopupWrapper>
                : null
            }
            <div className="button-wrapper">
                <button onClick={onClickButton}>제자리로</button>
            </div>
        </>
    )
}