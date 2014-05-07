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

    describe("SettingsController", function(){
        var $scope;
        var mopidyConfiguration;
        beforeEach(inject(function($rootScope, $controller){
            $scope = $rootScope.$new();
            mopidyConfiguration = {
                webSocketUrl: 'something',
                setWebSocketUrl: jasmine.createSpy(),
            };
            $controller('SettingsController', {
                $scope: $scope,
                MopidyConfiguration: mopidyConfiguration
            });

        }));

        it("exposes the websocket url to the scope", function(){
            expect($scope.settings).toEqual(mopidyConfiguration);
        })
        describe('save(config)', function(){
            it("updates the websocket url on the mopidy configuration", function(){
                var config = {webSocketUrl: 'foo'}
                $scope.save(config);
                expect(mopidyConfiguration.setWebSocketUrl).toHaveBeenCalledWith(config.webSocketUrl)
            });

        })

    });

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

    describe("SearchController", function(){
        var searchResults;
        var $scope;
        var rootScope;
        var mopidy;
        var query = {
            phrase: 'dog moon night'
        }
        var location;

        beforeEach(inject(function($controller, $rootScope){
            rootScope = $rootScope;
            $scope = $rootScope.$new()
            location = jasmine.createSpyObj('$location', ['path']);
            spyOn($rootScope, '$digest');

            mopidy = new Mopidy();
            mopidy.mockSearchResults = ["mock results"];

            searchResults = jasmine.createSpyObj('searchResults', ['load']);

            $controller('SearchController', {
                $scope: $scope,
                SearchResults: searchResults,
                MopidyClient: mopidy,
                $rootScope: $rootScope,
                $location: location
            });
            $scope.search(query)

        }));
        it("navigates to the search view", function(){
            expect(location.path).toHaveBeenCalledWith('/search');
        })
        it("searches by query phrase and spotify uri", function(){
            expect(mopidy.library.search).toHaveBeenCalledWith({any: query.phrase}, ["spotify:"])
        });

        it("tells results controller to load the first set of results", function(){
            expect(searchResults.load).toHaveBeenCalledWith(mopidy.mockSearchResults[0]);
        });

        it("tells the scope to re-digest", function(){
            expect(rootScope.$digest).toHaveBeenCalled();
        });

    });
    describe("SearchResultsController", function(){
        var searchResults;
        var $scope;
        var mopidy;
        beforeEach(inject(function($controller, $rootScope){
            $scope = $rootScope.$new();
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
