import React, { Component, MouseEvent } from 'react';
import { ToolBar } from '../Cmps/ToolBar';
import {
  Stage,
  Layer,
  Image,
  Line,
  Rect,
  Circle,
  Shape,
  Text,
} from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { globalService } from '../Services/globalServices';
import { Modal } from '../Cmps/Modal';
import { CanvasGridLayer } from '../Cmps/CanvasGridLayer';
import { LayersBar } from '../Cmps/LayersBar';
import { CanvasOptions } from '../Cmps/CanvasOptions';
import {
  RectInterface,
  LayerInterface,
  ItemInterface,
} from '../Services/interfaceService';

// BackGround image for the canvas cmp

const BgImage: React.FC<{ url: string }> = ({ url }) => {
  const [image] = useImage(url);
  return (
    <Image
      image={image}
      width={window.innerWidth - 250}
      height={window.innerHeight - 100}
    />
  );
};

interface State {
  img: string;
  currTool: string;
  formation: number[];
  currLayer: LayerInterface;
  layers: LayerInterface[];
  loading: boolean;
  modal: { showModal: boolean; modalTitle: string };
  rectangels: RectInterface[];
  isDraggin: boolean;
  currElementCoords: { x: number; y: number };
  showGrid: boolean;
  items: ItemInterface[];
  selectedShape: {id: number, name: string, type: string};
  itemRotaionDeg: number;
  intervalId: NodeJS.Timeout;
  showLayersBar: boolean;
}

class NewProject extends Component {
  state: State = {
    img: '',
    currTool: '',
    formation: [],
    currLayer: { id: 101, name: 'Default Layer', formation: [20, 50, 100, 100, 300, 300], show: true },
    layers: [],
    loading: true,
    modal: { showModal: false, modalTitle: 'Default' },
    rectangels: [],
    isDraggin: false,
    currElementCoords: { x: 0, y: 0 },
    showGrid: true,
    items: [],
    selectedShape: {id: 0, name: '', type: ''},
    itemRotaionDeg: 0,
    intervalId: setInterval(() => {}, 100),
    showLayersBar: false
  };

  componentDidMount() {
    const defualtLayers = globalService.getGLayers();
    this.setState({
      layers: defualtLayers,
      currLayer: defualtLayers[0],
      loading: false,
    });
  }

  componentDidUpdate(prevState: State) {
    if (prevState.currTool !== this.state.currTool) {

      
    }
  }

  // Set the background image

  uploadImg = (url: string) => {
    this.setState({ img: url });
  };

  setCurrTool = (toolName: string) => {
    this.setState({ currTool: toolName });
    this.handleOpenModal(toolName);
    if (toolName === 'layers') {
      this.setState({
        showLayersBar: true
      })
    } else {
      this.setState({
        showLayersBar: false
      })
    }
  };

  // Canvas options

  addLayer = () => {
    const currLayers = globalService.createNewLayer();
    this.setState({
      layers: currLayers,
    });
  };

  handleUndo = () => {
    const newFormation = this.state.formation.slice(
      0,
      this.state.formation.length - 2
    );
    this.setState({
      formation: newFormation,
      currLayer: { ...this.state.currLayer, formation: newFormation },
    });
  };

  handleRedo = () => {
    const newFormation: number[] = [];
    this.setState({
      formation: newFormation,
      currLayer: { ...this.state.currLayer, formation: newFormation },
    });
  };

  selectLayer = (ev: MouseEvent) => {
    const { currLayer, formation, layers } = this.state;
    globalService.updateLayer(currLayer.id, formation);
    const newCurrLayer: number = +ev.currentTarget.id;
    this.setState({
      currLayer: layers[newCurrLayer],
      formation: layers[newCurrLayer].formation,
    });
  };

  handleShowLayer = (layer: LayerInterface) => {
    layer.show = !layer.show;
    globalService.handleShowLayer(layer.id, layer.show);
    const updatedLayers = globalService.getGLayers();
    this.setState({
      layers: updatedLayers
    })
  }

  handleGrid = () => {
    this.setState({ showGrid: !this.state.showGrid });
  };

  handleItemRotaionClockwise = (e: MouseEvent) => {
    e.preventDefault();
    const currItem = globalService.getItemById(this.state.selectedShape.id)

    if (e.type === 'mousedown' && this.state.selectedShape.name) {
      const rotation: NodeJS.Timeout = setInterval(() => {
        this.setState({ itemRotaionDeg: this.state.itemRotaionDeg - 1 });
        this.updateItems(currItem);
      }, 50);
      this.setState({ intervalId: rotation });
    }
    if (e.type === 'mouseup') {
      clearInterval(this.state.intervalId);
    }
  };

