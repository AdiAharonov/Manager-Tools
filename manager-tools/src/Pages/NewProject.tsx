import React, { Component } from 'react';
import { ToolBar } from '../Cmps/ToolBar';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';

const BgImage: React.FC<{ url: string }> = ({ url }) => {
  const [image] = useImage(url);
  return <Image image={image} width={window.innerWidth - 250} height={window.innerHeight - 100} />;
};

class NewProject extends Component {
  state = {
    img: '',
  };

  uploadImg = (url: string) => {
    this.setState({ img: url });
    console.log(this.state);
  };

  render() {
    const img = this.state.img;
    console.log(window)
    return (
      <div className="new-project">
        <div className="toolbar">
          <ToolBar uploadImg={this.uploadImg} />
        </div>
        <div className="canvas-area">
          <Stage width={window.innerWidth - 250} height={window.innerHeight - 100}>
            <Layer>
              <BgImage url={img} />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default NewProject;
