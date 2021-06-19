import React, { Component, MouseEvent, useRef } from 'react';
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
import { ContextMenu } from '../Cmps/ContextMenu';
import { CanvasGridLayer } from '../Cmps/CanvasGridLayer';
import { LayersBar } from '../Cmps/LayersBar';
import { CanvasOptions } from '../Cmps/CanvasOptions';
import {
  RectInterface,
  LayerInterface,
  ItemInterface,
} from '../Services/interfaceService';

// BackGround image for the canvas cmp

const BgImage: React.FC<{
  url: string;
  size: { width: number; height: number };
}> = ({ url, size }) => {
  const [image] = useImage(url, 'Anonymous');
  return (
    <Image image={image} width={size.width - 52} height={size.height - 54} draggable />
  );
};

// Stage ref

const stageRef: React.RefObject<Konva.Stage> = React.createRef();

interface State {
  img: string;
  backgroundImageSize: { width: number; height: number };
  currTool: string;
  formation: number[];
  currLayer: LayerInterface;
  layers: LayerInterface[];
  loading: boolean;
  drawOnLines: boolean;
  modal: { showModal: boolean; modalTitle: string };
  contextMenu: { showContextMenu: boolean; x: number; y: number };
  rectangels: RectInterface[];
  isDraggin: boolean;
  currElementCoords: { x: number; y: number };
  showGrid: boolean;
  gridLineDistance: number;
  items: ItemInterface[];
  selectedShape: { id: number; name: string; type: string };
  itemRotaionDeg: number;
  intervalId: number;
  showLayersBar: boolean;
}

class NewProject extends Component {
  state: State = {
    img: '',
    backgroundImageSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    currTool: '',
    formation: [],
    currLayer: {
      id: 101,
      name: 'Default Layer',
      formation: [20, 50, 100, 100, 300, 300],
      show: true,
    },
    layers: [],
    loading: true,
    drawOnLines: false,
    modal: { showModal: false, modalTitle: 'Default' },
    contextMenu: { showContextMenu: false, x: 0, y: 0 },
    rectangels: [],
    isDraggin: false,
    currElementCoords: { x: 0, y: 0 },
    showGrid: true,
    gridLineDistance: 20,
    items: [],
    selectedShape: { id: 0, name: '', type: '' },
    itemRotaionDeg: 0,
    intervalId: setInterval(() => {}, 100),
    showLayersBar: false,
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
    if (prevState.items !== this.state.items) {
    }
  }

  // Set the background image

  uploadImg = (url: string) => {
    this.setState({ img: url });
  };

  // Resize the background image

  incBGImage = () => {
    if (!this.state.img) return;
    this.setState({
      backgroundImageSize: {
        width: this.state.backgroundImageSize.width + window.innerWidth / 10,
        height: this.state.backgroundImageSize.height + window.innerHeight / 10,
      },
    });
  };

  decBGImage = () => {
    if (!this.state.img) return;
    this.setState({
      backgroundImageSize: {
        width: this.state.backgroundImageSize.width - window.innerWidth / 10,
        height: this.state.backgroundImageSize.height - window.innerHeight / 10,
      },
    });
  };

  // Handle tool selecting

