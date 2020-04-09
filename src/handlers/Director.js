//==============================================================================
//                                                                            ||
// DIRECTOR                                                                   ||
//============================================================================||
//                                                                            ||
// This module is a handler for managing scenes.                              ||
//                                                                            ||
//==============================================================================

import { sceneData, sceneManifest } from '../game_data/scenes.js';
import FormHandler from '../handlers/FormHandler.js';

class Director {

  /**
   * Constructor for the scaling component of the engine.
   * @constructor
   */
  constructor() {

    this.sceneHtml;
    this.currentScene = 10;
    this.lastScene = 0;

  }

  /**
   * Function to scale the entire stage.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} currentScene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} stage - The stage that displays the content.
   */

  /**
   * Calculate the scene scaling.
   * @param {object} stage - The stage that displays the content.
   */

  /**
   * Function to scale the image-like assets.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} currentScene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} stage - The stage that displays the content.
   */

  /**
   * Function to snap items to the edges of screen.
   * @param {object} stage - The stage that displays the content.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} startValues : { x: xStart, y: yStart } - The starting location values.
   */

  /**
   * Function to load the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} platformScale - The platform specific scale of that entity.
   */    // L
  loadCurrentScene(entityComponentSystem, stage, background, level) {

    // Clear HTML before creating a new scene
    this.clearHtml();

    // Destroy the last scene
    this.destroyScene(entityComponentSystem, stage);

    // Load background color for the scene
    background.color = sceneData[this.currentScene].color;

    // If the current scene is the game load the special level assets
    if (this.currentScene == 3) {

      background.color = levelData[level.current_level].color;

      if (!level.generated) {

        level.loadLevel();

      } else {

        FormHandler.createGameForm(level.multiplicand, level.sign, level.equal, level.solution, level.history_list2, level.play_tutorial, mobile.isMobile);
        level.remakeMultiplierBanner();
        level.remakeRangeBanner();

      }

    }

  }

  /**
   * A function to change the current scene to a new scene.
   * @param {object} newScene - The index of the scene to navigate to.
   */
  changeScene(newScene, entityComponentSystem, stage, background, level) {

    // Set the last scene to the current scene
    this.lastScene = this.currentScene;

    // Set the current scene to the new scene
    this.currentScene = newScene;

    // Load the scene
    this.loadCurrentScene(entityComponentSystem, stage, background, level);

  }

  /**
   * A function to clear the stage and entity components.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} stage - The stage that displays the content.
   */
  destroyScene(entityComponentSystem, stage) {

    // Clear the stage.
    stage.removeAllChildren();

    // Clear the entity component system.
    entityComponentSystem = [];

  }

  /**
   * A function to clear the html currently being added to the screen.
   */
  clearHtml() {

    // Get the element that contains the custom HTML for the scene.
    this.sceneHtml = document.getElementById("sceneHTML");

    // Until there are no more children elements...
    while (this.sceneHtml.firstChild) {

      // Remove the first child element.
      this.sceneHtml.removeChild(this.sceneHtml.firstChild);

    }

  }

}
export default Director;
