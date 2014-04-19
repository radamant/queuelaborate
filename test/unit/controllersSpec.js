'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
    beforeEach(module('qlab.controllers'));


    it('should have a QueuePageController', inject(function($controller) {
        var queuePageController = $controller('QueuePageController');
        expect(queuePageController).toBeDefined();
    }));

    it('should have a SettingsPageController', inject(function($controller) {
        var settingsPageController = $controller('SettingsPageController');
        expect(settingsPageController).toBeDefined();
    }));

    it('should have a PlaybackController', inject(function($controller) {
        var controller = $controller('PlaybackController', {$scope: {}, MopidyEngine: {}});
        expect(controller).toBeDefined();
    }));

    describe("PlaybackController", function(){
        var mopidy;
        var $scope
        beforeEach(inject(function($rootScope, $controller){
            mopidy = new Mopidy();
            $scope = $rootScope.$new();
            $controller('PlaybackController', {$scope: $scope, MopidyEngine: mopidy});
        }));

        it("calls mopidy's playback.play() on play()", function(){
            $scope.play();
            expect(mopidy.playback.play).toHaveBeenCalled();
        });

        it("calls mopidy's playback.pause() on pause()", function(){
            $scope.pause();
            expect(mopidy.playback.pause).toHaveBeenCalled();
        })

        it("calls mopidy's playback.next() on next()", function(){
            $scope.next();
            expect(mopidy.playback.next).toHaveBeenCalled();
        })

        it("calls mopidy's playback.previous() on previous()", function(){
            $scope.previous();
            expect(mopidy.playback.previous).toHaveBeenCalled();
        })
    });
});
