'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('qlab.controllers'));


  it('should ....', inject(function($controller) {
    //spec body
    var queuePageController = $controller('QueuePageController');
    expect(queuePageController).toBeDefined();
  }));

  it('should ....', inject(function($controller) {
    //spec body
    var settingsPageController = $controller('SettingsPageController');
    expect(settingsPageController).toBeDefined();
  }));
});
