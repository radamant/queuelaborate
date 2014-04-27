'use strict';

describe('service', function() {
    beforeEach(module('qlab.services'));


    describe('version', function() {
        it('should return current version', inject(function(version) {
            expect(version).toEqual('0.1');
        }));
    });

    describe('MopidyConfiguration', function(){
        var mock;

        describe('when when server is in the location search', function(){
            beforeEach(function(){
                mock = {
                    search: function(){
                        return { server: "fooserver" };
                    }
                };

                module(function($provide) {
                    $provide.value('$location', mock);
                });
            });

            it('should return the server as ws address', inject(function(MopidyConfiguration){
                var address = MopidyConfiguration.webSocketUrl;
                expect(address).toEqual("ws://fooserver:6680/mopidy/ws/");
            }));
        });

        describe('when the server is not specified', function(){
            it('should not return a webSocketUrl value in the config', inject(function(MopidyConfiguration){
                expect(MopidyConfiguration.webSocketUrl).not.toBeDefined();
            }));
        });
    })

    describe('MopidyClient', function(){
        var mockConfiguration = "mock configuration";
        var mopidy;
        beforeEach(function(){
            mopidy = new Mopidy();
            spyOn(window, "Mopidy").andReturn(mopidy);

            module(function($provide){
                $provide.value("MopidyConfiguration", mockConfiguration);
            })
        })
        it("instantiates a new Mopidy object", inject(function(MopidyClient){
            expect(window.Mopidy).toHaveBeenCalledWith(mockConfiguration);
        }));

        describe("when mopidy comes online", function(){
            var mopidyOnline = "state:online";
            beforeEach(function(){
                mopidy.stubEvent(mopidyOnline);
            })
            it("sets the tracklist to consume", inject(function(MopidyClient){
                expect(mopidy.tracklist.setConsume).not.toHaveBeenCalled();
                mopidy.triggerEvent(mopidyOnline);
                expect(mopidy.tracklist.setConsume).toHaveBeenCalled();

            }));
        })
    });

    describe("Tracklist", function(){
        var mopidy;
        var mopidyOnline = "state:online";
        var tracklistChanged = "event:tracklistChanged";
        var mockScope = jasmine.createSpyObj('rootScope', ['$digest']);

        beforeEach(function(){
            mopidy = new Mopidy();
            mopidy.stubEvent(mopidyOnline);
            mopidy.stubEvent(tracklistChanged);
            module(function($provide){
                $provide.value('MopidyClient', mopidy);
                $provide.value('$rootScope', mockScope);
            });
        });

        it("refreshes the tracklist when mopidy comes online", inject(function(Tracklist){
            mopidy.triggerEvent(mopidyOnline);
            expect(mopidy.tracklist.getTracks).toHaveBeenCalled();
        }));

        it("refreshes the tracklist when the tracklist has changed", inject(function(Tracklist){
            mopidy.triggerEvent(tracklistChanged);
            expect(mopidy.tracklist.getTracks).toHaveBeenCalled();
        }));

        describe("when the tracklist has changed", function(){
            beforeEach(inject(function(Tracklist){
                mopidy.mockTracklist = ['a', 'b', 'c']
                mopidy.triggerEvent(tracklistChanged);
            }));

            it("assigns its tracks property with the new tracks", inject(function(Tracklist){
                expect(Tracklist.tracks).toEqual(mopidy.mockTracklist);
            }));

            it("tells the root scope to digest data", inject(function(Tracklist){
                expect(mockScope.$digest).toHaveBeenCalled();
            }));

        });

        describe(".remove(track)", function(){
            var track = {uri: "an uri"};

            it("removes the track by its URI", inject(function(Tracklist){
                Tracklist.remove(track);
                expect(mopidy.tracklist.remove).toHaveBeenCalledWith({
                    uri: [track.uri]
                });
            }));
        });
    });

    describe('SearchResults', function(){
        it('can re-load itself with opidy results', inject(function(SearchResults){
            var results = mockSearchResults()
            SearchResults.load(results);
            expect(SearchResults.albums).toEqual(results.albums);
            expect(SearchResults.artists).toEqual(results.artists);
            expect(SearchResults.tracks).toEqual(results.tracks);
        }));
    });
});
