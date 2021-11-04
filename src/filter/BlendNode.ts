import { CanvasID, GraphimNode } from './GraphimNode';

export abstract class BlendNode extends GraphimNode {
  protected inputNode2: GraphimNode | null = null;

  protected inputTextureLocation2: WebGLUniformLocation | null = null;

  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    super.init(gl, canvasID);

    this.inputTextureLocation2 = gl.getUniformLocation(
      <WebGLProgram>this.program,
      'renderTexture2'
    );
  }

  public connect(inputNode: GraphimNode, inputNode2: GraphimNode) {
    if (this.inputNode !== null) this.inputNode.removeOutputNode(this);
    if (this.inputNode2 !== null) this.inputNode2.removeOutputNode(this);
    this.inputNode = inputNode;
    this.inputNode.setOutputNode(this);
    this.inputNode2 = inputNode2;
    this.inputNode2.setOutputNode(this);
  }
}
