import { GraphimNode } from './GraphimNode';

export abstract class MiddleNode extends GraphimNode {
  public connect(inputNode: GraphimNode) {
    if (this.inputNode !== null) this.inputNode.removeOutputNode(this);
    this.inputNode = inputNode;
    this.inputNode.setOutputNode(this);
  }
}