  setCurrTool = (toolName: string) => {
    this.setState({ selectedShape: {} });
    this.setState({ currTool: toolName });
    this.handleOpenModal(toolName);
    if (toolName === 'layers') {
      this.setState({
        showLayersBar: true,
      });
    } else {
      this.setState({
        showLayersBar: false,
      });
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
      layers: updatedLayers,
    });
  };

  handleGrid = () => {
    this.setState({ showGrid: !this.state.showGrid });
  };

  handleItemRotaionClockwise = (e: MouseEvent) => {
    e.preventDefault();
    const currItem = globalService.getItemById(this.state.selectedShape.id);

    if (e.type === 'mousedown' && this.state.selectedShape.name) {
      const rotation: number = setInterval(() => {
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
    const currItem = globalService.getItemById(this.state.selectedShape.id);

    if (e.type === 'mousedown' && this.state.selectedShape.name) {
      const rotation: number = setInterval(() => {
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
      let pointsToDraw = {xPos: xPosition, yPos: yPosition};
      if (this.state.drawOnLines) pointsToDraw = globalService.getClosestGridPoint(xPosition, yPosition, this.state.gridLineDistance)

      this.setState({
        formation: [...this.state.formation, pointsToDraw.xPos, pointsToDraw.yPos],
        currLayer: {
          ...this.state.currLayer,
          formation: [...this.state.formation, pointsToDraw.xPos, pointsToDraw.yPos],
        },
      });
      globalService.updateLayer(this.state.currLayer.id, this.state.formation);
    }

    // Handle Select/Deslect Canvas Object

    const selectedCanvasObj = globalService.findCanvasObj(xPosition, yPosition);
    this.setState({
      selectedShape: {
        id: selectedCanvasObj.id,
        name: selectedCanvasObj.name,
        type: selectedCanvasObj.type,
      },
      currElementCoords: { x: selectedCanvasObj.x, y: selectedCanvasObj.y },
    });
    if (selectedCanvasObj.rotationAngle)
      this.setState({ itemRotaionDeg: selectedCanvasObj.rotationAngle });

    // Handle right click (context menu over the canvas)

    if (ev.evt.button === 2 && this.state.selectedShape.name) {
      this.setState({
        contextMenu: {
          showContextMenu: true,
          x: ev.evt.pageX + 5,
          y: ev.evt.pageY + 5,
        },
      });
    }
    if (ev.evt.button !== 2 || !this.state.selectedShape.name) {
      this.setState({ contextMenu: { showContextMenu: false } });
    }
  };

  // Pen options

  setDrawOnLines = () => {
    this.setState({drawOnLines: !this.state.drawOnLines})
  }

  // Shapes

  // Rectangel "Rooms?"

  createRect = (name: string, width: number, height: number) => {
    globalService.createRect(name, width, height);
    this.setState({ rectangels: globalService.getRectangels() });
    this.setState({ currTool: '' });
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
    this.setState({ currTool: '' });
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
      this.setState({ modal: { showModal: false, modalTitle: '' } });
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

  // ContextMenu

  handleColorChange = (
    shape: { id: number; name: string; type: string },
    color: { r: string; g: string; b: string; a: string; rgba: string }
  ) => {
    const updatedShapes = globalService.updateBgc(shape, color);
    if (shape.type === 'rect') {
      this.setState({ rectangels: updatedShapes });
    }
    if (shape.type === 'item') {
      this.setState({ items: updatedShapes });
    }
  };

  // Save as image

  handleExportClick = () => {
    console.log(stageRef.current);
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL({
      mimeType: 'image/jpeg',
      quality: 0,
      pixelRatio: 2,
    });
    this.downloadURI(dataURL, 'Project');
  };

  downloadURI = (uri: any, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const {
      img,
      backgroundImageSize,
      layers,
      modal,
      contextMenu,
      currLayer,
      drawOnLines,
      loading,
      currTool,
      rectangels,
      isDraggin,
      showGrid,
      gridLineDistance,
      items,
      selectedShape,
      currElementCoords,
      itemRotaionDeg,
      showLayersBar,
    } = this.state;

    return (
      <div className="new-project">
        <ToolBar
          uploadImg={this.uploadImg}
          setCurrTool={this.setCurrTool}
          handleOpenModal={this.handleOpenModal}
          handleExportClick={this.handleExportClick}
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
          handleItemRotaionCounterClockwise={
            this.handleItemRotaionCounterClockwise
          }
          showGrid={showGrid}
          incBGImage={this.incBGImage}
          decBGImage={this.decBGImage}
          setDrawOnLines={this.setDrawOnLines}
          drawOnLines={drawOnLines}
        />

        <div className={showLayersBar ? 'layers-bar active' : 'layers-bar'}>
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
          <h5>
            X: {currElementCoords.x} Y: {currElementCoords.y}
          </h5>
          <h5>{'Rotation degree: ' + itemRotaionDeg}</h5>
        </div>

        <div className="canvas-area">
          <Stage
            ref={stageRef}
            width={
              showLayersBar ? window.innerWidth - 252 : window.innerWidth - 54
            }
            height={window.innerHeight - 62}
            onContentMousedown={this.handleMouseDown}
            onContextMenu={(e) => {
              e.evt.preventDefault();
            }}
          >
            <Layer>
              <BgImage url={img} size={backgroundImageSize} />
            </Layer>
            <CanvasGridLayer
              width={
                showLayersBar ? window.innerWidth - 252 : window.innerWidth - 54
              }
              hieght={window.innerHeight - 61.5}
              showGrid={showGrid}
              gridLineDistance={gridLineDistance}
            />
            <Layer>
              {layers[0] &&
                layers.map(
                  (layer) =>
                    layer.show && (
                      <Line
                        x={0}
                        y={0}
                        points={layer.formation}
                        stroke="black"
                        key={layer.id}
                        style={layer.show ? '' : { display: 'none' }}
                      />
                    )
                )}
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
                    stroke={selectedShape.id === rect.id ? 'yellow' : ''}
                    fill={rect.color}
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
                      this.setState({
                        selectedShape: { id: rect.id, name: rect.name },
                      });
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
                      stroke={selectedShape.id === item.id ? 'yellow' : ''}
                      strokeWidth={1}
                      fillRadialGradientStartPoint={{ x: 0, y: 0 }}
                      fillRadialGradientEndPoint={{ x: 0, y: 0 }}
                      fillRadialGradientStartRadius={0}
                      fillRadialGradientEndRadius={item.radiusInMeters}
                      fillRadialGradientColorStops={[
                        0,
                        `rgba(${item.color.r},${item.color.g},${item.color.b},100)`,
                        0.5,
                        `rgba(${item.color.r},${item.color.g},${item.color.b},0.9)`,
                        0.7,
                        `rgba(${item.color.r},${item.color.g},${item.color.b},0.8)`,
                        0.9,
                        `rgba(${item.color.r},${item.color.g},${item.color.b},0.6)`,
                        1,
                        `rgba(${item.color.r},${item.color.g},${item.color.b},0.2)`,
                      ]}
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
                      // Problem: gardient not works like in circle

                      // fillRadialGradientStartPoint={{x: 0, y: 0}}
                      // fillRadialGradientEndPoint={{x: 0, y: 0}}
                      // fillRadialGradientStartRadius={0}
                      // fillRadialGradientEndRadius={item.radiusInMeters}
                      // fillRadialGradientColorStops={[0, `rgba(${item.color.r},${item.color.g},${item.color.b},100)`, 0.5, `rgba(${item.color.r},${item.color.g},${item.color.b},90)`, 0.7, `rgba(${item.color.r},${item.color.g},${item.color.b},0.8)`, 0.9, `rgba(${item.color.r},${item.color.g},${item.color.b},0.6)`,   1, `rgba(${item.color.r},${item.color.g},${item.color.b},0.2)`]}

                      // Simple fill untill gardient fixed

                      fill={`rgba(${item.color.r},${item.color.g},${
                        item.color.b
                      },${
                        item.color.a === '100' ? '100' : `0.${item.color.a}`
                      })`}
                      stroke={selectedShape.id === item.id ? 'yellow' : ''}
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

        <ContextMenu
          showContextMenu={contextMenu.showContextMenu}
          x={contextMenu.x}
          y={contextMenu.y}
          selectedShape={selectedShape}
          handleColorChange={this.handleColorChange}
        />
      </div>
    );
  }
}

export default NewProject;