  handleItemRotaionCounterClockwise = (e: MouseEvent) => {
    e.preventDefault();
    const currItem = globalService.getItemById(this.state.selectedShape.id)

    if (e.type === 'mousedown' && this.state.selectedShape.name) {
      const rotation: NodeJS.Timeout = setInterval(() => {
        this.setState({ itemRotaionDeg: this.state.itemRotaionDeg + 1 });
        this.updateItems(currItem);
      }, 50);
      this.setState({ intervalId: rotation });
    }
    if (e.type === 'mouseup') {
      clearInterval(this.state.intervalId);
    }
  };

  // Mouse Events (every click on canvas)

  handleMouseDown = (ev: Konva.KonvaEventObject<MouseEvent>) => {
    // Current X,Y canvas click position
    // Problem - ev.evt.offsetX dosent work, meanwhile i use pageX
    const xPosition = ev.evt.pageX - 50;
    const yPosition = ev.evt.pageY - 60;
    
    // Draw tool
    // Handle Pen Formation Drawing
    if (this.state.currTool === 'pen') {
      this.setState({
        formation: [...this.state.formation, xPosition, yPosition],
        currLayer: {
          ...this.state.currLayer,
          formation: [...this.state.formation, xPosition, yPosition],
        },
      });
      globalService.updateLayer(this.state.currLayer.id, this.state.formation); 
    }

    // Handle Select/Deslect Canvas Object

    const selectedCanvasObj = globalService.findCanvasObj(xPosition, yPosition);
    this.setState({ selectedShape: {id: selectedCanvasObj.id, name: selectedCanvasObj.name, type: selectedCanvasObj.type}, currElementCoords: {x: selectedCanvasObj.x, y: selectedCanvasObj.y} });
    if (selectedCanvasObj.rotationAngle) this.setState({ itemRotaionDeg: selectedCanvasObj.rotationAngle});
    // console.log(selectedCanvasObj)
  };

  // Shapes

  // Rectangel "Rooms?"

  createRect = (name: string, width: number, height: number) => {
    globalService.createRect(name, width, height);
    this.setState({ rectangels: globalService.getRectangels() });
  };

  updateRectangels = (rect: RectInterface) => {
    const updatedRectangels: RectInterface[] = globalService.updateRectangels(
      rect,
      this.state.currElementCoords
    );
    this.setState({ rectangels: updatedRectangels });
  };

  // Items "camreas, smoke detectors, wifi..."

  createItem = (
    name: String,
    title: string,
    radiusInMeters: number,
    angle: number
  ) => {
    globalService.createItem(name, title, radiusInMeters, angle);
    this.setState({ items: globalService.getItems() });
  };

  updateItems = (item: ItemInterface) => {
    
    const updatedItems: ItemInterface[] = globalService.updateItems(
      item,
      this.state.currElementCoords,
      this.state.itemRotaionDeg
    );
    this.setState({ items: updatedItems });
  };

  // Modal

  handleCloseModal = () => {
    if (this.state.modal.modalTitle) {
      this.setState({ modal: { modalTitle: '' } });
    }
    this.setState({ modal: { showModal: false } });
  };

  handleOpenModal = (title: string) => {
    if (!title) {
      this.handleCloseModal();
      return;
    }
    this.setState({ modal: { showModal: true, modalTitle: title } });
  };

