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
        var controller = $controller('PlaybackController', {$scope: {}, MopidyClient: {}});
        expect(controller).toBeDefined();
    }));

    describe("PlaybackController", function(){
        var mopidy;
        var $scope
        beforeEach(inject(function($rootScope, $controller){
            mopidy = new Mopidy();
            $scope = $rootScope.$new();
            $controller('PlaybackController', {$scope: $scope, MopidyClient: mopidy});
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

    describe("TracklistController", function(){
        var $scope;
        var tracklist;

        beforeEach(inject(function($rootScope, $controller){
            tracklist = jasmine.createSpyObj("tracklist", ["remove"]);
            $scope = $rootScope.$new();
            $controller('TracklistController', {
                $scope: $scope,
                Tracklist: tracklist
            })
        }));

        it("assigns Tracklist service to the scope", function(){
            expect($scope.tracklist).toEqual(tracklist);
        });

        describe("remove(track)", function(){
            it("delegates to the Tracklist service", function(){
                var track = jasmine.createSpy("track");
                $scope.remove(track);
                expect(tracklist.remove).toHaveBeenCalledWith(track);            });

        })
    });

    describe("SearchResultsController", function(){
        var searchResults;
        var $scope = {};
        var mopidy;
        beforeEach(inject(function($controller){
            mopidy = new Mopidy()
            searchResults = jasmine.createSpy("searchResults");
            $controller('SearchResultsController', {
                $scope: $scope,
                SearchResults: searchResults,
                MopidyClient: mopidy
            });
        }));

        it('assigns the SearchResults service to the scope', function(){
            expect($scope.results).toEqual(searchResults);
        });

        describe('queue(item)', function(){
            var item;
            beforeEach(function(){
                item = mockTrack();
                $scope.queue(item);
            });
            it('queues the item by its URI', function(){
                expect(mopidy.tracklist.add).toHaveBeenCalledWith(null, null, item.uri);
            })
        });
    });
});
