'use strict';

/* jasmine specs for services go here */

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
                mopidy.onlineCallback = function(){}
                mopidy.stubEvent(mopidyOnline);
            })
            it("sets the tracklist to consume", inject(function(MopidyClient){
                expect(mopidy.tracklist.setConsume).not.toHaveBeenCalled();
                mopidy.triggerEvent(mopidyOnline);
                expect(mopidy.tracklist.setConsume).toHaveBeenCalled();

            }));
        })


    })
});