  render() {
    const {
      img,
      layers,
      modal,
      currLayer,
      loading,
      currTool,
      rectangels,
      isDraggin,
      showGrid,
      items,
      selectedShape,
      currElementCoords,
      itemRotaionDeg,
      showLayersBar
    } = this.state;

    return (
      <div className="new-project">
        <ToolBar
          uploadImg={this.uploadImg}
          setCurrTool={this.setCurrTool}
          handleOpenModal={this.handleOpenModal}
        />

        {/* <h1>{loading ? 'Wait A Sec..' : ''}</h1> */}
        
        <CanvasOptions 
        addLayer={this.addLayer}
        handleUndo={this.handleUndo}
        handleRedo={this.handleRedo}
        currTool={currTool}
        selectedShape={selectedShape}
        handleGrid={this.handleGrid}
        handleItemRotaionClockwise={this.handleItemRotaionClockwise}
        handleItemRotaionCounterClockwise={this.handleItemRotaionCounterClockwise}
        showGrid={showGrid}
        />

        <div className={showLayersBar ? "layers-bar active" : "layers-bar"}>
        <LayersBar
        
        layers={layers}
        selectLayer={this.selectLayer}
        handleShowLayer={this.handleShowLayer}
        />
        </div>

        <div className="info">
          <h5>Tool: {currTool}</h5>
          <h5>Layer: {currLayer.name}</h5>
          <h5>Shape: {selectedShape.name}</h5>
          <h5> X: {currElementCoords.x} Y: {currElementCoords.y}</h5>
          <h5>          {"Rotation degree: " + itemRotaionDeg}</h5>
          
         
        </div>

        

        <div className="canvas-area">
          <Stage
            width={showLayersBar ? window.innerWidth - 252 : window.innerWidth - 54}
            height={window.innerHeight - 62}
            onContentMousedown={this.handleMouseDown}
          >
            <Layer>
              <BgImage url={img} />
            </Layer>
            <CanvasGridLayer
              width={showLayersBar ? window.innerWidth - 252 : window.innerWidth - 54}
              hieght={window.innerHeight - 61.5}
              showGrid={showGrid}
            />
            <Layer>
            {layers[0] && layers.map(layer => (
                layer.show && <Line x={0} y={0} points={layer.formation} stroke="black" key={layer.id} style={(layer.show) ? '' : {display: "none"}}/>
                ))}
            </Layer>
            <Layer>
              {rectangels[0] &&
                rectangels.map((rect, idx) => (
                  
                  <Rect
                    shapeProps={rect}
                    isSelected={rect.id === selectedShape.id}
                    draggable
                    key={idx}
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={rect.height}
                    stroke={
                      selectedShape.id === rect.id ? 'yellow' : ''
                    }
                    fill="#eee"
                    onDragStart={() => {
                      this.setState({
                        isDraggin: true,
                      });
                    }}
                    onDragEnd={(e) => {
                      this.setState({
                        isDraggin: false,
                        currElementCoords: { x: e.target.x(), y: e.target.y() },
                      });
                      this.updateRectangels(rect);
                    }}
                    onSelect={() => {
                      this.setState({ selectedShape: {id: rect.id, name: rect.name} });
                    }}
                  />
                  
                ))}
            </Layer>
            <Layer>
              {items[0] &&
                items.map((item, idx) =>
                  !item.angle ? (
                    
                      <Circle
                        x={item.x}
                        y={item.y}
                        draggable
                        radius={item.radiusInMeters}
                        stroke={
                          selectedShape.id === item.id ? 'yellow' : ''
                        }
                        strokeWidth={1}
                        fillRadialGradientStartPoint={{x: 0, y: 0}}
                        fillRadialGradientEndPoint={{x: 0, y: 0}}
                        fillRadialGradientStartRadius={0}
                        fillRadialGradientEndRadius={item.radiusInMeters}
                        fillRadialGradientColorStops={[0, '#fdffa6', 0.5, 'rgba(253, 255, 166, .9)', 0.7, 'rgba(253, 255, 166, .7)', 0.9, 'rgba(253, 255, 166, .4)',   1, 'rgba(255, 255, 255, .1)']}
                        key={idx}
                        onDragStart={() => {
                          this.setState({
                            isDraggin: true,
                          });
                        }}
                        onDragEnd={(e) => {
                          this.setState({
                            isDraggin: false,
                            currElementCoords: {
                              x: e.target.x(),
                              y: e.target.y(),
                            },
                          });
                          this.updateItems(item);
                        }}
                      />

                      
                  ) : (
                    
                      <Shape
                        key={idx}
                        x={item.x}
                        y={item.y}
                        sceneFunc={(context, shape) => {
                          context.beginPath();
                          context.moveTo(0, 0);
                          context.lineTo(
                            item.radiusInMeters *
                              Math.cos(item.rotationAngle * 0.0174532925),
                            item.radiusInMeters *
                              Math.sin(-item.rotationAngle * 0.0174532925)
                          );
                          context.arc(
                            0,
                            0,
                            item.radiusInMeters,
                            ((360 - item.rotationAngle) / 180) * Math.PI,
                            ((item.angle - item.rotationAngle) / 180) * Math.PI,
                            false
                          );
                          context.closePath();
                          context.fillStrokeShape(shape);
                        }}
                        fillRadialGradientStartPoint={{x: 0, y: 0}}
                        fillRadialGradientEndPoint={{x: 0, y: 0}}
                        fillRadialGradientStartRadius={0}
                        fillRadialGradientEndRadius={item.radiusInMeters}
                        fillRadialGradientColorStops={[0, '#fdffa6', 0.5, 'rgba(253, 255, 166, .9)', 0.7, 'rgba(253, 255, 166, .7)', 0.9, 'rgba(253, 255, 166, .4)',   1, 'rgba(255, 255, 255, .1)']}
                        stroke={
                          selectedShape.id === item.id ? 'yellow' : ''
                        }
                        strokeWidth={1}
                        draggable
                        onDragStart={() => {
                          this.setState({
                            isDraggin: true,
                          });
                        }}
                        onDragEnd={(e) => {
                          this.setState({
                            isDraggin: false,
                            currElementCoords: {
                              x: e.target.x(),
                              y: e.target.y(),
                            },
                          });
                          this.updateItems(item);
                        }}
                        
                      />
                    
                  )
                )}
            </Layer>
          </Stage>
        </div>

        <Modal
          showModal={modal.showModal}
          modalName={modal.modalTitle}
          handleCloseModal={this.handleCloseModal}
          createRect={this.createRect}
          createItem={this.createItem}
        />
      </div>
    );
  }
}

export default NewProject;
