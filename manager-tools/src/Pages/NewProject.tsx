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
  selectedShapeName: String;
  itemRotaionDeg: number;
  intervalId: NodeJS.Timeout;
}

class NewProject extends Component {
  state: State = {
    img: '',
    currTool: '',
    formation: [],
    currLayer: { id: 101, name: 'Default Layer', formation: [] },
    layers: [],
    loading: true,
    modal: { showModal: false, modalTitle: 'Default' },
    rectangels: [],
    isDraggin: false,
    currElementCoords: { x: 0, y: 0 },
    showGrid: true,
    items: [],
    selectedShapeName: '',
    itemRotaionDeg: 0,
    intervalId: setInterval(() => {}, 100),
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
      // console.log(this.state.items);
    }
  }

  // Set the background image

  uploadImg = (url: string) => {
    this.setState({ img: url });
  };

  setCurrTool = (toolName: string) => {
    this.setState({ currTool: toolName });
    this.handleOpenModal(toolName);
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

  handleGrid = () => {
    this.setState({ showGrid: !this.state.showGrid });
  };

  handleItemRotaionClockwise = (e: MouseEvent) => {
    e.preventDefault();

    if (e.type === 'mousedown') {
      const rotation: NodeJS.Timeout = setInterval(() => {
        this.setState({ itemRotaionDeg: this.state.itemRotaionDeg - 1 });
      }, 50);
      this.setState({ intervalId: rotation });
    }
    if (e.type === 'mouseup') {
      clearInterval(this.state.intervalId);
    }
  };
  handleItemRotaionCounterClockwise = (e: MouseEvent) => {
    e.preventDefault();

    if (e.type === 'mousedown') {
      const rotation: NodeJS.Timeout = setInterval(() => {
        this.setState({ itemRotaionDeg: this.state.itemRotaionDeg + 1 });
      }, 50);
      this.setState({ intervalId: rotation });
    }
    if (e.type === 'mouseup') {
      clearInterval(this.state.intervalId);
    }
  };

  // Mouse Events

  handleMouseDown = (ev: Konva.KonvaEventObject<MouseEvent>) => {
    // Current X,Y canvas click position
    // Problem - ev.evt.offsetX dosent work, meanwhile i use pageX
    const xPosition = ev.evt.pageX - 250;
    const yPosition = ev.evt.pageY - 50;

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
    }

    // Handle Select/Deslect Canvas Object

    const selectedCanvasObj = globalService.findCanvasObj(xPosition, yPosition);
    this.setState({ selectedShapeName: selectedCanvasObj.name });
    // console.log(selectedCanvasObj)
  };

  // Shapes

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
    console.log(this.state.currElementCoords);
    const updatedItems: ItemInterface[] = globalService.updateItems(
      item,
      this.state.currElementCoords
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
      selectedShapeName,
      currElementCoords,
      itemRotaionDeg,
    } = this.state;

    return (
      <div className="new-project">
        <ToolBar
          uploadImg={this.uploadImg}
          setCurrTool={this.setCurrTool}
          handleOpenModal={this.handleOpenModal}
        />

        {/* <h2>{currTool}</h2> */}
        {/* <h2>{selectedShapeName}</h2> */}
        <h2>{itemRotaionDeg}</h2>
        <div>
          <button onClick={this.handleUndo}>Undo</button>
          <button onClick={this.handleRedo}>Redo</button>
          <button onClick={this.addLayer}>Add Layer</button>
          <button
            onMouseDown={this.handleItemRotaionClockwise}
            onMouseUp={this.handleItemRotaionClockwise}
          >
            Rotate Clockwise
          </button>
          <button
            onMouseDown={this.handleItemRotaionCounterClockwise}
            onMouseUp={this.handleItemRotaionCounterClockwise}
          >
            Rotate Counter Clockwise
          </button>

          <button onClick={this.handleGrid}>
            {showGrid ? 'Hide' : 'Show'} Grid
          </button>
          {layers[0] &&
            layers.map((layer, idx) => (
              <button
                key={idx}
                id={idx.toString()}
                className={layer.name}
                onClick={this.selectLayer}
              >
                {layer.name}
              </button>
            ))}
        </div>

        <div className="canvas-area">
          <Stage
            width={window.innerWidth - 250}
            height={window.innerHeight - 100}
            onContentMousedown={this.handleMouseDown}
          >
            <Layer>
              <BgImage url={img} />
            </Layer>
            <CanvasGridLayer
              width={window.innerWidth - 250}
              hieght={window.innerHeight - 100}
              showGrid={showGrid}
            />
            <Layer>
              {!loading && (
                <Line x={0} y={0} points={currLayer.formation} stroke="black" />
              )}
            </Layer>
            <Layer>
              {rectangels[0] &&
                rectangels.map((rect, idx) => (
                  <Rect
                    shapeProps={rect}
                    isSelected={rect.name === selectedShapeName}
                    draggable
                    key={idx}
                    x={rect.x}
                    y={rect.y}
                    width={rect.width}
                    height={rect.height}
                    stroke={
                      selectedShapeName === rect.name ? 'yellow' : 'black'
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
                      this.setState({ selectedShapeName: rect.name });
                    }}
                  />
                ))}
            </Layer>
            <Layer>
              {items[0] &&
                items.map((item, idx) =>
                  !item.angle ? (
                    <>
                      <Circle
                        x={item.x}
                        y={item.y}
                        draggable
                        radius={item.radiusInMeters}
                        stroke={
                          selectedShapeName === item.name ? 'yellow' : 'black'
                        }
                        fill="green"
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

                      <Text
                        x={item.x + item.radiusInMeters + 10}
                        y={item.y}
                        fill={
                          selectedShapeName === item.name ? 'yellow' : 'black'
                        }
                        text={item.title}
                        fontSize={16}
                      />
                    </>
                  ) : (
                    <>
                      <Shape
                        key={idx}
                        x={item.x}
                        y={item.y}
                        sceneFunc={(context, shape) => {
                          context.beginPath();
                          context.moveTo(0, 0);
                          context.lineTo(
                            item.radiusInMeters *
                              Math.cos(itemRotaionDeg * 0.0174532925),
                            item.radiusInMeters *
                              Math.sin(-itemRotaionDeg * 0.0174532925)
                          );
                          context.arc(
                            0,
                            0,
                            item.radiusInMeters,
                            ((360 - itemRotaionDeg) / 180) * Math.PI,
                            ((item.angle - itemRotaionDeg) / 180) * Math.PI,
                            false
                          );
                          context.closePath();
                          context.fillStrokeShape(shape);
                        }}
                        fill="#00D2FF"
                        stroke={
                          selectedShapeName === item.name ? 'yellow' : 'black'
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

                      <Text
                        x={item.x + item.radiusInMeters + 10}
                        y={item.y}
                        fill={
                          selectedShapeName === item.name ? 'yellow' : 'black'
                        }
                        text={item.title}
                        fontSize={16}
                      />
                      <Text
                        x={item.x + item.radiusInMeters + 10}
                        y={item.y + 30}
                        fill={
                          selectedShapeName === item.name ? 'yellow' : 'black'
                        }
                        text={item.angle.toString() + ' Deg'}
                        fontSize={16}
                      />
                    </>
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
