import { CanvasID, GraphimNode } from './GraphimNode';

/**
 * Base node with two input filter
 *
 * @export
 * @abstract
 * @class BlendNode
 * @extends {GraphimNode}
 */
export abstract class BlendNode extends GraphimNode {
  protected inputNode2: GraphimNode | null = null;

  protected inputTextureLocation2: WebGLUniformLocation | null = null;

  /**
   * Initialize program (only renderer calls)
   *
   * @param {WebGLRenderingContext} gl
   * @param {CanvasID} canvasID
   * @memberof BlendNode
   */
  public init(gl: WebGLRenderingContext, canvasID: CanvasID) {
    super.init(gl, canvasID);

    this.inputTextureLocation2 = gl.getUniformLocation(
      <WebGLProgram>this.program,
      'renderTexture2'
    );
  }

  /**
   * Connect two input nodes
   *
   * @param {GraphimNode} inputNode
   * @param {GraphimNode} inputNode2
   * @memberof BlendNode
   */
  public connect(inputNode: GraphimNode, inputNode2: GraphimNode) {
    if (this.inputNode !== null) this.inputNode.removeOutputNode(this);
    if (this.inputNode2 !== null) this.inputNode2.removeOutputNode(this);
    this.inputNode = inputNode;
    this.inputNode.setOutputNode(this);
    this.inputNode2 = inputNode2;
    this.inputNode2.setOutputNode(this);
  }

  /**
   * Disconnect two input nodes
   *
   * @memberof BlendNode
   */
  public disconnect() {
    if (this.inputNode !== null) this.inputNode.removeOutputNode(this);
    if (this.inputNode2 !== null) this.inputNode2.removeOutputNode(this);
    this.inputNode = null;
    this.inputNode2 = null;
  }

  /**
   * Release webgl objects
   *
   * @memberof BlendNode
   */
  public release() {
    super.release();
    this.inputNode?.release();
    this.inputNode2?.release();
  }
}
