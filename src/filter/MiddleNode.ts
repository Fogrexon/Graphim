import { GraphimNode } from './GraphimNode';

/**
 * node inserted between nodes
 *
 * @export
 * @abstract
 * @class MiddleNode
 * @extends {GraphimNode}
 */
export abstract class MiddleNode extends GraphimNode {
  /**
   * Connect input node
   *
   * @param {GraphimNode} inputNode
   * @memberof MiddleNode
   */
  public connect(inputNode: GraphimNode) {
    this.inputNode?.removeOutputNode(this);
    this.inputNode = inputNode;
    this.inputNode.setOutputNode(this);
  }

  /**
   * Disconnect input node
   *
   * @memberof MiddleNode
   */
  public disconnect() {
    this.inputNode?.removeOutputNode(this);
    this.inputNode = null;
  }

  /**
   * Release webgl object (only render )
   *
   * @memberof MiddleNode
   */
  public release() {
    super.release();
    this.inputNode?.release();
  }
}
