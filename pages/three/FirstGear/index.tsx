import { Component, useEffect } from "react";
import {
  AmbientLight,
  BackSide,
  BoxBufferGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Euler,
  GridHelper,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereBufferGeometry,
  SphereGeometry,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Imagess from "./images/dome_text_image.jpg"
// Way 1
// -------------------------------------------------------------------------------------------------
export default class App extends Component {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private mesh: Mesh;

  componentDidMount = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    this.camera = new PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 4);

    this.scene = new Scene();
    this.scene.background = new Color(0x090c17);

    const ambient = new HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    this.scene.add(ambient);

    const light = new DirectionalLight();
    light.position.set(0.2, 1, 1);
    this.scene.add(light);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop(this.animate.bind(this));
    var spherevalues = [];
    spherevalues[0]={
      radius: 1,
      widthsegments: 50,
      heightsegments: 25,
    }
    const geometry = new SphereGeometry(spherevalues[0].radius, spherevalues[0].widthsegments, spherevalues[0].heightsegments);
    // const loader = new TextureLoader();
    // const texture = loader.load("/sky.png");
    // const material = new MeshPhongMaterial({ map: texture });
    // const dome = new Mesh(geometry, material);
    // dome.material.side = BackSide;

    // this.mesh = new Mesh(geometry, material);
    // this.scene.add(this.mesh);

    // const controls = new OrbitControls(this.camera, this.renderer.domElement);

    // window.addEventListener("resize", this.resize.bind(this));

    const material = new MeshBasicMaterial({
      color: "#A9A9A9",
      wireframe: true,
    });

    // const highlight = new Mesh(
    //   new PlaneGeometry(0.2, 0.2),
    //   new MeshBasicMaterial({ side: DoubleSide })
    // );
    // // highlight.rotateX(-Math.PI / 2);
    // highlight.position.set(0.1, 0.1, 1);
    // this.scene.add(highlight);

    //aqui estaba

    // const material = [];
    const vertices = geometry.attributes.position.array;

    const length = vertices.length;

    const position = geometry.attributes.position;
    const vector = new Vector3();
    const planerotation = new Euler();
    // console.log(position);

    // material.push(new MeshBasicMaterial({ color: 0xffffff }));
    // material.push(new MeshBasicMaterial({ color: 0xff0000 }));
    // material.push(new MeshBasicMaterial({ color: "yellow" }));
    // material.push(new MeshBasicMaterial({ color: "blue" }));
    // material.push(new MeshBasicMaterial({ color: "navy" }));

    const sphere = new Mesh(geometry, material);

    
    this.scene.add(sphere);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

      //crear planos
      //spriteResponse[0] = {
      //  ID: 1,
      //  x: 0.5831503868103027,
      //  y: 0.80901700258255,
      //  z: 0.07366902381181717,
      //};
      // // spriteResponse[1] = { ID: 2, x: 0, y: 0.1, z: 0 };
      // // spriteResponse[2] = { ID: 3, x: 0, y: 0.5, z: 0 };
      // // spriteResponse[3] = { ID: 4, x: 0.5, y: 0, z: 0 };
      // // spriteResponse[4] = { ID: 5, x: 0.25, y: 0.5, z: 0 };
    function planesIndex(width, height, desiredParam){
      return 1
    }
    
    var planes = [];

    var spriteResponse = [];

    for (let i = 0, l = position.count; i < l; i++) {
      vector.fromBufferAttribute(position, i);
      vector.applyMatrix4(sphere.matrixWorld);
      //console.log(vector);
      spriteResponse[i]={
        ID: i+1,
        x:vector.x,
        y: vector.y,
        z: vector.z,
        Rx: i*360/50,
        Ry: i*360/25,
        Rz: i*360/50,
        Ix:planesIndex(spherevalues[0].widthsegments, spherevalues[0].heightsegments, 1),
        Iy:planesIndex(spherevalues[0].widthsegments, spherevalues[0].heightsegments, 2),

      };
    }
    
    const texture = new TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Starsinthesky.jpg/1920px-Starsinthesky.jpg",
    );
    const materialImage = new MeshBasicMaterial( { map: texture } );

    for (var i = 0; i < spriteResponse.length; i++) {
      //const material_plane = new MeshBasicMaterial({color: 0xffffff,side: DoubleSide, });

      const materialImage = new MeshBasicMaterial( { 
        map: texture ,
        side: DoubleSide,
      } );
      materialImage.needsUpdate = true;
      var geometry_plane = new PlaneGeometry(0.1, 0.1);

      if (i<0) 
      {
        console.log("ola")
        var geometry_plane = new PlaneGeometry(20,20);
      }
      else 
      {
        console.log("olachao")
      }
      const plane = new Mesh(geometry_plane, materialImage);

      plane.position.set(
        spriteResponse[i].x,
        spriteResponse[i].y,
        spriteResponse[i].z
      );
        planerotation.set(
          0.785398,//*spriteResponse[i].Rx,
          0.785398,//*spriteResponse[i].Rx +1,
          0.785398,//*spriteResponse[i].Rz
          );
      //planerotation.setFromRotationMatrix(m: sphere.matrixWorld);
      plane.setRotationFromEuler(planerotation);
      
      console.log(plane.rotation);//console.log(plane.quaternion)

      this.scene.add(plane);

      planes.push(plane);

      this.camera.updateMatrixWorld();
      // var vector = this.camera.position.clone();

      // plane.lookAt(vector);
      // plane.userData = { URL: "http://stackoverflow.com" };
    }

    window.addEventListener("resize", this.resize.bind(this));
  };

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  animate = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render = () => <div id="container" />;
}
// -------------------------------------------------------------------------------------------------

// Way 2
// -------------------------------------------------------------------------------------------------
// export default class App extends Component {
//   componentDidMount(): void {
//     const container = document.createElement("div");
//     document.body.appendChild(container);

//     window.addEventListener("resize", resize.bind(this));

//     function resize() {}

//     function animate() {}
//   }
//   render() {
//     return <div id="container" />;
//   }
// }
// -------------------------------------------------------------------------------------------------

// Way 3
// -------------------------------------------------------------------------------------------------
// function App() {
//   useEffect(() => {
//     const container = document.createElement("div");
//     document.body.appendChild(container);

//     window.addEventListener("resize", resize.bind(this));

//     function resize() {}

//     function animate() {}
//   }, []);

//   return <div id="container" />;
// }

// export default App;
// -------------------------------------------------------------------------------------------------
