import React, { Component, MouseEvent } from 'react';
import { ToolBar } from '../Cmps/ToolBar';
import { Stage, Layer, Image, Line, Rect,Transformer,  Circle, Shape } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { globalService } from '../Services/globalServices';
import { Modal } from '../Cmps/Modal';
import { CanvasGridLayer } from '../Cmps/CanvasGridLayer';

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
  currLayer: { id: number; name: string; formation: number[] };
  layers: { id: number; name: string; formation: number[] }[];
  loading: boolean;
  modal: { showModal: boolean; modalTitle: string };
  rectangels: {
    id: number;
    name: String;
    width: number;
    height: number;
    x: number;
    y: number;
  }[];
  isDraggin: boolean;
  currElementCoords: { x: number; y: number };
  showGrid: boolean;
  items: { name: String, title: String, radiusInMeters: number, angle: number }[];
  selectedShapeName: String;
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
    selectedShapeName: ''
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
      console.log(this.state.items);
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
    this.setState({ showGrid: !this.state.showGrid});
  }

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
    
    const selectedCanvasObj = globalService.findCanvasObj(xPosition, yPosition)
    this.setState({ selectedShapeName: selectedCanvasObj.name})
  };

  // Shapes


  createRect = (name: string, width: number, height: number) => {
    globalService.createRect(name, width, height);
    this.setState({ rectangels: globalService.getRectangels() });
  };

  updateRectangels = (rect: { id: number; name: String; width: number; height: number; x: number; y: number; }) => {
    const updatedRectangels: { id: number; name: String; width: number; height: number; x: number; y: number; }[] = globalService.updateRectangels(rect, this.state.currElementCoords);
    this.setState({ rectangels: updatedRectangels })
  };

  createItem = ( name: String, title: String, radiusInMeters: number, angle: number ) => {
    globalService.createItem(name, title, radiusInMeters, angle);
    this.setState({ items: globalService.getItems() });
  }

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
      selectedShapeName
    } = this.state;

    return (
      <div className="new-project">
        <ToolBar
          uploadImg={this.uploadImg}
          setCurrTool={this.setCurrTool}
          handleOpenModal={this.handleOpenModal}
        />

        <h2>{currTool}</h2>
        <h2>{selectedShapeName}</h2>
        <div>
          <button onClick={this.handleUndo}>Undo</button>
          <button onClick={this.handleRedo}>Redo</button>
          <button onClick={this.addLayer}>Add Layer</button>
          <button onClick={this.handleGrid}>{showGrid ? 'Hide' : 'Show'} Grid</button>
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
            <CanvasGridLayer width={window.innerWidth - 250} hieght={window.innerHeight - 100} showGrid={showGrid}/>
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
                    stroke={ selectedShapeName === rect.name ? 'yellow' : ''}
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
                      this.updateRectangels(rect)
                    }}
                    onSelect={() => {
                      this.setState({ selectedShapeName: rect.name });
                    }}
                  />
                 
                ))}
            </Layer>
            <Layer>
              { items[0] &&
                  items.map(( item, idx ) => ( !item.angle ? 
                   <Circle
                    x={100}
                    y={100}
                    draggable
                    radius={item.radiusInMeters}
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
                        currElementCoords: { x: e.target.x(), y: e.target.y() },
                      });
                      
                    }}
                  />

                  :

                  <Shape
                  key={idx}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(100, 100);
            context.lineTo(100 + item.radiusInMeters, 100);;
            context.arc(100, 100, item.radiusInMeters, 0, item.angle * Math.PI / 180, false)
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          fill="#00D2FF"
          stroke="black"
          strokeWidth={1}
          draggable
        />

                  ))}
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
