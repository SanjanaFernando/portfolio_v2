import * as THREE from "three";
import Orchestrator from "./Orchestrator.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { VignetteRGBShiftShader } from "./Effects/VignetteRGBShiftShader.js";

export default class Renderer {
    constructor() {
        this.orchestrator = new Orchestrator();
        this.canvas = this.orchestrator.canvas;
        this.sizes = this.orchestrator.sizes;
        this.scene = this.orchestrator.scene;
        this.camera = this.orchestrator.camera;

        this.setInstance();
        this.setPostProcessing();
    }

    setPostProcessing() {
        this.composer = new EffectComposer(this.instance);
        this.composer.addPass(new RenderPass(this.scene, this.camera.instance));

        this.vignetteRGBShiftPass = new ShaderPass(VignetteRGBShiftShader);
        this.vignetteRGBShiftPass.uniforms.shiftAmount.value = 0.005;
        this.vignetteRGBShiftPass.uniforms.vignetteRadius.value = 0.3;
        this.vignetteRGBShiftPass.uniforms.vignetteSoftness.value = 0.3;
        this.composer.addPass(this.vignetteRGBShiftPass);
        this.composer.addPass(new OutputPass());
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = 1.95;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFShadowMap;
        this.instance.setClearColor("#808080");
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
        this.composer.setSize(this.sizes.width, this.sizes.height);
        this.composer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        this.composer.render();
    }
}
