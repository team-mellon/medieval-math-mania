//==============================================================================
//                                                                            ||
// OBJECT CONFIG                                                              ||
//============================================================================||
//                                                                            ||
// Initial configuration for generating and object                            ||
//                                                                            ||
//==============================================================================

class ObjectConfig {

  constructor(objectType = 'default', type = 'image', width = 100, height = 100, xLock = 'center', xOffset = 0, yLock = 'center', yOffset = 0) {

    this.objectType = objectType;
    this.type = type;
  
    this.width = width;
    this.height = height;
  
    this.xLock = xLock;
    this.xOffset = xOffset;
    this.yLock = yLock;
    this.yOffset = yOffset;
  
  }

}

export default ObjectConfig;