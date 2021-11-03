import { GraphimNode } from './GraphimNode';

export abstract class BlendNode extends GraphimNode {
  protected inputNode2: GraphimNode | null = null;

  protected inputTextureLocation2: WebGLUniformLocation | null = null;

  public init(gl: WebGLRenderingContext) {
    super.init(gl);

    this.inputTextureLocation2 = gl.getUniformLocation(<WebGLProgram>this.program, 'targetTexture2');
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