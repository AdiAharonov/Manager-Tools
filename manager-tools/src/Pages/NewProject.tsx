import React, { Component, MouseEvent } from 'react';
import { ToolBar } from '../Cmps/ToolBar';
import { Stage, Layer, Image, Line } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { globalService } from '../Services/globalServices';

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
  img: string,
  currTool: string,
  formation: number[],
  currLayer: {id: number, name: string, formation: number[]},
  layers: {id: number, name: string, formation: number[]}[],
  loading: boolean
}

class NewProject extends Component {
  state: State = {
    img: '',
    currTool: '',
    formation: [],
    currLayer: { id: 101, name: 'Default Layer', formation: [] },
    layers: [],
    loading: true
  };

  componentDidMount() {
    const defualtLayers = globalService.getGLayers();
    this.setState({layers: defualtLayers, currLayer: defualtLayers[0], loading: false});
  }

  uploadImg = (url: string) => {
    this.setState({ img: url });
  };

  setCurrTool = (toolName: string) => {
    this.setState({ currTool: toolName });
  };

  selectLayer = (ev: MouseEvent) => {
    const { currLayer, formation, layers} = this.state;
    console.log(currLayer)
    globalService.updateLayer(currLayer.id, formation);
    const newCurrLayer: number = +ev.currentTarget.id;
    this.setState({ currLayer: layers[newCurrLayer], formation: layers[newCurrLayer].formation})
    
  }

  addLayer = () => {
    const newLayer = globalService.createNewLayer();
    this.setState({
      layers: [...this.state.layers, newLayer]
    })
    
  }

  // Draw tool

  handleMouseDown = (ev: Konva.KonvaEventObject<MouseEvent>) => {
    if (this.state.currTool !== 'pen') return
    // Problem - ev.evt.offsetX dosent work, meanwhile i use pageX
    const xPosition = (ev.evt.pageX - 212);
    const yPosition = (ev.evt.pageY - 50);
    // console.log(xPosition, yPosition);
    this.setState({
      formation: [...this.state.formation, xPosition, yPosition],
      currLayer: {...this.state.currLayer, formation: [...this.state.formation, xPosition, yPosition]}
    });
    
  };

  render() {
    const { img, layers } = this.state;

    return (
      <div className="new-project">
        <ToolBar uploadImg={this.uploadImg} setCurrTool={this.setCurrTool} />

      <div>
        <button onClick={this.addLayer}>Add Layer</button>
    {layers[0] && layers.map((layer, idx) => <button key={idx} id={idx.toString()} className={layer.name} onClick={this.selectLayer}>{layer.name}</button>)}
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
            <Layer>
              {!this.state.loading && <Line x={0} y={0} points={this.state.currLayer.formation} stroke="black" />}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default NewProject;
